import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../theme/colors';
import { mockProjects } from '../data/mockProjects';
import { mockPrayers } from '../data/mockPrayers';
import { mockFeed } from '../data/mockFeed';
import { mockGoals } from '../data/mockGoals';
import { currentUser } from '../data/mockUser';
import { TabScreenProps } from '../navigation/types';
import Avatar from '../components/Avatar';
import ProgressBar from '../components/ProgressBar';
import SectionHeader from '../components/SectionHeader';
import Badge from '../components/Badge';
import { clampProgress, formatCurrency, formatGoalValue, formatRelativeDate } from '../utils/format';

export default function HomeDashboardScreen({ navigation }: TabScreenProps<'Home'>) {
  const totalRaised = useMemo(
    () => mockProjects.reduce((sum, p) => sum + p.raisedAmount, 0),
    []
  );
  const activePrayerCount = mockPrayers.length;
  const featuredProject = useMemo(
    () => [...mockProjects].sort((a, b) => a.daysLeft - b.daysLeft)[0],
    []
  );
  const recentPrayers = mockPrayers.slice(0, 2);
  const recentFeed = mockFeed.slice(0, 2);
  const featuredGoal = mockGoals[0];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.name}>{currentUser.name.split(' ')[0]}</Text>
          </View>
          <Avatar initials={currentUser.initials} color={currentUser.avatarColor} size={48} />
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="heart-outline" size={20} color={colors.primary} />
            <Text style={styles.statValue}>{formatCurrency(totalRaised)}</Text>
            <Text style={styles.statLabel}>Raised across projects</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="hand-left-outline" size={20} color={colors.primary} />
            <Text style={styles.statValue}>{activePrayerCount}</Text>
            <Text style={styles.statLabel}>Active prayer requests</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="ribbon-outline" size={20} color={colors.primary} />
            <Text style={styles.statValue}>{mockGoals.length}</Text>
            <Text style={styles.statLabel}>Shared goals in progress</Text>
          </View>
        </View>

        <SectionHeader
          title="Urgent Project"
          actionLabel="View all"
          onActionPress={() => navigation.navigate('Projects')}
        />
        <TouchableOpacity
          style={styles.featuredCard}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('ProjectDetails', { projectId: featuredProject.id })}
        >
          <View style={styles.featuredHeaderRow}>
            <View style={styles.featuredIconWrap}>
              <Ionicons name={featuredProject.icon as any} size={22} color={colors.primary} />
            </View>
            <Badge label={`${featuredProject.daysLeft} days left`} color={colors.danger} backgroundColor="#FBEAE9" />
          </View>
          <Text style={styles.featuredTitle}>{featuredProject.title}</Text>
          <Text style={styles.featuredSummary}>{featuredProject.summary}</Text>
          <ProgressBar progress={clampProgress(featuredProject.raisedAmount, featuredProject.goalAmount)} />
          <View style={styles.featuredFooterRow}>
            <Text style={styles.featuredAmount}>
              {formatCurrency(featuredProject.raisedAmount)}{' '}
              <Text style={styles.featuredGoal}>of {formatCurrency(featuredProject.goalAmount)}</Text>
            </Text>
            <Text style={styles.featuredDonors}>{featuredProject.donorsCount} donors</Text>
          </View>
        </TouchableOpacity>

        <SectionHeader
          title="Recent Prayer Requests"
          actionLabel="View all"
          onActionPress={() => navigation.navigate('Prayer')}
        />
        <View style={styles.listCard}>
          {recentPrayers.map((prayer, index) => (
            <View
              key={prayer.id}
              style={[styles.prayerRow, index !== recentPrayers.length - 1 && styles.rowDivider]}
            >
              <View style={styles.prayerIconWrap}>
                <Ionicons name="hand-left-outline" size={16} color={colors.accent} />
              </View>
              <View style={styles.prayerTextWrap}>
                <Text style={styles.prayerName}>{prayer.name}</Text>
                <Text style={styles.prayerMessage} numberOfLines={2}>
                  {prayer.message}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <SectionHeader
          title="Community Feed"
          actionLabel="View all"
          onActionPress={() => navigation.navigate('Feed')}
        />
        <View style={styles.listCard}>
          {recentFeed.map((post, index) => (
            <View
              key={post.id}
              style={[styles.feedRow, index !== recentFeed.length - 1 && styles.rowDivider]}
            >
              <Avatar initials={post.avatarInitials} color={post.avatarColor} size={36} />
              <View style={styles.feedTextWrap}>
                <Text style={styles.feedAuthor}>{post.author}</Text>
                <Text style={styles.feedMessage} numberOfLines={2}>
                  {post.message}
                </Text>
                <Text style={styles.feedMeta}>{formatRelativeDate(post.postedAt)}</Text>
              </View>
            </View>
          ))}
        </View>

        <SectionHeader
          title="Shared Goal Spotlight"
          actionLabel="View all"
          onActionPress={() => navigation.navigate('Goals')}
        />
        <View style={[styles.listCard, styles.goalCard]}>
          <Text style={styles.goalTitle}>{featuredGoal.title}</Text>
          <ProgressBar
            progress={clampProgress(featuredGoal.current, featuredGoal.target)}
            fillColor={colors.accent}
          />
          <Text style={styles.goalProgressText}>
            {formatGoalValue(featuredGoal.current, featuredGoal.unit)} of{' '}
            {formatGoalValue(featuredGoal.target, featuredGoal.unit)}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 6,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  featuredCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 24,
    gap: 10,
  },
  featuredHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  featuredIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  featuredSummary: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  featuredFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  featuredGoal: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.textSecondary,
  },
  featuredDonors: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  listCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 24,
    overflow: 'hidden',
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  prayerRow: {
    flexDirection: 'row',
    padding: 14,
    gap: 10,
  },
  prayerIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.accentLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prayerTextWrap: {
    flex: 1,
  },
  prayerName: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  prayerMessage: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  feedRow: {
    flexDirection: 'row',
    padding: 14,
    gap: 10,
  },
  feedTextWrap: {
    flex: 1,
  },
  feedAuthor: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  feedMessage: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  feedMeta: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 4,
  },
  goalCard: {
    padding: 16,
    gap: 10,
  },
  goalTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  goalProgressText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
