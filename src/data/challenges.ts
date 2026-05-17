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
 * EACH CHALLENGE IS CONTEXTUAL — the prompt narrates what the player
 * can see at the current tile (the dragon next to the bridge, the
 * fountain in the middle of the square…). This makes the lesson
 * concrete and ties the answer directly to the player's progression:
 *
 *   ✔ Correct  → the hero takes one bonus step toward the castle.
 *   ✘ Wrong    → the hero retreats to the safe checkpoint of the tile
 *                (`tile.retreatTo`) and loses a life.
 *
 * AUTHORING RULE — every challenge MUST have EXACTLY one correct option.
 * For past-tense prompts that means the sentence has to lock BOTH
 * dimensions independently:
 *   • Number (singular vs plural) → use a / one / many / two / lots of…
 *   • Polarity (positive vs negative) → use Yes! / lots of them / many
 *     for positive; any / Phew! for negative. ("No <noun>" keeps the
 *     verb POSITIVE because the negation is on the noun, not the verb,
 *     so "there was no roof" is correct and "there wasn't no roof" is
 *     a double negative.)
 */
import type { Challenge } from '@/types/game';

export const CHALLENGES: Challenge[] = [
  // ─── 2 · Forest path ─────────────────────────────────────────────────
  {
    id: 'ctx-forest-path',
    category: 'directions',
    type: 'multiple-choice',
    prompt:
      'Tall trees stand on your LEFT and on your RIGHT — the forest is all around you. To follow the path you should go…',
    hint: 'Look at the path: it continues forward.',
    options: [
      { id: 'a', text: 'straight ahead' },
      { id: 'b', text: 'backwards, to home' },
      { id: 'c', text: 'into the trees on the left' },
      { id: 'd', text: 'into the trees on the right' },
    ],
    correctId: 'a',
    explanation: 'When the path continues forward, you "go straight ahead".',
  },

  // ─── 4 · First bridge over the river ─────────────────────────────────
  {
    id: 'ctx-bridge-first',
    category: 'directions',
    type: 'multiple-choice',
    prompt:
      'You are standing on a wooden bridge. The river runs UNDER the bridge. To reach the other side you must walk…',
    options: [
      { id: 'a', text: 'across the bridge' },
      { id: 'b', text: 'into the river' },
      { id: 'c', text: 'opposite of the path' },
      { id: 'd', text: 'behind the trees' },
    ],
    correctId: 'a',
    explanation: 'To go from one side to the other side of a bridge, you walk "across".',
  },

  // ─── 6 · Path approaching the village ────────────────────────────────
  {
    id: 'ctx-village-approach',
    category: 'directions',
    type: 'multiple-choice',
    prompt:
      'A friendly KNIGHT stands on the grass, FACING the village hall door. The knight is __________ the village hall.',
    options: [
      { id: 'a', text: 'in front of' },
      { id: 'b', text: 'inside' },
      { id: 'c', text: 'on top of' },
      { id: 'd', text: 'between' },
    ],
    correctId: 'a',
    explanation: 'Standing outside and facing a building → "in front of" it.',
  },

  // ─── 7 · Village hall ────────────────────────────────────────────────
  {
    id: 'ctx-village-square',
    category: 'location',
    type: 'multiple-choice',
    prompt:
      'Welcome to the village! The bakery is on your RIGHT and the library is right after it. The bakery is __________ the library.',
    options: [
      { id: 'a', text: 'next to' },
      { id: 'b', text: 'opposite' },
      { id: 'c', text: 'between' },
      { id: 'd', text: 'far from' },
    ],
    correctId: 'a',
    explanation: 'When two buildings share a wall (or sit side by side), they are "next to" each other.',
  },

  // ─── 8 · Bakery ──────────────────────────────────────────────────────
  {
    id: 'ctx-bakery',
    category: 'location',
    type: 'multiple-choice',
    prompt:
      'You can smell fresh bread! You are at the bakery door. The library sits RIGHT BESIDE the bakery. So the library is __________ the bakery.',
    options: [
      { id: 'a', text: 'next to' },
      { id: 'b', text: 'inside' },
      { id: 'c', text: 'opposite' },
      { id: 'd', text: 'far from' },
    ],
    correctId: 'a',
    explanation: '"Next to" means right beside, almost touching.',
  },

  // ─── 9 · Library ─────────────────────────────────────────────────────
  {
    id: 'ctx-library',
    category: 'location',
    type: 'multiple-choice',
    prompt:
      'You are at the library. The bakery is on your LEFT and the fountain is on your RIGHT — the library is right in the MIDDLE. The library is __________ the bakery and the fountain.',
    options: [
      { id: 'a', text: 'between' },
      { id: 'b', text: 'opposite' },
      { id: 'c', text: 'inside' },
      { id: 'd', text: 'in front of' },
    ],
    correctId: 'a',
    explanation: 'When a place is in the middle of two other places, it is "between" them.',
  },

  // ─── 11 · Fountain ───────────────────────────────────────────────────
  {
    id: 'ctx-fountain',
    category: 'past',
    type: 'multiple-choice',
    prompt:
      'You stop at the village FOUNTAIN. Long ago, this same spot had a small wishing well. Yes — there __________ a wishing well here, just ONE!',
    hint: 'Singular noun ("a wishing well") and the sentence affirms it existed.',
    options: [
      { id: 'a', text: 'was' },
      { id: 'b', text: 'were' },
      { id: 'c', text: 'wasn\u2019t' },
      { id: 'd', text: 'weren\u2019t' },
    ],
    correctId: 'a',
    explanation: 'One wishing well (singular) + the sentence affirms it existed → "there was".',
  },

  // ─── 12 · Market ─────────────────────────────────────────────────────
  {
    id: 'ctx-market',
    category: 'past',
    type: 'multiple-choice',
    prompt:
      'The MARKET stall is bursting with fruit today! Yesterday, the basket was FULL too — there __________ many fresh apples on this table, LOTS of them!',
    hint: 'Plural noun ("apples") and the sentence affirms there were lots.',
    options: [
      { id: 'a', text: 'was' },
      { id: 'b', text: 'were' },
      { id: 'c', text: 'wasn\u2019t' },
      { id: 'd', text: 'weren\u2019t' },
    ],
    correctId: 'b',
    explanation: 'Many apples (plural) + a positive affirmation ("LOTS of them") → "there were".',
  },

  // ─── 14 · Path leaving the village ───────────────────────────────────
  {
    id: 'ctx-cottage-after',
    category: 'directions',
    type: 'multiple-choice',
    prompt:
      'A small COTTAGE sits behind you and another bridge is just AHEAD. To reach the next bridge you should…',
    options: [
      { id: 'a', text: 'go straight ahead' },
      { id: 'b', text: 'turn around' },
      { id: 'c', text: 'walk into the river' },
      { id: 'd', text: 'climb the cottage roof' },
    ],
    correctId: 'a',
    explanation: 'When the next place is ahead on the path, you "go straight ahead".',
  },

  // ─── 15 · Second bridge ──────────────────────────────────────────────
  {
    id: 'ctx-bridge-second',
    category: 'directions',
    type: 'multiple-choice',
    prompt:
      'This second bridge feels wobbly! The river flows BELOW you. Walk __________ the bridge slowly to stay safe.',
    options: [
      { id: 'a', text: 'across' },
      { id: 'b', text: 'into' },
      { id: 'c', text: 'opposite' },
      { id: 'd', text: 'under' },
    ],
    correctId: 'a',
    explanation: 'You walk "across" a bridge to reach the other side.',
  },

  // ─── 17 · Path past the bridge ───────────────────────────────────────
  {
    id: 'ctx-after-bridge',
    category: 'past',
    type: 'multiple-choice',
    prompt:
      'Footprints cover the wet path everywhere! Yesterday there __________ many travellers walking here — LOTS of them!',
    hint: 'Plural noun ("travellers") and the sentence affirms there were lots.',
    options: [
      { id: 'a', text: 'was' },
      { id: 'b', text: 'were' },
      { id: 'c', text: 'wasn\u2019t' },
      { id: 'd', text: 'weren\u2019t' },
    ],
    correctId: 'b',
    explanation: 'Plural ("travellers") + a positive affirmation ("LOTS of them") → "there were".',
  },

  // ─── 19 · Path turns up toward the mountains ─────────────────────────
  {
    id: 'ctx-mountain-prep',
    category: 'directions',
    type: 'multiple-choice',
    prompt:
      'You see tall MOUNTAINS ahead and the path turns to go UP. To follow the path you must go…',
    options: [
      { id: 'a', text: 'up, then to the right' },
      { id: 'b', text: 'back to the bridge' },
      { id: 'c', text: 'down into the river' },
      { id: 'd', text: 'opposite of the mountains' },
    ],
    correctId: 'a',
    explanation: 'The path climbs up and then turns right to reach the castle.',
  },

  // ─── 21 · Dragon spotted! ────────────────────────────────────────────
  {
    id: 'ctx-dragon-spotted',
    category: 'past',
    type: 'multiple-choice',
    prompt:
      'Careful! A red DRAGON is sleeping in the mountains. Long ago this peak even had TWO dragons living on top — yes, there __________ TWO of them up here!',
    hint: 'Plural noun ("two of them") and "yes" confirms they existed.',
    options: [
      { id: 'a', text: 'was' },
      { id: 'b', text: 'were' },
      { id: 'c', text: 'wasn\u2019t' },
      { id: 'd', text: 'weren\u2019t' },
    ],
    correctId: 'b',
    explanation: 'Two dragons (plural) + a positive affirmation ("yes…TWO of them") → "there were".',
  },

  // ─── 23 · Dragon "next to" the path ──────────────────────────────────
  {
    id: 'ctx-dragon-next-to',
    category: 'directions',
    type: 'multiple-choice',
    prompt:
      'There is a DRAGON next to this part of the path — what does "NEXT TO" mean here?',
    hint: 'The dragon is sleeping right beside you on the right.',
    options: [
      { id: 'a', text: 'right beside, very close' },
      { id: 'b', text: 'very far away' },
      { id: 'c', text: 'inside the path' },
      { id: 'd', text: 'on the opposite side of the world' },
    ],
    correctId: 'a',
    explanation: '"Next to" means right beside, almost touching.',
  },

  // ─── 25 · Castle towers in sight ─────────────────────────────────────
  {
    id: 'ctx-castle-tower',
    category: 'past',
    type: 'multiple-choice',
    prompt:
      'Look at the CASTLE — the smaller tower has no roof! Long ago it was the same: there __________ ANY roof on it back then.',
    hint: 'Singular noun ("roof") + "any" forces the negative form.',
    options: [
      { id: 'a', text: 'was' },
      { id: 'b', text: 'were' },
      { id: 'c', text: 'wasn\u2019t' },
      { id: 'd', text: 'weren\u2019t' },
    ],
    correctId: 'c',
    explanation: 'Singular noun ("roof") + "any" → negative verb → "there wasn\u2019t".',
  },

  // ─── 27 · Castle gates ───────────────────────────────────────────────
  {
    id: 'ctx-castle-gate',
    category: 'directions',
    type: 'multiple-choice',
    prompt:
      'The CASTLE GATES are just IN FRONT OF you. The princess is inside! To reach her you must go…',
    options: [
      { id: 'a', text: 'straight ahead' },
      { id: 'b', text: 'backwards' },
      { id: 'c', text: 'into the forest' },
      { id: 'd', text: 'up the mountains again' },
    ],
    correctId: 'a',
    explanation: 'Going forward to reach a destination = "go straight ahead".',
  },
];

/** Lookup by id (used by the per-tile pipeline). */
const BY_ID = new Map<string, Challenge>(CHALLENGES.map((c) => [c.id, c]));

export const getChallengeById = (id: string): Challenge | undefined => BY_ID.get(id);

/** Fallback random pick when a tile has no `challengeId`. */
export const pickRandomChallenge = (rng: () => number = Math.random): Challenge => {
  return CHALLENGES[Math.floor(rng() * CHALLENGES.length)];
};
