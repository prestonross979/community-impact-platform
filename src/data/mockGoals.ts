import { SharedGoal } from '../types';

export const mockGoals: SharedGoal[] = [
  {
    id: 'g1',
    title: '1,000 Meals Packed for the Food Bank',
    description:
      'Our congregation is coming together to pack 1,000 meals for families facing food insecurity this summer.',
    unit: 'count',
    target: 1000,
    current: 640,
    deadline: '2026-08-15',
    participants: [
      { id: 'c1', name: 'Maria Gonzalez', initials: 'MG', avatarColor: '#5B4B8A' },
      { id: 'c2', name: 'David Okafor', initials: 'DO', avatarColor: '#4A90D9' },
      { id: 'c3', name: 'Sarah Kim', initials: 'SK', avatarColor: '#E0A458' },
      { id: 'c4', name: 'James Whitfield', initials: 'JW', avatarColor: '#4CAF83' },
      { id: 'c5', name: 'Priya Patel', initials: 'PP', avatarColor: '#D9738F' },
    ],
  },
  {
    id: 'g2',
    title: '500 Volunteer Hours This Quarter',
    description:
      'Tracking hours served across all ministries — from greeting to childcare to facilities — as we aim to double last quarter\'s impact.',
    unit: 'hours',
    target: 500,
    current: 318,
    deadline: '2026-09-30',
    participants: [
      { id: 'c6', name: 'Samuel Torres', initials: 'ST', avatarColor: '#7E6BB0' },
      { id: 'c7', name: 'The Chen Family', initials: 'CF', avatarColor: '#C97B4A' },
      { id: 'c1', name: 'Maria Gonzalez', initials: 'MG', avatarColor: '#5B4B8A' },
    ],
  },
  {
    id: 'g3',
    title: '$10,000 for New Member Care Packages',
    description:
      'Providing a welcome package and first-month support fund for every new member and visiting family this year.',
    unit: 'currency',
    target: 10000,
    current: 7250,
    deadline: '2026-12-01',
    participants: [
      { id: 'c8', name: 'Pastor Michael Ellis', initials: 'ME', avatarColor: '#5B4B8A' },
      { id: 'c2', name: 'David Okafor', initials: 'DO', avatarColor: '#4A90D9' },
      { id: 'c9', name: 'Youth Ministry Team', initials: 'YM', avatarColor: '#E0A458' },
      { id: 'c4', name: 'James Whitfield', initials: 'JW', avatarColor: '#4CAF83' },
    ],
  },
  {
    id: 'g4',
    title: '200 New Small Group Sign-Ups',
    description:
      'Helping 200 people find a small group home this fall so no one walks through this season alone.',
    unit: 'count',
    target: 200,
    current: 146,
    deadline: '2026-09-01',
    participants: [
      { id: 'c3', name: 'Sarah Kim', initials: 'SK', avatarColor: '#E0A458' },
      { id: 'c5', name: 'Priya Patel', initials: 'PP', avatarColor: '#D9738F' },
    ],
  },
];
