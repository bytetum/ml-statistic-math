import type { AppState, Topic } from './types';
import { TOPICS } from './topics';
import { loadProgressFromServer, saveProgress, loadBloomProgressFromServer, saveBloomProgress, deleteBloomProgress } from './api';

export const state: AppState = {
  currentTopic: null,
  currentLesson: 0,
  progress: {},
  bloomProgress: {},
};

export async function loadProgress(): Promise<void> {
  state.progress = await loadProgressFromServer();
  state.bloomProgress = await loadBloomProgressFromServer();
}

export function isLessonComplete(topicId: string, lessonId: string): boolean {
  return state.progress[`${topicId}/${lessonId}`] === true;
}

export async function markLessonComplete(topicId: string, lessonId: string): Promise<void> {
  state.progress[`${topicId}/${lessonId}`] = true;
  try {
    await saveProgress(topicId, lessonId, true);
  } catch {
    localStorage.setItem('ml-math-progress', JSON.stringify(state.progress));
  }
}

export function setCurrentTopic(topic: Topic | null): void {
  state.currentTopic = topic;
}

export function setCurrentLesson(index: number): void {
  state.currentLesson = index;
}

export function getTopicProgress(topicId: string): number {
  const topic = TOPICS.find(t => t.id === topicId);
  if (!topic) return 0;
  const done = topic.lessons.filter(l => isLessonComplete(topicId, l.id)).length;
  return done / topic.lessons.length;
}

export function isBloomDone(topicId: string, lessonId: string, level: number, index: number): boolean {
  return state.bloomProgress[`${topicId}/${lessonId}/${level}/${index}`] === true;
}

export async function markBloomDone(topicId: string, lessonId: string, level: number, index: number): Promise<void> {
  const key = `${topicId}/${lessonId}/${level}/${index}`;
  state.bloomProgress[key] = true;
  try {
    await saveBloomProgress(topicId, lessonId, level, index);
  } catch {
    localStorage.setItem('ml-math-bloom', JSON.stringify(state.bloomProgress));
  }
}

export async function unmarkBloomDone(topicId: string, lessonId: string, level: number, index: number): Promise<void> {
  const key = `${topicId}/${lessonId}/${level}/${index}`;
  delete state.bloomProgress[key];
  try {
    await deleteBloomProgress(topicId, lessonId, level, index);
  } catch {
    localStorage.setItem('ml-math-bloom', JSON.stringify(state.bloomProgress));
  }
}

export function getGlobalProgress(): number {
  let total = 0;
  let done = 0;
  TOPICS.forEach(t => {
    t.lessons.forEach(l => {
      total++;
      if (isLessonComplete(t.id, l.id)) done++;
    });
  });
  return total ? done / total : 0;
}
