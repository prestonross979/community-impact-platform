import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../theme/colors';
import { mockFeed } from '../data/mockFeed';
import { FeedPost, FeedPostType } from '../types';
import { formatRelativeDate } from '../utils/format';
import Avatar from '../components/Avatar';
import Badge from '../components/Badge';

const TYPE_LABELS: Record<FeedPostType, string> = {
  announcement: 'Announcement',
  testimony: 'Testimony',
  event: 'Event',
  photo: 'Photo',
};

const TYPE_ICONS: Record<FeedPostType, keyof typeof Ionicons.glyphMap> = {
  announcement: 'megaphone-outline',
  testimony: 'star-outline',
  event: 'calendar-outline',
  photo: 'image-outline',
};

export default function CommunityFeedScreen() {
  const [posts, setPosts] = useState<FeedPost[]>(mockFeed);

  const toggleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const renderItem = ({ item }: { item: FeedPost }) => (
    <View style={styles.card}>
      <View style={styles.cardHeaderRow}>
        <Avatar initials={item.avatarInitials} color={item.avatarColor} size={40} />
        <View style={styles.cardHeaderText}>
          <Text style={styles.author}>{item.author}</Text>
          <Text style={styles.postedAt}>{formatRelativeDate(item.postedAt)}</Text>
        </View>
        <Badge label={TYPE_LABELS[item.type]} />
      </View>

      <Text style={styles.message}>{item.message}</Text>

      {item.type === 'photo' && (
        <View style={styles.photoPlaceholder}>
          <Ionicons name={TYPE_ICONS[item.type]} size={28} color={colors.textMuted} />
        </View>
      )}

      <View style={styles.footerRow}>
        <TouchableOpacity style={styles.actionButton} onPress={() => toggleLike(item.id)}>
          <Ionicons
            name={item.liked ? 'heart' : 'heart-outline'}
            size={18}
            color={item.liked ? colors.danger : colors.textSecondary}
          />
          <Text style={[styles.actionText, item.liked && styles.actionTextActive]}>{item.likes}</Text>
        </TouchableOpacity>
        <View style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={17} color={colors.textSecondary} />
          <Text style={styles.actionText}>{item.comments}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.headerWrap}>
        <Text style={styles.headerTitle}>Community Feed</Text>
        <Text style={styles.headerSubtitle}>Announcements, testimonies, and stories from our church</Text>
      </View>
      <FlatList
        data={posts}
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
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardHeaderText: {
    flex: 1,
  },
  author: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  postedAt: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 1,
  },
  message: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  photoPlaceholder: {
    height: 140,
    borderRadius: 12,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerRow: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 2,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  actionTextActive: {
    color: colors.danger,
  },
});
