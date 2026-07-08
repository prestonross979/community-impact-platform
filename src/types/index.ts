export type ProjectCategory =
  | 'Building'
  | 'Missions'
  | 'Outreach'
  | 'Youth'
  | 'Relief'
  | 'Worship';

export interface ProjectUpdate {
  id: string;
  date: string;
  title: string;
  text: string;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  icon: string;
  summary: string;
  description: string;
  goalAmount: number;
  raisedAmount: number;
  donorsCount: number;
  daysLeft: number;
  organizer: string;
  updates: ProjectUpdate[];
}

export type PrayerCategory =
  | 'Health'
  | 'Family'
  | 'Guidance'
  | 'Thanksgiving'
  | 'Grief'
  | 'Other';

export interface PrayerRequest {
  id: string;
  name: string;
  isAnonymous: boolean;
  category: PrayerCategory;
  message: string;
  prayedCount: number;
  postedAt: string;
}

export type FeedPostType = 'announcement' | 'testimony' | 'event' | 'photo';

export interface FeedPost {
  id: string;
  author: string;
  avatarColor: string;
  avatarInitials: string;
  type: FeedPostType;
  message: string;
  postedAt: string;
  likes: number;
  comments: number;
  liked?: boolean;
}

export interface GoalContributor {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
}

export type GoalUnit = 'currency' | 'count' | 'hours';

export interface SharedGoal {
  id: string;
  title: string;
  description: string;
  unit: GoalUnit;
  target: number;
  current: number;
  participants: GoalContributor[];
  deadline: string;
}

export interface CurrentUser {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
}
