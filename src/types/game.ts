/*
 * Project developed by Cinthia Gonçalez
 * Educational project for elementary school English students
 */

export type AvatarId =
  | 'aria'
  | 'kai'
  | 'mira'
  | 'tariq'
  | 'noa'
  | 'lin';

export interface Avatar {
  id: AvatarId;
  name: string;
  shortName: string;
  description: string;
  /** Two-color palette used by the in-game pixel avatar. */
  palette: {
    skin: string;
    skinShade: string;
    hair: string;
    hairShade: string;
    outfit: string;
    outfitShade: string;
    accent: string;
  };
  /** Style of headgear/hair to differentiate avatars without stereotypes. */
  style:
    | 'short-hair'
    | 'long-hair'
    | 'braids'
    | 'turban'
    | 'hood'
    | 'curls';
}

export type TileType =
  | 'path'
  | 'grass'
  | 'forest'
  | 'bridge'
  | 'river-horizontal'
  | 'river-vertical'
  | 'mountain'
  | 'village'
  | 'house'
  | 'market'
  | 'bakery'
  | 'library'
  | 'fountain'
  | 'castle-start'
  | 'castle-end'
  | 'dragon'
  | 'wizard'
  | 'knight'
  | 'flowers'
  | 'sign';

export interface BoardTile {
  index: number;
  type: TileType;
  /** Optional label shown over the tile (e.g., "Bridge"). */
  label?: string;
  /** Optional reference name used by challenges (e.g., "bakery"). */
  reference?: string;
  /** Whether stepping on this tile triggers an educational challenge. */
  challenge: boolean;
}

export type ChallengeCategory = 'directions' | 'location' | 'past';

export type ChallengeType = 'multiple-choice' | 'true-false';

export interface ChallengeOption {
  id: string;
  text: string;
}

export interface Challenge {
  id: string;
  category: ChallengeCategory;
  type: ChallengeType;
  prompt: string;
  hint?: string;
  options: ChallengeOption[];
  /** Option id (multiple-choice) or "true" / "false" (true-false). */
  correctId: string;
  explanation: string;
}

export interface PlayerProgress {
  avatarId: AvatarId;
  position: number;
  score: number;
  lives: number;
  coins: number;
  stars: number;
  level: number;
  challengesAnswered: number;
  challengesCorrect: number;
  startedAt: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatarId: AvatarId;
  score: number;
  stars: number;
  timeSeconds: number;
  date: string; // ISO
}

export interface Settings {
  soundOn: boolean;
  musicOn: boolean;
  highContrast: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
}
