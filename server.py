#!/usr/bin/env python3
"""Lightweight server for ML Math portal with SQLite progress tracking."""

import json
import sqlite3
import os
import subprocess
from http.server import HTTPServer, SimpleHTTPRequestHandler
from socketserver import ThreadingMixIn
from urllib.parse import urlparse, parse_qs
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "progress.db")


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    return conn


def init_db():
    conn = get_db()
    conn.executescript("""
        CREATE TABLE IF NOT EXISTS lessons (
            topic_id    TEXT NOT NULL,
            lesson_id   TEXT NOT NULL,
            completed   INTEGER NOT NULL DEFAULT 0,
            completed_at TEXT,
            attempts    INTEGER NOT NULL DEFAULT 0,
            PRIMARY KEY (topic_id, lesson_id)
        );

        CREATE TABLE IF NOT EXISTS quiz_results (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            topic_id    TEXT NOT NULL,
            lesson_id   TEXT NOT NULL,
            score       INTEGER NOT NULL,
            total       INTEGER NOT NULL,
            taken_at    TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS notes (
            topic_id    TEXT NOT NULL,
            lesson_id   TEXT NOT NULL,
            content     TEXT NOT NULL DEFAULT '',
            updated_at  TEXT NOT NULL,
            PRIMARY KEY (topic_id, lesson_id)
        );

        CREATE TABLE IF NOT EXISTS study_sessions (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            started_at  TEXT NOT NULL,
            ended_at    TEXT,
            topic_id    TEXT,
            lesson_id   TEXT
        );

        CREATE TABLE IF NOT EXISTS bloom_progress (
            topic_id       TEXT NOT NULL,
            lesson_id      TEXT NOT NULL,
            level          INTEGER NOT NULL,
            activity_index INTEGER NOT NULL,
            completed      INTEGER NOT NULL DEFAULT 1,
            completed_at   TEXT,
            PRIMARY KEY (topic_id, lesson_id, level, activity_index)
        );

        CREATE TABLE IF NOT EXISTS chat_messages (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            topic_id    TEXT NOT NULL,
            lesson_id   TEXT NOT NULL,
            role        TEXT NOT NULL,
            content     TEXT NOT NULL,
            created_at  TEXT NOT NULL
        );
    """)
    conn.commit()
    conn.close()


class APIHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path.startswith("/api/"):
            self.handle_api_get(parsed)
        else:
            super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)
        if parsed.path.startswith("/api/"):
            body = self.rfile.read(int(self.headers.get("Content-Length", 0)))
            data = json.loads(body) if body else {}
            self.handle_api_post(parsed, data)
        else:
            self.send_error(404)

    def json_response(self, data, status=200):
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())

    def handle_api_get(self, parsed):
        path = parsed.path

        if path == "/api/progress":
            conn = get_db()
            rows = conn.execute("SELECT topic_id, lesson_id, completed, completed_at, attempts FROM lessons").fetchall()
            result = {}
            for r in rows:
                result[f"{r['topic_id']}/{r['lesson_id']}"] = {
                    "completed": bool(r["completed"]),
                    "completed_at": r["completed_at"],
                    "attempts": r["attempts"],
                }
            conn.close()
            self.json_response(result)

        elif path == "/api/quiz-history":
            params = parse_qs(parsed.query)
            conn = get_db()
            if "topic_id" in params and "lesson_id" in params:
                rows = conn.execute(
                    "SELECT * FROM quiz_results WHERE topic_id=? AND lesson_id=? ORDER BY taken_at DESC",
                    (params["topic_id"][0], params["lesson_id"][0]),
                ).fetchall()
            else:
                rows = conn.execute("SELECT * FROM quiz_results ORDER BY taken_at DESC LIMIT 50").fetchall()
            conn.close()
            self.json_response([dict(r) for r in rows])

        elif path == "/api/notes":
            params = parse_qs(parsed.query)
            conn = get_db()
            if "topic_id" in params and "lesson_id" in params:
                row = conn.execute(
                    "SELECT * FROM notes WHERE topic_id=? AND lesson_id=?",
                    (params["topic_id"][0], params["lesson_id"][0]),
                ).fetchone()
                conn.close()
                self.json_response(dict(row) if row else {"content": ""})
            else:
                rows = conn.execute("SELECT * FROM notes ORDER BY updated_at DESC").fetchall()
                conn.close()
                self.json_response([dict(r) for r in rows])

        elif path == "/api/bloom":
            conn = get_db()
            rows = conn.execute("SELECT topic_id, lesson_id, level, activity_index, completed FROM bloom_progress").fetchall()
            result = {}
            for r in rows:
                key = f"{r['topic_id']}/{r['lesson_id']}/{r['level']}/{r['activity_index']}"
                result[key] = {"completed": bool(r["completed"])}
            conn.close()
            self.json_response(result)

        elif path == "/api/chat":
            params = parse_qs(parsed.query)
            if "topic_id" in params and "lesson_id" in params:
                conn = get_db()
                rows = conn.execute(
                    "SELECT role, content FROM chat_messages WHERE topic_id=? AND lesson_id=? ORDER BY created_at",
                    (params["topic_id"][0], params["lesson_id"][0]),
                ).fetchall()
                conn.close()
                self.json_response([dict(r) for r in rows])
            else:
                self.json_response([])

        elif path == "/api/stats":
            conn = get_db()
            total_lessons = conn.execute("SELECT COUNT(*) as c FROM lessons").fetchone()["c"]
            completed = conn.execute("SELECT COUNT(*) as c FROM lessons WHERE completed=1").fetchone()["c"]
            quizzes = conn.execute("SELECT COUNT(*) as c FROM quiz_results").fetchone()["c"]
            avg_score = conn.execute("SELECT AVG(CAST(score AS FLOAT)/total) as avg FROM quiz_results").fetchone()["avg"]
            recent = conn.execute(
                "SELECT topic_id, lesson_id, completed_at FROM lessons WHERE completed=1 ORDER BY completed_at DESC LIMIT 5"
            ).fetchall()
            streak = self._calc_streak(conn)
            conn.close()
            self.json_response({
                "total_lessons": total_lessons,
                "completed": completed,
                "quizzes_taken": quizzes,
                "avg_quiz_score": round(avg_score * 100, 1) if avg_score else 0,
                "recent_completions": [dict(r) for r in recent],
                "study_streak_days": streak,
            })

        else:
            self.send_error(404)

    def handle_api_post(self, parsed, data):
        path = parsed.path
        now = datetime.now().isoformat()

        if path == "/api/progress":
            topic_id = data["topic_id"]
            lesson_id = data["lesson_id"]
            completed = data.get("completed", True)
            conn = get_db()
            conn.execute(
                """INSERT INTO lessons (topic_id, lesson_id, completed, completed_at, attempts)
                   VALUES (?, ?, ?, ?, 1)
                   ON CONFLICT(topic_id, lesson_id) DO UPDATE SET
                     completed = excluded.completed,
                     completed_at = CASE WHEN excluded.completed THEN ? ELSE completed_at END,
                     attempts = attempts + 1""",
                (topic_id, lesson_id, int(completed), now, now),
            )
            conn.commit()
            conn.close()
            self.json_response({"status": "ok", "completed_at": now})

        elif path == "/api/quiz":
            conn = get_db()
            conn.execute(
                "INSERT INTO quiz_results (topic_id, lesson_id, score, total, taken_at) VALUES (?, ?, ?, ?, ?)",
                (data["topic_id"], data["lesson_id"], data["score"], data["total"], now),
            )
            conn.commit()
            conn.close()
            self.json_response({"status": "ok", "taken_at": now})

        elif path == "/api/notes":
            conn = get_db()
            conn.execute(
                """INSERT INTO notes (topic_id, lesson_id, content, updated_at)
                   VALUES (?, ?, ?, ?)
                   ON CONFLICT(topic_id, lesson_id) DO UPDATE SET
                     content = excluded.content, updated_at = excluded.updated_at""",
                (data["topic_id"], data["lesson_id"], data.get("content", ""), now),
            )
            conn.commit()
            conn.close()
            self.json_response({"status": "ok"})

        elif path == "/api/bloom":
            conn = get_db()
            conn.execute(
                """INSERT INTO bloom_progress (topic_id, lesson_id, level, activity_index, completed, completed_at)
                   VALUES (?, ?, ?, ?, 1, ?)
                   ON CONFLICT(topic_id, lesson_id, level, activity_index) DO UPDATE SET
                     completed = 1, completed_at = excluded.completed_at""",
                (data["topic_id"], data["lesson_id"], data["level"], data["activity_index"], now),
            )
            conn.commit()
            conn.close()
            self.json_response({"status": "ok"})

        elif path == "/api/bloom/delete":
            conn = get_db()
            conn.execute(
                "DELETE FROM bloom_progress WHERE topic_id=? AND lesson_id=? AND level=? AND activity_index=?",
                (data["topic_id"], data["lesson_id"], data["level"], data["activity_index"]),
            )
            conn.commit()
            conn.close()
            self.json_response({"status": "ok"})

        elif path == "/api/chat":
            messages = data.get("messages", [])
            topic_id = data.get("topic_id", "")
            lesson_id = data.get("lesson_id", "")

            system_msg = (
                f"You are a helpful, concise ML math tutor. The student is studying "
                f"topic '{topic_id}', lesson '{lesson_id}'. "
                "Answer concisely. Use LaTeX math notation with $ delimiters for inline "
                "and $$ for display math. If the student is confused, give hints before full answers. "
                "Keep responses under 300 words unless a longer explanation is needed."
            )

            conversation = f"System: {system_msg}\n\n"
            for msg in messages:
                role = "Student" if msg["role"] == "user" else "Tutor"
                conversation += f"{role}: {msg['content']}\n\n"
            conversation += "Tutor:"

            try:
                result = subprocess.run(
                    ["codex", "exec", conversation],
                    capture_output=True, text=True, timeout=30,
                    env={**os.environ, "NO_COLOR": "1"},
                )
                reply = result.stdout.strip()
                if not reply:
                    raise ValueError(f"Empty response, stderr: {result.stderr}")

                conn = get_db()
                # Save user's last message
                if messages:
                    last_user = messages[-1]
                    if last_user["role"] == "user":
                        conn.execute(
                            "INSERT INTO chat_messages (topic_id, lesson_id, role, content, created_at) VALUES (?,?,?,?,?)",
                            (topic_id, lesson_id, "user", last_user["content"], now),
                        )
                # Save assistant reply
                conn.execute(
                    "INSERT INTO chat_messages (topic_id, lesson_id, role, content, created_at) VALUES (?,?,?,?,?)",
                    (topic_id, lesson_id, "assistant", reply, now),
                )
                conn.commit()
                conn.close()

                self.json_response({"reply": reply})
            except Exception as e:
                print(f"  Chat error: {e}")
                self.json_response({"reply": "Sorry, I couldn't process that right now. Please try again."})

        elif path == "/api/feedback":
            prompt_text = data.get("prompt", "")
            user_response = data.get("response", "")

            ai_prompt = (
                "You are a concise math/ML tutor. Evaluate the student's response to the given question. "
                'Reply with JSON only, no markdown fences, no extra text: '
                '{"rating": "correct"|"partial"|"needs_work", '
                '"feedback": "1-3 sentence feedback", "hint": "optional hint if needs_work"}\n\n'
                f"Question: {prompt_text}\n\n"
                f"Student's response: {user_response}"
            )

            try:
                result = subprocess.run(
                    ["codex", "exec", ai_prompt],
                    capture_output=True, text=True, timeout=30,
                    env={**os.environ, "NO_COLOR": "1"},
                )
                ai_text = result.stdout.strip()
                if not ai_text:
                    raise ValueError(f"Empty response, stderr: {result.stderr}")
                # Strip markdown fences if present
                if ai_text.startswith("```"):
                    ai_text = ai_text.split("\n", 1)[1] if "\n" in ai_text else ai_text[3:]
                    if ai_text.endswith("```"):
                        ai_text = ai_text[:-3]
                    ai_text = ai_text.strip()
                feedback = json.loads(ai_text)
                self.json_response({
                    "rating": feedback.get("rating", "partial"),
                    "feedback": feedback.get("feedback", ""),
                    "hint": feedback.get("hint"),
                })
            except Exception as e:
                print(f"  AI feedback error: {e}")
                self.json_response({
                    "rating": "self_assessed",
                    "feedback": "AI feedback unavailable — please try again.",
                })

        elif path == "/api/reset":
            conn = get_db()
            conn.executescript("DELETE FROM lessons; DELETE FROM quiz_results; DELETE FROM notes; DELETE FROM study_sessions; DELETE FROM bloom_progress; DELETE FROM chat_messages;")
            conn.commit()
            conn.close()
            self.json_response({"status": "ok", "message": "All progress reset"})

        else:
            self.send_error(404)

    def _calc_streak(self, conn):
        rows = conn.execute(
            "SELECT DISTINCT DATE(completed_at) as d FROM lessons WHERE completed=1 ORDER BY d DESC"
        ).fetchall()
        if not rows:
            return 0
        streak = 0
        today = datetime.now().date()
        for r in rows:
            expected = today - __import__("datetime").timedelta(days=streak)
            if datetime.fromisoformat(r["d"]).date() == expected:
                streak += 1
            else:
                break
        return streak

    def log_message(self, format, *args):
        if "/api/" in str(args[0]):
            print(f"  API: {args[0]}")


class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    daemon_threads = True


if __name__ == "__main__":
    init_db()
    port = 3737
    server = ThreadedHTTPServer(("localhost", port), APIHandler)
    print(f"\n  ML Math Portal running at http://localhost:{port}")
    print(f"  SQLite database: {DB_PATH}\n")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n  Server stopped.")
        server.server_close()
