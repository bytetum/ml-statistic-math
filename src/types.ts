export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  quiz?: QuizQuestion[];
  interactive?: string;
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
