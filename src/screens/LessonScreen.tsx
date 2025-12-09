import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {getCategoryLessons} from '../data/lessons';
import {useUser} from '../context/UserContext';
import {COLORS, SPACING, FONT_SIZES} from '../constants/theme';
import {Lesson} from '../types';

const LessonScreen = ({route, navigation}: any) => {
  const {category} = route.params;
  const {userProgress} = useUser();
  const lessons = getCategoryLessons(category);

  const categoryInfo: any = {
    mechanics: {title: 'Mechanics', icon: '🎯', color: COLORS.mechanics},
    movement: {title: 'Movement', icon: '🏃', color: COLORS.movement},
    gamesense: {title: 'Game Sense', icon: '🧠', color: COLORS.gamesense},
    utility: {title: 'Utility', icon: '💣', color: COLORS.utility},
    teamplay: {title: 'Team Play', icon: '👥', color: COLORS.teamplay},
  };

  const info = categoryInfo[category];

  const renderLessonCard = (lesson: Lesson, index: number) => {
    const isCompleted = userProgress.completedLessons.includes(lesson.id);
    const isLocked = index > 0 && !userProgress.completedLessons.includes(lessons[index - 1].id);

    return (
      <TouchableOpacity
        key={lesson.id}
        style={[
          styles.lessonCard,
          isCompleted && styles.lessonCardCompleted,
          isLocked && styles.lessonCardLocked,
        ]}
        onPress={() => {
          if (!isLocked) {
            navigation.navigate('Quiz', {lessonId: lesson.id});
          }
        }}
        disabled={isLocked}>
        <View style={styles.lessonHeader}>
          <View style={[styles.levelBadge, {backgroundColor: info.color}]}>
            <Text style={styles.levelText}>{lesson.level}</Text>
          </View>
          <View style={styles.lessonInfo}>
            <Text style={styles.lessonTitle}>
              {isLocked ? '🔒 ' : ''}
              {lesson.title}
            </Text>
            <Text style={styles.lessonDescription}>{lesson.description}</Text>
          </View>
          {isCompleted && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <View style={styles.lessonFooter}>
          <Text style={styles.questionCount}>
            {lesson.questions.length} questions
          </Text>
          <Text style={styles.xpBadge}>+{lesson.xpReward} XP</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={[styles.categoryHeader, {backgroundColor: info.color}]}>
          <Text style={styles.categoryIcon}>{info.icon}</Text>
          <Text style={styles.categoryTitle}>{info.title}</Text>
        </View>

        <View style={styles.lessonsContainer}>
          {lessons.map((lesson, index) => renderLessonCard(lesson, index))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  categoryHeader: {
    padding: SPACING.xl,
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 48,
    marginBottom: SPACING.sm,
  },
  categoryTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.background,
  },
  lessonsContainer: {
    padding: SPACING.md,
  },
  lessonCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  lessonCardCompleted: {
    borderWidth: 2,
    borderColor: COLORS.success,
  },
  lessonCardLocked: {
    opacity: 0.6,
  },
  lessonHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  levelBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  levelText: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontSize: FONT_SIZES.md,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  lessonDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
  },
  checkmark: {
    fontSize: 24,
    color: COLORS.success,
  },
  lessonFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.sm,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  questionCount: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
  },
  xpBadge: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default LessonScreen;
