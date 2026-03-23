import type { ProgressResponse, NoteResponse } from './types';

async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`/api/${path}`);
  return res.json() as Promise<T>;
}

async function apiPost<T>(path: string, data: Record<string, unknown>): Promise<T> {
  const res = await fetch(`/api/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json() as Promise<T>;
}

export async function loadProgressFromServer(): Promise<Record<string, boolean>> {
  try {
    const data = await apiGet<ProgressResponse>('progress');
    const progress: Record<string, boolean> = {};
    for (const [key, val] of Object.entries(data)) {
      progress[key] = val.completed;
    }
    return progress;
  } catch {
    return JSON.parse(localStorage.getItem('ml-math-progress') || '{}');
  }
}

export async function saveProgress(topicId: string, lessonId: string, completed: boolean): Promise<void> {
  try {
    await apiPost('progress', { topic_id: topicId, lesson_id: lessonId, completed });
  } catch {
    // Fallback handled by state module saving to localStorage
  }
}

export async function saveQuizResult(topicId: string, lessonId: string, score: number, total: number): Promise<void> {
  try {
    await apiPost('quiz', { topic_id: topicId, lesson_id: lessonId, score, total });
  } catch { /* ignore */ }
}

export async function saveNote(topicId: string, lessonId: string, content: string): Promise<void> {
  try {
    await apiPost('notes', { topic_id: topicId, lesson_id: lessonId, content });
  } catch { /* ignore */ }
}

export async function loadNote(topicId: string, lessonId: string): Promise<string> {
  try {
    const data = await apiGet<NoteResponse>(`notes?topic_id=${topicId}&lesson_id=${lessonId}`);
    return data.content || '';
  } catch {
    return '';
  }
}
