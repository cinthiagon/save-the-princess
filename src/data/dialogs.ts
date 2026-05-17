/*
 * Project developed by Cinthia Gonçalez
 * Educational project for elementary school English students
 *
 * Friendly NPC dialog lines used between regions. Kept positive and
 * encouraging, with short sentences for younger learners.
 */
export interface DialogLine {
  speaker: string;
  text: string;
}

export const INTRO_DIALOG: DialogLine[] = [
  {
    speaker: 'Old Mapmaker',
    text: 'Welcome, brave hero! The princess is locked in the great castle.',
  },
  {
    speaker: 'Old Mapmaker',
    text: 'Roll the dice, walk the path, and answer the riddles in English.',
  },
  {
    speaker: 'Old Mapmaker',
    text: 'Remember: turn right, turn left, go straight — and good luck!',
  },
];

export const VICTORY_DIALOG: DialogLine[] = [
  { speaker: 'Princess', text: 'You did it! Thank you, brave friend!' },
  { speaker: 'Princess', text: 'You learned directions and the past — what a hero!' },
];

export const TIPS: string[] = [
  '"Turn right" and "turn left" come before the place.',
  '"Next to" means right beside, almost touching.',
  '"Between" is in the middle of two places.',
  'Use "there was" for one thing, "there were" for many.',
  'Use "there wasn\u2019t" and "there weren\u2019t" for negatives.',
];
