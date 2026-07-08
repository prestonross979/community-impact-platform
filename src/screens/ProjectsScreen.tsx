import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../theme/colors';
import { mockProjects } from '../data/mockProjects';
import { Project } from '../types';
import { TabScreenProps } from '../navigation/types';
import ProgressBar from '../components/ProgressBar';
import Badge from '../components/Badge';
import { clampProgress, formatCurrency } from '../utils/format';

export default function ProjectsScreen({ navigation }: TabScreenProps<'Projects'>) {
  const renderItem = ({ item }: { item: Project }) => {
    const progress = clampProgress(item.raisedAmount, item.goalAmount);
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('ProjectDetails', { projectId: item.id })}
      >
        <View style={styles.cardHeader}>
          <View style={styles.iconWrap}>
            <Ionicons name={item.icon as any} size={22} color={colors.primary} />
          </View>
          <View style={styles.cardHeaderText}>
            <Badge label={item.category} />
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </View>
        <Text style={styles.summary} numberOfLines={2}>
          {item.summary}
        </Text>
        <ProgressBar progress={progress} />
        <View style={styles.footerRow}>
          <Text style={styles.amount}>
            {formatCurrency(item.raisedAmount)}{' '}
            <Text style={styles.goal}>of {formatCurrency(item.goalAmount)}</Text>
          </Text>
          <Text style={styles.daysLeft}>{item.daysLeft}d left</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.headerWrap}>
        <Text style={styles.headerTitle}>Fundraising Projects</Text>
        <Text style={styles.headerSubtitle}>Support the initiatives shaping our church family</Text>
      </View>
      <FlatList
        data={mockProjects}
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
    gap: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHeaderText: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  summary: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  goal: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.textSecondary,
  },
  daysLeft: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.danger,
  },
});
