#!/usr/bin/env python3
"""Lightweight server for ML Math portal with SQLite progress tracking."""

import json
import sqlite3
import os
from http.server import HTTPServer, SimpleHTTPRequestHandler
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

        elif path == "/api/reset":
            conn = get_db()
            conn.executescript("DELETE FROM lessons; DELETE FROM quiz_results; DELETE FROM notes; DELETE FROM study_sessions;")
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


if __name__ == "__main__":
    init_db()
    port = 3737
    server = HTTPServer(("localhost", port), APIHandler)
    print(f"\n  ML Math Portal running at http://localhost:{port}")
    print(f"  SQLite database: {DB_PATH}\n")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n  Server stopped.")
        server.server_close()
