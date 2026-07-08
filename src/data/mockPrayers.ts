import { PrayerRequest } from '../types';

export const mockPrayers: PrayerRequest[] = [
  {
    id: 'pr1',
    name: 'Maria Gonzalez',
    isAnonymous: false,
    category: 'Health',
    message:
      'Please pray for my mother as she recovers from surgery this week. The doctors are optimistic, but the road to recovery will be long.',
    prayedCount: 47,
    postedAt: '2026-07-07',
  },
  {
    id: 'pr2',
    name: 'Anonymous',
    isAnonymous: true,
    category: 'Family',
    message:
      'My spouse and I are going through a really hard season in our marriage. Praying for wisdom, patience, and healing.',
    prayedCount: 63,
    postedAt: '2026-07-06',
  },
  {
    id: 'pr3',
    name: 'David Okafor',
    isAnonymous: false,
    category: 'Guidance',
    message:
      "I've been offered a new job in another state. Praying for clarity on whether this is the right move for my family.",
    prayedCount: 29,
    postedAt: '2026-07-06',
  },
  {
    id: 'pr4',
    name: 'The Chen Family',
    isAnonymous: false,
    category: 'Thanksgiving',
    message:
      'Praising God for a safe delivery of our baby girl, Willow, born last Sunday! Thank you to everyone who prayed with us.',
    prayedCount: 118,
    postedAt: '2026-07-04',
  },
  {
    id: 'pr5',
    name: 'Anonymous',
    isAnonymous: true,
    category: 'Grief',
    message:
      'Grieving the loss of my father this past week. Asking for comfort for our whole family as we plan the memorial.',
    prayedCount: 92,
    postedAt: '2026-07-03',
  },
  {
    id: 'pr6',
    name: 'Samuel Torres',
    isAnonymous: false,
    category: 'Guidance',
    message:
      'Starting a small business this fall. Praying for wisdom in the planning process and provision along the way.',
    prayedCount: 21,
    postedAt: '2026-07-02',
  },
  {
    id: 'pr7',
    name: 'Anonymous',
    isAnonymous: true,
    category: 'Health',
    message:
      'Struggling with anxiety lately. Would appreciate prayer for peace and for the right support along the way.',
    prayedCount: 54,
    postedAt: '2026-07-01',
  },
  {
    id: 'pr8',
    name: 'The Patel Family',
    isAnonymous: false,
    category: 'Other',
    message:
      'Please keep our college-bound daughter Priya in your prayers as she moves out of state next month.',
    prayedCount: 33,
    postedAt: '2026-06-29',
  },
];
