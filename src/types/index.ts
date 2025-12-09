export enum CS2Category {
  MECHANICS = 'mechanics',
  MOVEMENT = 'movement',
  GAMESENSE = 'gamesense',
  UTILITY = 'utility',
  TEAMPLAY = 'teamplay',
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  TRUE_FALSE = 'true_false',
  IMAGE_SELECT = 'image_select',
  SCENARIO = 'scenario',
}

export interface Question {
  id: string;
  type: QuestionType;
  category: CS2Category;
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  xpReward: number;
  imageUrl?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: CS2Category;
  level: number;
  questions: Question[];
  xpReward: number;
  unlocked: boolean;
  completed: boolean;
}

export interface UserProgress {
  userId: string;
  totalXP: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  completedLessons: string[];
  lastActiveDate: string;
  categoryProgress: {
    [key in CS2Category]: {
      lessonsCompleted: number;
      totalLessons: number;
      xpEarned: number;
    };
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
}
