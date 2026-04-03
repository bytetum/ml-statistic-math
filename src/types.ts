export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
}

export type BloomActivityType = 'choice' | 'numeric' | 'match' | 'order' | 'explain' | 'open';

export interface BloomActivity {
  type: BloomActivityType;
  level: number;           // 0-5 (Remember through Create)
  prompt: string;
  /** choice: array of option strings */
  options?: string[];
  /** choice: correct option index */
  answer?: number;
  /** numeric: correct number */
  correctValue?: number;
  /** numeric: acceptable tolerance */
  tolerance?: number;
  /** match: left items */
  pairs?: Array<[string, string]>;
  /** order: correct ordered list */
  correctOrder?: string[];
}

export interface HomeworkProblem {
  id: string;
  prompt: string;
  type: 'free-response' | 'numeric' | 'multiple-choice';
  options?: string[];
  answer?: number | string;
  tolerance?: number;
  hint?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  reply: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  quiz?: QuizQuestion[];
  interactive?: string;
  bloom?: BloomActivity[];
  homework?: HomeworkProblem[];
}

export interface Topic {
  id: string;
  title: string;
  icon: string;
  description: string;
  lessons: Lesson[];
}

export interface AppState {
  currentTopic: Topic | null;
  currentLesson: number;
  progress: Record<string, boolean>;
  bloomProgress: Record<string, boolean>;
}

export interface ProgressResponse {
  [key: string]: {
    completed: boolean;
    completed_at: string | null;
    attempts: number;
  };
}

export interface NoteResponse {
  content: string;
}

export interface AIFeedbackResponse {
  rating: 'correct' | 'partial' | 'needs_work' | 'self_assessed';
  feedback: string;
  hint?: string;
}

export interface StatsResponse {
  total_lessons: number;
  completed: number;
  quizzes_taken: number;
  avg_quiz_score: number;
  recent_completions: Array<{
    topic_id: string;
    lesson_id: string;
    completed_at: string;
  }>;
  study_streak_days: number;
}
