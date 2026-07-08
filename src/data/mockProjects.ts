import { Project } from '../types';

export const mockProjects: Project[] = [
  {
    id: 'p1',
    title: 'New Fellowship Hall Roof',
    category: 'Building',
    icon: 'home-outline',
    summary: 'Replacing the aging roof over our fellowship hall before winter.',
    description:
      'Our fellowship hall roof has served us faithfully for over 30 years, but recent storms have exposed leaks that put our gathering space at risk. This project will fund a full roof replacement with durable, weather-resistant materials, ensuring the hall stays safe and dry for potlucks, youth events, and community meetings for decades to come.',
    goalAmount: 25000,
    raisedAmount: 17400,
    donorsCount: 132,
    daysLeft: 18,
    organizer: 'Facilities Committee',
    updates: [
      {
        id: 'p1-u1',
        date: '2026-07-02',
        title: 'Contractor selected',
        text: 'We reviewed three bids and selected a local contractor who has worked with churches in our area before. Work is scheduled to begin once we hit 80% funding.',
      },
      {
        id: 'p1-u2',
        date: '2026-06-20',
        title: 'Thank you for a strong start!',
        text: 'In just two weeks we reached 60% of our goal. Thank you to everyone who has given so generously.',
      },
    ],
  },
  {
    id: 'p2',
    title: 'Guatemala Mission Trip',
    category: 'Missions',
    icon: 'airplane-outline',
    summary: 'Sending 12 volunteers to build a schoolhouse in rural Guatemala.',
    description:
      'This August, a team of twelve from our congregation will travel to San Marcos, Guatemala, to partner with a local ministry building a schoolhouse for a community of 400 families. Funds cover travel, lodging, building materials, and school supplies for the children who will study there.',
    goalAmount: 18000,
    raisedAmount: 9650,
    donorsCount: 74,
    daysLeft: 34,
    organizer: 'Missions Team',
    updates: [
      {
        id: 'p2-u1',
        date: '2026-06-28',
        title: 'Team roster finalized',
        text: 'All twelve team members have completed training. We are so grateful for their willingness to serve.',
      },
    ],
  },
  {
    id: 'p3',
    title: 'Youth Retreat Scholarships',
    category: 'Youth',
    icon: 'sparkles-outline',
    summary: 'Making sure every student can attend fall retreat, regardless of cost.',
    description:
      'Our fall youth retreat is a highlight of the year, but the registration fee can be a barrier for some families. This fund provides full and partial scholarships so every student who wants to attend can go, no questions asked.',
    goalAmount: 6000,
    raisedAmount: 4120,
    donorsCount: 58,
    daysLeft: 12,
    organizer: 'Youth Ministry',
    updates: [
      {
        id: 'p3-u1',
        date: '2026-07-05',
        title: '38 students registered so far',
        text: 'Thanks to early giving, ten students already have their fees fully covered.',
      },
    ],
  },
  {
    id: 'p4',
    title: 'Community Food Pantry Restock',
    category: 'Outreach',
    icon: 'basket-outline',
    summary: 'Keeping shelves full for the 200+ families we serve each month.',
    description:
      'Our weekly food pantry serves over 200 families in the neighborhood. Rising grocery costs mean our budget stretches thinner every month. This fund goes directly toward restocking shelf-stable food, fresh produce, and hygiene items.',
    goalAmount: 8000,
    raisedAmount: 6980,
    donorsCount: 211,
    daysLeft: 9,
    organizer: 'Outreach Ministry',
    updates: [
      {
        id: 'p4-u1',
        date: '2026-07-06',
        title: 'Almost there!',
        text: 'We are less than $1,100 away from restocking through the end of the quarter.',
      },
      {
        id: 'p4-u2',
        date: '2026-06-15',
        title: 'New refrigeration unit installed',
        text: 'Thanks to a generous grant, we can now store fresh produce and dairy for pantry guests.',
      },
    ],
  },
  {
    id: 'p5',
    title: 'Disaster Relief: Gulf Coast',
    category: 'Relief',
    icon: 'water-outline',
    summary: 'Emergency aid for families displaced by recent flooding.',
    description:
      'In partnership with a regional relief network, we are collecting emergency funds for families displaced by flooding along the Gulf Coast. 100% of funds go toward temporary housing, clean water, and essential supplies distributed within the first two weeks.',
    goalAmount: 15000,
    raisedAmount: 11250,
    donorsCount: 189,
    daysLeft: 6,
    organizer: 'Relief Response Team',
    updates: [
      {
        id: 'p5-u1',
        date: '2026-07-07',
        title: 'First truck of supplies delivered',
        text: 'Our partner ministry delivered the first shipment of water and hygiene kits yesterday.',
      },
    ],
  },
  {
    id: 'p6',
    title: 'Worship Team Sound Upgrade',
    category: 'Worship',
    icon: 'musical-notes-outline',
    summary: 'New audio equipment so every seat can hear clearly.',
    description:
      'Our current sound system is over a decade old and struggles to keep up during larger gatherings. This upgrade brings new speakers, a modern mixing board, and wireless microphones so the whole room can worship together without distraction.',
    goalAmount: 12000,
    raisedAmount: 3200,
    donorsCount: 41,
    daysLeft: 45,
    organizer: 'Worship Ministry',
    updates: [],
  },
];
