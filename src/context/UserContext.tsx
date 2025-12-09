import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserProgress, CS2Category} from '../types';

interface UserContextType {
  userProgress: UserProgress;
  addXP: (amount: number) => void;
  completeLesson: (lessonId: string, category: CS2Category, xp: number) => void;
  updateStreak: () => void;
  isLoading: boolean;
}

const defaultProgress: UserProgress = {
  userId: 'user_001',
  totalXP: 0,
  level: 1,
  currentStreak: 0,
  longestStreak: 0,
  completedLessons: [],
  lastActiveDate: new Date().toISOString(),
  categoryProgress: {
    [CS2Category.MECHANICS]: {
      lessonsCompleted: 0,
      totalLessons: 5,
      xpEarned: 0,
    },
    [CS2Category.MOVEMENT]: {
      lessonsCompleted: 0,
      totalLessons: 5,
      xpEarned: 0,
    },
    [CS2Category.GAMESENSE]: {
      lessonsCompleted: 0,
      totalLessons: 5,
      xpEarned: 0,
    },
    [CS2Category.UTILITY]: {
      lessonsCompleted: 0,
      totalLessons: 5,
      xpEarned: 0,
    },
    [CS2Category.TEAMPLAY]: {
      lessonsCompleted: 0,
      totalLessons: 5,
      xpEarned: 0,
    },
  },
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [userProgress, setUserProgress] =
    useState<UserProgress>(defaultProgress);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const savedProgress = await AsyncStorage.getItem('userProgress');
      if (savedProgress) {
        setUserProgress(JSON.parse(savedProgress));
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveProgress = async (progress: UserProgress) => {
    try {
      await AsyncStorage.setItem('userProgress', JSON.stringify(progress));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const calculateLevel = (xp: number): number => {
    return Math.floor(xp / 100) + 1;
  };

  const addXP = (amount: number) => {
    setUserProgress(prev => {
      const newXP = prev.totalXP + amount;
      const newLevel = calculateLevel(newXP);
      const updated = {
        ...prev,
        totalXP: newXP,
        level: newLevel,
      };
      saveProgress(updated);
      return updated;
    });
  };

  const completeLesson = (
    lessonId: string,
    category: CS2Category,
    xp: number,
  ) => {
    setUserProgress(prev => {
      if (prev.completedLessons.includes(lessonId)) {
        return prev;
      }

      const newXP = prev.totalXP + xp;
      const newLevel = calculateLevel(newXP);
      const categoryProg = prev.categoryProgress[category];

      const updated = {
        ...prev,
        totalXP: newXP,
        level: newLevel,
        completedLessons: [...prev.completedLessons, lessonId],
        categoryProgress: {
          ...prev.categoryProgress,
          [category]: {
            ...categoryProg,
            lessonsCompleted: categoryProg.lessonsCompleted + 1,
            xpEarned: categoryProg.xpEarned + xp,
          },
        },
      };
      saveProgress(updated);
      return updated;
    });
  };

  const updateStreak = () => {
    setUserProgress(prev => {
      const today = new Date().toISOString().split('T')[0];
      const lastActive = new Date(prev.lastActiveDate).toISOString().split('T')[0];
      
      let newStreak = prev.currentStreak;

      if (lastActive !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (lastActive === yesterdayStr) {
          newStreak += 1;
        } else {
          newStreak = 1;
        }
      }

      const updated = {
        ...prev,
        currentStreak: newStreak,
        longestStreak: Math.max(newStreak, prev.longestStreak),
        lastActiveDate: new Date().toISOString(),
      };
      saveProgress(updated);
      return updated;
    });
  };

  return (
    <UserContext.Provider
      value={{
        userProgress,
        addXP,
        completeLesson,
        updateStreak,
        isLoading,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
