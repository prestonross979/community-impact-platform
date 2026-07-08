import { FeedPost } from '../types';

export const mockFeed: FeedPost[] = [
  {
    id: 'f1',
    author: 'Pastor Michael Ellis',
    avatarColor: '#5B4B8A',
    avatarInitials: 'ME',
    type: 'announcement',
    message:
      "Join us this Sunday for a special combined service celebrating our church's 40th anniversary! Fellowship lunch to follow in the courtyard.",
    postedAt: '2026-07-07',
    likes: 84,
    comments: 12,
  },
  {
    id: 'f2',
    author: 'Sarah Kim',
    avatarColor: '#4A90D9',
    avatarInitials: 'SK',
    type: 'testimony',
    message:
      "After months of prayer, I finally got the all-clear from my doctor. God's faithfulness through this season has changed how I see everything. Thank you all for walking with me.",
    postedAt: '2026-07-06',
    likes: 156,
    comments: 31,
  },
  {
    id: 'f3',
    author: 'Youth Ministry',
    avatarColor: '#E0A458',
    avatarInitials: 'YM',
    type: 'event',
    message:
      'Registration for the fall retreat is now open! Spots fill up fast, so grab yours today. Scholarships available — just ask.',
    postedAt: '2026-07-05',
    likes: 61,
    comments: 8,
  },
  {
    id: 'f4',
    author: 'Outreach Ministry',
    avatarColor: '#4CAF83',
    avatarInitials: 'OM',
    type: 'photo',
    message:
      "What a morning at the food pantry! We served 214 families this week thanks to our incredible volunteer team. Here's a snapshot from today.",
    postedAt: '2026-07-04',
    likes: 97,
    comments: 6,
  },
  {
    id: 'f5',
    author: 'James Whitfield',
    avatarColor: '#D9738F',
    avatarInitials: 'JW',
    type: 'testimony',
    message:
      "Baptized my son yesterday and it was the best day of my life. So thankful for this church family for celebrating with us.",
    postedAt: '2026-07-03',
    likes: 203,
    comments: 44,
  },
  {
    id: 'f6',
    author: 'Worship Team',
    avatarColor: '#7E6BB0',
    avatarInitials: 'WT',
    type: 'announcement',
    message:
      "We're looking for volunteers to join the tech and sound booth team. No experience needed — training provided! Reach out after service if you're interested.",
    postedAt: '2026-07-01',
    likes: 38,
    comments: 5,
  },
];
