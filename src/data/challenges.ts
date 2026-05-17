/*
 * Project developed by Cinthia Gonçalez
 * Educational project for elementary school English students
 *
 * Educational challenges focused on:
 *  • English directions (turn right / left, go straight, opposite,
 *    next to, between, on the corner, roundabout)
 *  • Past-tense structures (there was / there wasn't / there were /
 *    there weren't)
 *
 * All sentences use simple, friendly English suitable for elementary
 * school learners.
 */
import type { Challenge } from '@/types/game';

export const CHALLENGES: Challenge[] = [
  // ───────────────────────── DIRECTIONS ─────────────────────────
  {
    id: 'dir-001',
    category: 'directions',
    type: 'multiple-choice',
    prompt:
      'You see a bridge in front of you. The path turns to the right after the bridge. What do you do?',
    options: [
      { id: 'a', text: 'Go straight and then turn right.' },
      { id: 'b', text: 'Turn left before the bridge.' },
      { id: 'c', text: 'Stop and go back home.' },
      { id: 'd', text: 'Jump into the river.' },
    ],
    correctId: 'a',
    explanation: 'You go straight first, then you turn right after the bridge.',
  },
  {
    id: 'dir-002',
    category: 'directions',
    type: 'multiple-choice',
    prompt: 'The bakery is __________ the library. They share a wall!',
    hint: 'They are very close to each other.',
    options: [
      { id: 'a', text: 'between' },
      { id: 'b', text: 'next to' },
      { id: 'c', text: 'opposite' },
      { id: 'd', text: 'on the corner' },
    ],
    correctId: 'b',
    explanation: 'When two places share a wall, we say they are "next to" each other.',
  },
  {
    id: 'dir-003',
    category: 'directions',
    type: 'multiple-choice',
    prompt: 'The fountain is __________ the bakery and the library.',
    options: [
      { id: 'a', text: 'opposite' },
      { id: 'b', text: 'next to' },
      { id: 'c', text: 'between' },
      { id: 'd', text: 'on the corner' },
    ],
    correctId: 'c',
    explanation: 'When something is in the middle of two places, it is "between" them.',
  },
  {
    id: 'dir-004',
    category: 'directions',
    type: 'multiple-choice',
    prompt: 'The market is on the other side of the street. We say it is __________ the village hall.',
    options: [
      { id: 'a', text: 'between' },
      { id: 'b', text: 'next to' },
      { id: 'c', text: 'opposite' },
      { id: 'd', text: 'on the corner' },
    ],
    correctId: 'c',
    explanation: '"Opposite" means on the other side, facing it.',
  },
  {
    id: 'dir-005',
    category: 'directions',
    type: 'multiple-choice',
    prompt: 'You reach a roundabout. To go to the castle you must take the __________ exit.',
    hint: 'A roundabout is a round road with several exits.',
    options: [
      { id: 'a', text: 'first' },
      { id: 'b', text: 'second' },
      { id: 'c', text: 'third' },
      { id: 'd', text: 'fourth' },
    ],
    correctId: 'b',
    explanation: 'At a roundabout, count the exits in order. The castle is on the second exit today!',
  },
  {
    id: 'dir-006',
    category: 'directions',
    type: 'multiple-choice',
    prompt: 'Turn left at the bridge and go straight. The forest is __________ you.',
    options: [
      { id: 'a', text: 'in front of' },
      { id: 'b', text: 'behind' },
      { id: 'c', text: 'next to' },
      { id: 'd', text: 'opposite' },
    ],
    correctId: 'a',
    explanation: 'When you go straight ahead, the place ahead of you is "in front of" you.',
  },
  {
    id: 'dir-007',
    category: 'directions',
    type: 'true-false',
    prompt: 'Listen: "Turn right and then go straight." This means the same as "go straight and then turn right".',
    options: [
      { id: 'true', text: 'True' },
      { id: 'false', text: 'False' },
    ],
    correctId: 'false',
    explanation: 'Order matters! "Turn right and then go straight" is different from doing it in the opposite order.',
  },
  {
    id: 'dir-008',
    category: 'directions',
    type: 'multiple-choice',
    prompt: 'A small house is __________. It sits where two streets meet.',
    options: [
      { id: 'a', text: 'next to the river' },
      { id: 'b', text: 'on the corner' },
      { id: 'c', text: 'between the trees' },
      { id: 'd', text: 'opposite the castle' },
    ],
    correctId: 'b',
    explanation: 'A place where two streets meet is called "the corner".',
  },
  {
    id: 'dir-009',
    category: 'directions',
    type: 'multiple-choice',
    prompt: 'Aria looks at the map. The river is on her left. To follow the river she should walk __________.',
    options: [
      { id: 'a', text: 'opposite' },
      { id: 'b', text: 'straight ahead' },
      { id: 'c', text: 'to the right' },
      { id: 'd', text: 'backwards' },
    ],
    correctId: 'b',
    explanation: 'If the river runs beside her, she keeps going straight to follow it.',
  },
  {
    id: 'dir-010',
    category: 'directions',
    type: 'true-false',
    prompt: '"Next to" means very close, almost touching the other place.',
    options: [
      { id: 'true', text: 'True' },
      { id: 'false', text: 'False' },
    ],
    correctId: 'true',
    explanation: 'Yes! "Next to" means right beside, very close to.',
  },

  // ───────────────────────── LOCATION ─────────────────────────
  {
    id: 'loc-001',
    category: 'location',
    type: 'multiple-choice',
    prompt: 'Look at the village. The bakery is next to the library. So the library is __________ the bakery.',
    options: [
      { id: 'a', text: 'between' },
      { id: 'b', text: 'opposite' },
      { id: 'c', text: 'next to' },
      { id: 'd', text: 'on top of' },
    ],
    correctId: 'c',
    explanation: '"Next to" works both ways: A next to B = B next to A.',
  },
  {
    id: 'loc-002',
    category: 'location',
    type: 'multiple-choice',
    prompt: 'The fountain is in the middle of the village square. So the fountain is __________ the houses around it.',
    options: [
      { id: 'a', text: 'in the middle of' },
      { id: 'b', text: 'on the corner of' },
      { id: 'c', text: 'opposite to' },
      { id: 'd', text: 'below' },
    ],
    correctId: 'a',
    explanation: 'When something is at the center, it is "in the middle of" the area.',
  },
  {
    id: 'loc-003',
    category: 'location',
    type: 'multiple-choice',
    prompt: 'The mountains are far away, behind the castle. The castle is __________ the mountains and you.',
    options: [
      { id: 'a', text: 'next to' },
      { id: 'b', text: 'between' },
      { id: 'c', text: 'opposite' },
      { id: 'd', text: 'inside' },
    ],
    correctId: 'b',
    explanation: 'The castle stands "between" you and the mountains.',
  },
  {
    id: 'loc-004',
    category: 'location',
    type: 'true-false',
    prompt: 'If the market is opposite the bakery, you must cross the street to go from one to the other.',
    options: [
      { id: 'true', text: 'True' },
      { id: 'false', text: 'False' },
    ],
    correctId: 'true',
    explanation: '"Opposite" means on the other side, so you cross the street.',
  },
  {
    id: 'loc-005',
    category: 'location',
    type: 'multiple-choice',
    prompt: 'The little house is __________: it has a street on its left and a street in front of it.',
    options: [
      { id: 'a', text: 'between two parks' },
      { id: 'b', text: 'on the corner' },
      { id: 'c', text: 'opposite the castle' },
      { id: 'd', text: 'inside the forest' },
    ],
    correctId: 'b',
    explanation: 'A house with streets on two sides sits "on the corner".',
  },
  {
    id: 'loc-006',
    category: 'location',
    type: 'multiple-choice',
    prompt: 'A friendly cat sleeps __________ the bakery door. It is right by the door.',
    options: [
      { id: 'a', text: 'next to' },
      { id: 'b', text: 'opposite' },
      { id: 'c', text: 'between' },
      { id: 'd', text: 'far from' },
    ],
    correctId: 'a',
    explanation: 'Right by the door = "next to" the door.',
  },

  // ───────────────────────── PAST: there was / there were ─────────────────────────
  {
    id: 'past-001',
    category: 'past',
    type: 'multiple-choice',
    prompt: 'Yesterday, __________ a market near the castle.',
    options: [
      { id: 'a', text: 'there was' },
      { id: 'b', text: 'there were' },
      { id: 'c', text: 'there wasn\u2019t' },
      { id: 'd', text: 'there weren\u2019t' },
    ],
    correctId: 'a',
    explanation: 'We use "there was" with one (singular) thing — a market.',
  },
  {
    id: 'past-002',
    category: 'past',
    type: 'multiple-choice',
    prompt: 'Last week, __________ many flowers in the village square.',
    options: [
      { id: 'a', text: 'there was' },
      { id: 'b', text: 'there were' },
      { id: 'c', text: 'there wasn\u2019t' },
      { id: 'd', text: 'there weren\u2019t' },
    ],
    correctId: 'b',
    explanation: '"There were" is for plural things — many flowers.',
  },
  {
    id: 'past-003',
    category: 'past',
    type: 'multiple-choice',
    prompt: 'Yesterday, __________ any trees near the river. It was empty!',
    options: [
      { id: 'a', text: 'there was' },
      { id: 'b', text: 'there were' },
      { id: 'c', text: 'there wasn\u2019t' },
      { id: 'd', text: 'there weren\u2019t' },
    ],
    correctId: 'd',
    explanation: 'Negative + plural ("trees") → "there weren\u2019t".',
  },
  {
    id: 'past-004',
    category: 'past',
    type: 'multiple-choice',
    prompt: 'On Monday, __________ a baker in the bakery. The shop was closed.',
    options: [
      { id: 'a', text: 'there was' },
      { id: 'b', text: 'there were' },
      { id: 'c', text: 'there wasn\u2019t' },
      { id: 'd', text: 'there weren\u2019t' },
    ],
    correctId: 'c',
    explanation: 'Negative + singular ("a baker") → "there wasn\u2019t".',
  },
  {
    id: 'past-005',
    category: 'past',
    type: 'true-false',
    prompt: '"There were a princess in the castle." — Is this sentence correct?',
    options: [
      { id: 'true', text: 'True' },
      { id: 'false', text: 'False' },
    ],
    correctId: 'false',
    explanation: 'No. With one princess we say "There was a princess in the castle."',
  },
  {
    id: 'past-006',
    category: 'past',
    type: 'multiple-choice',
    prompt: 'Choose the correct sentence about the past.',
    options: [
      { id: 'a', text: 'There was three knights in the forest.' },
      { id: 'b', text: 'There were three knights in the forest.' },
      { id: 'c', text: 'There were a knight in the forest.' },
      { id: 'd', text: 'There weren\u2019t a knight in the forest.' },
    ],
    correctId: 'b',
    explanation: '"There were" goes with plural nouns like "three knights".',
  },
  {
    id: 'past-007',
    category: 'past',
    type: 'multiple-choice',
    prompt: 'Long ago, __________ a small bridge over the river.',
    options: [
      { id: 'a', text: 'there was' },
      { id: 'b', text: 'there were' },
      { id: 'c', text: 'there wasn\u2019t' },
      { id: 'd', text: 'there weren\u2019t' },
    ],
    correctId: 'a',
    explanation: 'One bridge (singular) → "there was".',
  },
  {
    id: 'past-008',
    category: 'past',
    type: 'multiple-choice',
    prompt: 'Yesterday, __________ any dragons in the village. Phew!',
    options: [
      { id: 'a', text: 'there was' },
      { id: 'b', text: 'there were' },
      { id: 'c', text: 'there wasn\u2019t' },
      { id: 'd', text: 'there weren\u2019t' },
    ],
    correctId: 'd',
    explanation: 'Plural + negative → "there weren\u2019t". (We use "any" in negatives.)',
  },
  {
    id: 'past-009',
    category: 'past',
    type: 'true-false',
    prompt: '"There wasn\u2019t any bread at the bakery yesterday." — Is the grammar correct?',
    options: [
      { id: 'true', text: 'True' },
      { id: 'false', text: 'False' },
    ],
    correctId: 'true',
    explanation: 'Yes! "Bread" is uncountable, so we use "there wasn\u2019t any bread".',
  },
  {
    id: 'past-010',
    category: 'past',
    type: 'multiple-choice',
    prompt: 'Look at the picture: yesterday, __________ two horses next to the castle gate.',
    options: [
      { id: 'a', text: 'there was' },
      { id: 'b', text: 'there were' },
      { id: 'c', text: 'there wasn\u2019t' },
      { id: 'd', text: 'there weren\u2019t' },
    ],
    correctId: 'b',
    explanation: 'Two horses are plural → "there were".',
  },
  {
    id: 'past-011',
    category: 'past',
    type: 'multiple-choice',
    prompt: 'Long ago, __________ a friendly wizard near the village.',
    options: [
      { id: 'a', text: 'there was' },
      { id: 'b', text: 'there were' },
      { id: 'c', text: 'there wasn\u2019t' },
      { id: 'd', text: 'there weren\u2019t' },
    ],
    correctId: 'a',
    explanation: 'One wizard (singular) → "there was".',
  },
  {
    id: 'past-012',
    category: 'past',
    type: 'multiple-choice',
    prompt: 'Last summer, __________ two brave knights at the bridge.',
    options: [
      { id: 'a', text: 'there was' },
      { id: 'b', text: 'there were' },
      { id: 'c', text: 'there wasn\u2019t' },
      { id: 'd', text: 'there weren\u2019t' },
    ],
    correctId: 'b',
    explanation: 'Two knights → plural → "there were".',
  },
  {
    id: 'dir-011',
    category: 'directions',
    type: 'multiple-choice',
    prompt: 'A red dragon is sleeping in the mountains, on the right side of the castle. The dragon is __________ the castle.',
    options: [
      { id: 'a', text: 'next to' },
      { id: 'b', text: 'opposite' },
      { id: 'c', text: 'between' },
      { id: 'd', text: 'inside' },
    ],
    correctId: 'a',
    explanation: 'On the right side of the castle = "next to" the castle.',
  },
  {
    id: 'loc-007',
    category: 'location',
    type: 'multiple-choice',
    prompt: 'A kind knight stands outside the village. The knight is __________ the village hall.',
    options: [
      { id: 'a', text: 'in front of' },
      { id: 'b', text: 'inside' },
      { id: 'c', text: 'on top of' },
      { id: 'd', text: 'between' },
    ],
    correctId: 'a',
    explanation: 'Standing outside, facing the door → "in front of" the building.',
  },
];

/** Convenience helpers. */
export const challengesByCategory = (category: Challenge['category']) =>
  CHALLENGES.filter((c) => c.category === category);

export const pickRandomChallenge = (rng: () => number = Math.random): Challenge => {
  return CHALLENGES[Math.floor(rng() * CHALLENGES.length)];
};
