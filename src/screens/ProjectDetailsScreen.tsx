import React, { useState } from 'react';
import { Alert, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../theme/colors';
import { mockProjects } from '../data/mockProjects';
import { RootStackScreenProps } from '../navigation/types';
import ProgressBar from '../components/ProgressBar';
import Badge from '../components/Badge';
import PrimaryButton from '../components/PrimaryButton';
import { clampProgress, formatCurrency, formatRelativeDate } from '../utils/format';

const DONATION_PRESETS = [25, 50, 100, 250];

export default function ProjectDetailsScreen({ route, navigation }: RootStackScreenProps<'ProjectDetails'>) {
  const { projectId } = route.params;
  const project = mockProjects.find((p) => p.id === projectId);

  const [raisedAmount, setRaisedAmount] = useState(project?.raisedAmount ?? 0);
  const [donorsCount, setDonorsCount] = useState(project?.donorsCount ?? 0);
  const [selectedAmount, setSelectedAmount] = useState<number>(DONATION_PRESETS[1]);

  if (!project) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Project not found.</Text>
          <PrimaryButton label="Go back" onPress={() => navigation.goBack()} />
        </View>
      </SafeAreaView>
    );
  }

  const progress = clampProgress(raisedAmount, project.goalAmount);

  const handleDonate = () => {
    Alert.alert(
      'Confirm Demo Gift',
      `Give ${formatCurrency(selectedAmount)} to "${project.title}"? This is a demo app — no real payment will be processed.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Give Now',
          onPress: () => {
            setRaisedAmount((prev) => prev + selectedAmount);
            setDonorsCount((prev) => prev + 1);
            Alert.alert('Thank you!', 'Your demo gift has been recorded locally. No real transaction occurred.');
          },
        },
      ]
    );
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Join me in supporting "${project.title}" — help us reach our goal of ${formatCurrency(
          project.goalAmount
        )}!`,
      });
    } catch {
      // Sharing dismissed or unavailable — no action needed.
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroIconWrap}>
          <Ionicons name={project.icon as any} size={32} color={colors.primary} />
        </View>

        <Badge label={project.category} />
        <Text style={styles.title}>{project.title}</Text>
        <Text style={styles.organizer}>Organized by {project.organizer}</Text>

        <ProgressBar progress={progress} height={10} />

        <View style={styles.statsRow}>
          <View style={styles.statBlock}>
            <Text style={styles.statValue}>{formatCurrency(raisedAmount)}</Text>
            <Text style={styles.statLabel}>raised of {formatCurrency(project.goalAmount)}</Text>
          </View>
          <View style={styles.statBlock}>
            <Text style={styles.statValue}>{donorsCount}</Text>
            <Text style={styles.statLabel}>donors</Text>
          </View>
          <View style={styles.statBlock}>
            <Text style={styles.statValue}>{project.daysLeft}</Text>
            <Text style={styles.statLabel}>days left</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>About this project</Text>
        <Text style={styles.description}>{project.description}</Text>

        <Text style={styles.sectionTitle}>Choose a gift amount</Text>
        <View style={styles.presetRow}>
          {DONATION_PRESETS.map((amount) => (
            <TouchableOpacity
              key={amount}
              style={[styles.presetChip, selectedAmount === amount && styles.presetChipSelected]}
              onPress={() => setSelectedAmount(amount)}
            >
              <Text
                style={[styles.presetChipText, selectedAmount === amount && styles.presetChipTextSelected]}
              >
                {formatCurrency(amount)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <PrimaryButton label={`Give ${formatCurrency(selectedAmount)} (Demo)`} onPress={handleDonate} />
        <PrimaryButton label="Share Project" onPress={handleShare} variant="outline" style={styles.shareButton} />

        {project.updates.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Updates</Text>
            {project.updates.map((update) => (
              <View key={update.id} style={styles.updateCard}>
                <View style={styles.updateHeaderRow}>
                  <Text style={styles.updateTitle}>{update.title}</Text>
                  <Text style={styles.updateDate}>{formatRelativeDate(update.date)}</Text>
                </View>
                <Text style={styles.updateText}>{update.text}</Text>
              </View>
            ))}
          </>
        )}
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
    paddingBottom: 40,
    gap: 12,
  },
  heroIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  organizer: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginVertical: 8,
  },
  statBlock: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 12,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 21,
  },
  presetRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 4,
  },
  presetChip: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
  },
  presetChipSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  presetChipText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  presetChipTextSelected: {
    color: colors.primary,
  },
  shareButton: {
    marginTop: 4,
  },
  updateCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    gap: 6,
  },
  updateHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  updateTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    flexShrink: 1,
  },
  updateDate: {
    fontSize: 11,
    color: colors.textMuted,
  },
  updateText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 19,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: 20,
  },
  notFoundText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});
