import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../theme/colors';
import { mockGoals } from '../data/mockGoals';
import { currentUser } from '../data/mockUser';
import { SharedGoal } from '../types';
import { clampProgress, formatGoalValue } from '../utils/format';
import ProgressBar from '../components/ProgressBar';
import Avatar from '../components/Avatar';

const CONTRIBUTION_STEP: Record<SharedGoal['unit'], number> = {
  currency: 25,
  count: 5,
  hours: 2,
};

export default function SharedGoalsScreen() {
  const [goals, setGoals] = useState<SharedGoal[]>(mockGoals);
  const [joinedGoalIds, setJoinedGoalIds] = useState<Set<string>>(new Set());

  const handleContribute = (goalId: string) => {
    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id !== goalId) return goal;
        const step = CONTRIBUTION_STEP[goal.unit];
        const alreadyJoined = joinedGoalIds.has(goalId);
        const nextParticipants = alreadyJoined
          ? goal.participants
          : [
              ...goal.participants,
              {
                id: currentUser.id,
                name: currentUser.name,
                initials: currentUser.initials,
                avatarColor: currentUser.avatarColor,
              },
            ];
        return {
          ...goal,
          current: Math.min(goal.target, goal.current + step),
          participants: nextParticipants,
        };
      })
    );
    setJoinedGoalIds((prev) => new Set(prev).add(goalId));
  };

  const renderItem = ({ item }: { item: SharedGoal }) => {
    const progress = clampProgress(item.current, item.target);
    const isComplete = item.current >= item.target;
    const visibleParticipants = item.participants.slice(0, 4);
    const overflowCount = item.participants.length - visibleParticipants.length;

    return (
      <View style={styles.card}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>

        <ProgressBar progress={progress} height={10} fillColor={isComplete ? colors.success : colors.accent} />
        <View style={styles.progressLabelRow}>
          <Text style={styles.progressLabel}>
            {formatGoalValue(item.current, item.unit)} of {formatGoalValue(item.target, item.unit)}
          </Text>
          <Text style={styles.progressPercent}>{Math.round(progress * 100)}%</Text>
        </View>

        <View style={styles.footerRow}>
          <View style={styles.avatarStack}>
            {visibleParticipants.map((participant, index) => (
              <View
                key={participant.id}
                style={[styles.avatarStackItem, { marginLeft: index === 0 ? 0 : -10 }]}
              >
                <Avatar initials={participant.initials} color={participant.avatarColor} size={28} />
              </View>
            ))}
            {overflowCount > 0 && (
              <View style={[styles.avatarStackItem, styles.overflowBadge, { marginLeft: -10 }]}>
                <Text style={styles.overflowText}>+{overflowCount}</Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={[styles.joinButton, isComplete && styles.joinButtonDisabled]}
            onPress={() => handleContribute(item.id)}
            disabled={isComplete}
          >
            <Ionicons
              name={joinedGoalIds.has(item.id) ? 'checkmark-circle' : 'add-circle-outline'}
              size={16}
              color="#FFFFFF"
            />
            <Text style={styles.joinButtonText}>
              {isComplete ? 'Goal Met' : joinedGoalIds.has(item.id) ? 'Add More' : 'Join Goal'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.headerWrap}>
        <Text style={styles.headerTitle}>Shared Goals</Text>
        <Text style={styles.headerSubtitle}>What we can only accomplish together</Text>
      </View>
      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerWrap: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 14,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  description: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 19,
    marginBottom: 4,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  avatarStack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarStackItem: {
    borderWidth: 2,
    borderColor: colors.surface,
    borderRadius: 16,
  },
  overflowBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overflowText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 999,
  },
  joinButtonDisabled: {
    backgroundColor: colors.success,
  },
  joinButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
