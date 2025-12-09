import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useUser} from '../context/UserContext';
import {COLORS, SPACING, FONT_SIZES} from '../constants/theme';
import {CS2Category} from '../types';
import {getCategoryLessons} from '../data/lessons';

const HomeScreen = ({navigation}: any) => {
  const {userProgress, updateStreak} = useUser();

  React.useEffect(() => {
    updateStreak();
  }, []);

  const categories = [
    {
      key: CS2Category.MECHANICS,
      title: 'Mechanics',
      icon: '🎯',
      color: COLORS.mechanics,
    },
    {
      key: CS2Category.MOVEMENT,
      title: 'Movement',
      icon: '🏃',
      color: COLORS.movement,
    },
    {
      key: CS2Category.GAMESENSE,
      title: 'Game Sense',
      icon: '🧠',
      color: COLORS.gamesense,
    },
    {
      key: CS2Category.UTILITY,
      title: 'Utility',
      icon: '💣',
      color: COLORS.utility,
    },
    {
      key: CS2Category.TEAMPLAY,
      title: 'Team Play',
      icon: '👥',
      color: COLORS.teamplay,
    },
  ];

  const renderCategoryCard = (category: any) => {
    const lessons = getCategoryLessons(category.key);
    const progress = userProgress.categoryProgress[category.key];
    const completionPercentage =
      (progress.lessonsCompleted / progress.totalLessons) * 100;

    return (
      <TouchableOpacity
        key={category.key}
        style={[styles.categoryCard, {borderLeftColor: category.color}]}
        onPress={() => navigation.navigate('Lesson', {category: category.key})}>
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryIcon}>{category.icon}</Text>
          <View style={styles.categoryInfo}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            <Text style={styles.categoryProgress}>
              {progress.lessonsCompleted}/{progress.totalLessons} lessons
            </Text>
          </View>
        </View>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {width: `${completionPercentage}%`, backgroundColor: category.color},
            ]}
          />
        </View>
        <Text style={styles.categoryXP}>{progress.xpEarned} XP earned</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header Stats */}
        <View style={styles.header}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{userProgress.level}</Text>
            <Text style={styles.statLabel}>Level</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{userProgress.totalXP}</Text>
            <Text style={styles.statLabel}>Total XP</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>🔥 {userProgress.currentStreak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>

        {/* Welcome Message */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome to DuoForCS2!</Text>
          <Text style={styles.welcomeText}>
            Master Counter-Strike 2 through interactive lessons and challenges
          </Text>
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Learning Paths</Text>
          {categories.map(renderCategoryCard)}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: SPACING.md,
    backgroundColor: COLORS.card,
  },
  statCard: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
    marginTop: SPACING.xs,
  },
  welcomeSection: {
    padding: SPACING.lg,
  },
  welcomeTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  welcomeText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textLight,
  },
  categoriesSection: {
    padding: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  categoryCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  categoryIcon: {
    fontSize: 32,
    marginRight: SPACING.md,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  categoryProgress: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
    marginTop: SPACING.xs,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    marginVertical: SPACING.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  categoryXP: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default HomeScreen;
