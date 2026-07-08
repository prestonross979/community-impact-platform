import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../theme/colors';
import { TabParamList } from './types';
import HomeDashboardScreen from '../screens/HomeDashboardScreen';
import ProjectsScreen from '../screens/ProjectsScreen';
import PrayerRequestsScreen from '../screens/PrayerRequestsScreen';
import CommunityFeedScreen from '../screens/CommunityFeedScreen';
import SharedGoalsScreen from '../screens/SharedGoalsScreen';

const Tab = createBottomTabNavigator<TabParamList>();

const TAB_ICONS: Record<keyof TabParamList, { active: keyof typeof Ionicons.glyphMap; inactive: keyof typeof Ionicons.glyphMap }> = {
  Home: { active: 'home', inactive: 'home-outline' },
  Projects: { active: 'heart', inactive: 'heart-outline' },
  Prayer: { active: 'hand-left', inactive: 'hand-left-outline' },
  Feed: { active: 'newspaper', inactive: 'newspaper-outline' },
  Goals: { active: 'ribbon', inactive: 'ribbon-outline' },
};

export default function TabNavigator() {
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, 14);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          borderTopColor: colors.border,
          height: 68 + bottomPadding,
          paddingBottom: bottomPadding,
          paddingTop: 12,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
          marginTop: 2,
        },
        tabBarIcon: ({ color, focused }) => {
          const icons = TAB_ICONS[route.name];
          return (
            <Ionicons name={focused ? icons.active : icons.inactive} size={28} color={color} />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeDashboardScreen} />
      <Tab.Screen name="Projects" component={ProjectsScreen} options={{ title: 'Projects' }} />
      <Tab.Screen name="Prayer" component={PrayerRequestsScreen} options={{ title: 'Prayer' }} />
      <Tab.Screen name="Feed" component={CommunityFeedScreen} options={{ title: 'Feed' }} />
      <Tab.Screen name="Goals" component={SharedGoalsScreen} options={{ title: 'Goals' }} />
    </Tab.Navigator>
  );
}
