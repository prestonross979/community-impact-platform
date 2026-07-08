import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../theme/colors';
import { mockPrayers } from '../data/mockPrayers';
import { PrayerCategory, PrayerRequest } from '../types';
import { formatRelativeDate } from '../utils/format';
import PrimaryButton from '../components/PrimaryButton';
import Badge from '../components/Badge';

const CATEGORIES: PrayerCategory[] = ['Health', 'Family', 'Guidance', 'Thanksgiving', 'Grief', 'Other'];

let nextPrayerId = mockPrayers.length + 1;

export default function PrayerRequestsScreen() {
  const [prayers, setPrayers] = useState<PrayerRequest[]>(mockPrayers);
  const [prayedIds, setPrayedIds] = useState<Set<string>>(new Set());
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState<PrayerCategory>('Other');
  const [postAnonymously, setPostAnonymously] = useState(false);

  const handlePray = (id: string) => {
    if (prayedIds.has(id)) return;
    setPrayedIds((prev) => new Set(prev).add(id));
    setPrayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, prayedCount: p.prayedCount + 1 } : p))
    );
  };

  const resetForm = () => {
    setMessage('');
    setCategory('Other');
    setPostAnonymously(false);
  };

  const handleSubmit = () => {
    if (!message.trim()) return;
    const newPrayer: PrayerRequest = {
      id: `pr-local-${nextPrayerId++}`,
      name: postAnonymously ? 'Anonymous' : 'You',
      isAnonymous: postAnonymously,
      category,
      message: message.trim(),
      prayedCount: 0,
      postedAt: '2026-07-08',
    };
    setPrayers((prev) => [newPrayer, ...prev]);
    resetForm();
    setModalVisible(false);
  };

  const renderItem = ({ item }: { item: PrayerRequest }) => {
    const alreadyPrayed = prayedIds.has(item.id);
    return (
      <View style={styles.card}>
        <View style={styles.cardHeaderRow}>
          <Badge label={item.category} />
          <Text style={styles.postedAt}>{formatRelativeDate(item.postedAt)}</Text>
        </View>
        <Text style={styles.name}>{item.isAnonymous ? 'Anonymous' : item.name}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <TouchableOpacity
          style={[styles.prayButton, alreadyPrayed && styles.prayButtonActive]}
          onPress={() => handlePray(item.id)}
          activeOpacity={0.8}
        >
          <Ionicons
            name={alreadyPrayed ? 'hand-left' : 'hand-left-outline'}
            size={16}
            color={alreadyPrayed ? '#FFFFFF' : colors.primary}
          />
          <Text style={[styles.prayButtonText, alreadyPrayed && styles.prayButtonTextActive]}>
            {alreadyPrayed ? 'Prayed' : 'I Prayed'} · {item.prayedCount}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.headerWrap}>
        <View style={styles.headerTextWrap}>
          <Text style={styles.headerTitle}>Prayer Requests</Text>
          <Text style={styles.headerSubtitle}>Lift each other up in prayer, together</Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={prayers}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>Share a Prayer Request</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={22} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <Text style={styles.fieldLabel}>Category</Text>
            <View style={styles.categoryRow}>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.categoryChip, category === cat && styles.categoryChipSelected]}
                  onPress={() => setCategory(cat)}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      category === cat && styles.categoryChipTextSelected,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.fieldLabel}>Your request</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Share what's on your heart..."
              placeholderTextColor={colors.textMuted}
              multiline
              numberOfLines={4}
              value={message}
              onChangeText={setMessage}
            />

            <TouchableOpacity
              style={styles.anonymousRow}
              onPress={() => setPostAnonymously((prev) => !prev)}
            >
              <Ionicons
                name={postAnonymously ? 'checkbox' : 'square-outline'}
                size={20}
                color={colors.primary}
              />
              <Text style={styles.anonymousLabel}>Post anonymously</Text>
            </TouchableOpacity>

            <PrimaryButton label="Post Request" onPress={handleSubmit} disabled={!message.trim()} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  headerTextWrap: {
    flex: 1,
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
  addButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
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
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postedAt: {
    fontSize: 11,
    color: colors.textMuted,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  message: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  prayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: colors.primary,
    marginTop: 4,
  },
  prayButtonActive: {
    backgroundColor: colors.primary,
  },
  prayButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  prayButtonTextActive: {
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(45, 42, 50, 0.5)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    gap: 10,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 6,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryChipSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  categoryChipTextSelected: {
    color: colors.primary,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: colors.textPrimary,
    minHeight: 90,
    textAlignVertical: 'top',
  },
  anonymousRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  anonymousLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
});
