import type { ProgressResponse, NoteResponse, AIFeedbackResponse, ChatMessage, ChatResponse } from './types';

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

export async function loadBloomProgressFromServer(): Promise<Record<string, boolean>> {
  try {
    const data = await apiGet<Record<string, { completed: boolean }>>('bloom');
    const progress: Record<string, boolean> = {};
    for (const [key, val] of Object.entries(data)) {
      progress[key] = val.completed;
    }
    return progress;
  } catch {
    return JSON.parse(localStorage.getItem('ml-math-bloom') || '{}');
  }
}

export async function saveBloomProgress(topicId: string, lessonId: string, level: number, index: number): Promise<void> {
  try {
    await apiPost('bloom', { topic_id: topicId, lesson_id: lessonId, level, activity_index: index });
  } catch { /* ignore */ }
}

export async function getAIFeedback(prompt: string, response: string, topicId: string, lessonId: string): Promise<AIFeedbackResponse> {
  try {
    return await apiPost<AIFeedbackResponse>('feedback', {
      prompt,
      response,
      topic_id: topicId,
      lesson_id: lessonId,
    });
  } catch {
    return { rating: 'self_assessed', feedback: 'AI feedback unavailable — self-assessment mode.' };
  }
}

export async function deleteBloomProgress(topicId: string, lessonId: string, level: number, index: number): Promise<void> {
  try {
    await apiPost('bloom/delete', { topic_id: topicId, lesson_id: lessonId, level, activity_index: index });
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
