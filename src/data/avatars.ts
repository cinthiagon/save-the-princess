/*
 * Project developed by Cinthia Gonçalez
 * Educational project for elementary school English students
 *
 * All avatars are 100% original artwork generated from inline pixel data.
 * Designed to celebrate diversity of skin tones, hair styles and genders,
 * without reinforcing stereotypes.
 */
import type { Avatar } from '@/types/game';

export const AVATARS: Avatar[] = [
  {
    id: 'aria',
    name: 'Aria the Brave',
    shortName: 'Aria',
    description: 'A cheerful explorer with a kind heart.',
    style: 'long-hair',
    palette: {
      skin: '#f1c8a0',
      skinShade: '#c89a73',
      hair: '#7a3b1a',
      hairShade: '#4d2410',
      outfit: '#5c4ddc',
      outfitShade: '#2f2891',
      accent: '#ffc371',
    },
  },
  {
    id: 'kai',
    name: 'Kai the Curious',
    shortName: 'Kai',
    description: 'A clever traveler who loves maps.',
    style: 'short-hair',
    palette: {
      skin: '#a87149',
      skinShade: '#7a4e2f',
      hair: '#1a1a1a',
      hairShade: '#000000',
      outfit: '#3f7d4a',
      outfitShade: '#1f4527',
      accent: '#ffc371',
    },
  },
  {
    id: 'mira',
    name: 'Mira the Bright',
    shortName: 'Mira',
    description: 'A bright thinker with a magic compass.',
    style: 'curls',
    palette: {
      skin: '#6b4226',
      skinShade: '#3f2614',
      hair: '#2b1a0d',
      hairShade: '#120a05',
      outfit: '#d8425a',
      outfitShade: '#88172a',
      accent: '#fbf5e1',
    },
  },
  {
    id: 'tariq',
    name: 'Tariq the Wise',
    shortName: 'Tariq',
    description: 'A wise wanderer with quiet courage.',
    style: 'turban',
    palette: {
      skin: '#c89a73',
      skinShade: '#8e6b4d',
      hair: '#2b1a0d',
      hairShade: '#120a05',
      outfit: '#4338b8',
      outfitShade: '#1f1873',
      accent: '#f4e7b6',
    },
  },
  {
    id: 'noa',
    name: 'Noa the Kind',
    shortName: 'Noa',
    description: 'A gentle hero who befriends everyone.',
    style: 'braids',
    palette: {
      skin: '#8a5a3b',
      skinShade: '#5d3a23',
      hair: '#3a1f10',
      hairShade: '#1c0d06',
      outfit: '#ff8a3d',
      outfitShade: '#b8521b',
      accent: '#fbf5e1',
    },
  },
  {
    id: 'lin',
    name: 'Lin the Swift',
    shortName: 'Lin',
    description: 'A swift adventurer with a hooded cloak.',
    style: 'hood',
    palette: {
      skin: '#f4d2b0',
      skinShade: '#c89a73',
      hair: '#1a1a1a',
      hairShade: '#000000',
      outfit: '#2c5d36',
      outfitShade: '#163d20',
      accent: '#ffc371',
    },
  },
];

export const getAvatarById = (id: string): Avatar => {
  const found = AVATARS.find((a) => a.id === id);
  return found ?? AVATARS[0];
};
