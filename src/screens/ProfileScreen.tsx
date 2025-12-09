import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useUser} from '../context/UserContext';
import {COLORS, SPACING, FONT_SIZES} from '../constants/theme';
import {CS2Category} from '../types';

const ProfileScreen = () => {
  const {userProgress} = useUser();

  const categoryData = [
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

  const xpForNextLevel = (userProgress.level * 100) - userProgress.totalXP + 100;
  const levelProgress = ((userProgress.totalXP % 100) / 100) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <Text style={styles.username}>CS2 Learner</Text>
          <Text style={styles.userLevel}>Level {userProgress.level}</Text>
        </View>

        {/* Level Progress */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Level Progress</Text>
          <View style={styles.levelProgressContainer}>
            <View style={styles.progressBarLarge}>
              <View
                style={[
                  styles.progressFillLarge,
                  {width: `${levelProgress}%`},
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {xpForNextLevel} XP to level {userProgress.level + 1}
            </Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userProgress.totalXP}</Text>
              <Text style={styles.statLabel}>Total XP</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {userProgress.completedLessons.length}
              </Text>
              <Text style={styles.statLabel}>Lessons Done</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, {color: COLORS.warning}]}>
                🔥 {userProgress.currentStreak}
              </Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, {color: COLORS.gold}]}>
                🏆 {userProgress.longestStreak}
              </Text>
              <Text style={styles.statLabel}>Best Streak</Text>
            </View>
          </View>
        </View>

        {/* Category Progress */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Category Progress</Text>
          {categoryData.map(category => {
            const progress = userProgress.categoryProgress[category.key];
            const percentage =
              (progress.lessonsCompleted / progress.totalLessons) * 100;

            return (
              <View key={category.key} style={styles.categoryRow}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <View style={styles.categoryDetails}>
                  <View style={styles.categoryRowHeader}>
                    <Text style={styles.categoryName}>{category.title}</Text>
                    <Text style={styles.categoryStats}>
                      {progress.lessonsCompleted}/{progress.totalLessons}
                    </Text>
                  </View>
                  <View style={styles.categoryProgressBar}>
                    <View
                      style={[
                        styles.categoryProgressFill,
                        {
                          width: `${percentage}%`,
                          backgroundColor: category.color,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.categoryXP}>{progress.xpEarned} XP</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Achievements Preview */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Achievements</Text>
          <View style={styles.achievementsGrid}>
            <View style={styles.achievementItem}>
              <Text style={styles.achievementIcon}>
                {userProgress.completedLessons.length >= 1 ? '🎯' : '🔒'}
              </Text>
              <Text style={styles.achievementName}>First Steps</Text>
            </View>
            <View style={styles.achievementItem}>
              <Text style={styles.achievementIcon}>
                {userProgress.currentStreak >= 3 ? '🔥' : '🔒'}
              </Text>
              <Text style={styles.achievementName}>On Fire</Text>
            </View>
            <View style={styles.achievementItem}>
              <Text style={styles.achievementIcon}>
                {userProgress.totalXP >= 100 ? '⭐' : '🔒'}
              </Text>
              <Text style={styles.achievementName}>Century</Text>
            </View>
            <View style={styles.achievementItem}>
              <Text style={styles.achievementIcon}>
                {userProgress.completedLessons.length >= 5 ? '🏆' : '🔒'}
              </Text>
              <Text style={styles.achievementName}>Scholar</Text>
            </View>
          </View>
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
  profileHeader: {
    alignItems: 'center',
    padding: SPACING.xl,
    backgroundColor: COLORS.primary,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  avatarText: {
    fontSize: 40,
  },
  username: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.background,
    marginBottom: SPACING.xs,
  },
  userLevel: {
    fontSize: FONT_SIZES.md,
    color: COLORS.background,
  },
  card: {
    backgroundColor: COLORS.card,
    margin: SPACING.md,
    padding: SPACING.md,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  levelProgressContainer: {
    alignItems: 'center',
  },
  progressBarLarge: {
    width: '100%',
    height: 20,
    backgroundColor: COLORS.border,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: SPACING.sm,
  },
  progressFillLarge: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  progressText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  statValue: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
    marginTop: SPACING.xs,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  categoryIcon: {
    fontSize: 32,
    marginRight: SPACING.md,
  },
  categoryDetails: {
    flex: 1,
  },
  categoryRowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  categoryName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  categoryStats: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
  },
  categoryProgressBar: {
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: SPACING.xs,
  },
  categoryProgressFill: {
    height: '100%',
  },
  categoryXP: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textLight,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementItem: {
    width: '23%',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: SPACING.xs,
  },
  achievementName: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textLight,
    textAlign: 'center',
  },
});

export default ProfileScreen;
