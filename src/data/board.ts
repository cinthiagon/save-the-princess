/*
 * Project developed by Cinthia Gonçalez
 * Educational project for elementary school English students
 *
 * The board is a strictly-adjacent path of 30 tiles that snakes from
 * the home tile (bottom-left) to the castle (mid-upper area). Every
 * consecutive pair of tiles has Manhattan distance exactly 1, so the
 * avatar never has to "teleport" diagonally between casas.
 *
 * Decorations are rendered separately so the landmarks the children
 * read about in the challenges (bakery, library, fountain, market,
 * river, mountains, dragon, wizard…) are always visible on screen.
 */
import type { BoardTile, TileType } from '@/types/game';

export interface Decoration {
  type: TileType;
  col: number;
  row: number;
}

export interface BoardLayout {
  /** Cols / rows of the underlying grid used for camera & rendering. */
  cols: number;
  rows: number;
  /** Total number of tiles the player walks through. */
  total: number;
  /** Tile size, in world pixels. */
  tileSize: number;
  tiles: BoardTile[];
  decorations: Decoration[];
}

/**
 * BOARD_PATH: the (col, row) coordinate of every walkable tile, in order.
 * Each pair of consecutive entries differs by exactly 1 in either col or
 * row (never both) so movement is always a single horizontal or vertical
 * step. Index here ↔ index in BOARD.tiles.
 */
export const BOARD_PATH: ReadonlyArray<{ col: number; row: number }> = [
  { col: 1, row: 10 },   // 0  start (home)
  { col: 2, row: 10 },   // 1
  { col: 3, row: 10 },   // 2
  { col: 4, row: 10 },   // 3
  { col: 5, row: 10 },   // 4  bridge over river
  { col: 6, row: 10 },   // 5
  { col: 7, row: 10 },   // 6
  { col: 8, row: 10 },   // 7  village
  { col: 9, row: 10 },   // 8  bakery
  { col: 10, row: 10 },  // 9  library
  { col: 10, row: 9 },   // 10 path up
  { col: 10, row: 8 },   // 11 fountain
  { col: 9, row: 8 },    // 12 market
  { col: 8, row: 8 },    // 13 house
  { col: 7, row: 8 },    // 14
  { col: 6, row: 8 },    // 15 bridge over river
  { col: 5, row: 8 },    // 16
  { col: 4, row: 8 },    // 17
  { col: 3, row: 8 },    // 18
  { col: 2, row: 8 },    // 19
  { col: 2, row: 7 },    // 20 path up
  { col: 2, row: 6 },    // 21
  { col: 3, row: 6 },    // 22
  { col: 4, row: 6 },    // 23
  { col: 5, row: 6 },    // 24
  { col: 6, row: 6 },    // 25
  { col: 7, row: 6 },    // 26 house at the foot of the mountains
  { col: 8, row: 6 },    // 27
  { col: 9, row: 6 },    // 28
  { col: 10, row: 6 },   // 29 castle
];

const TILES_30: BoardTile[] = [
  { index: 0,  type: 'castle-start', label: 'Home',      reference: 'home',     challenge: false },
  { index: 1,  type: 'path',         challenge: false },
  { index: 2,  type: 'path',         label: 'Forest',    reference: 'forest',   challenge: true,
    challengeId: 'ctx-forest-path', retreatTo: 0 },
  { index: 3,  type: 'path',         challenge: false },
  { index: 4,  type: 'bridge',       label: 'Bridge',    reference: 'bridge',   challenge: true,
    challengeId: 'ctx-bridge-first', retreatTo: 3 },
  { index: 5,  type: 'path',         challenge: false },
  { index: 6,  type: 'path',         challenge: true,
    challengeId: 'ctx-village-approach', retreatTo: 4 },
  { index: 7,  type: 'village',      label: 'Village',   reference: 'village',  challenge: true,
    challengeId: 'ctx-village-square', retreatTo: 6 },
  { index: 8,  type: 'bakery',       label: 'Bakery',    reference: 'bakery',   challenge: true,
    challengeId: 'ctx-bakery', retreatTo: 7 },
  { index: 9,  type: 'library',      label: 'Library',   reference: 'library',  challenge: true,
    challengeId: 'ctx-library', retreatTo: 8 },
  { index: 10, type: 'path',         challenge: false },
  { index: 11, type: 'fountain',     label: 'Fountain',  reference: 'fountain', challenge: true,
    challengeId: 'ctx-fountain', retreatTo: 10 },
  { index: 12, type: 'market',       label: 'Market',    reference: 'market',   challenge: true,
    challengeId: 'ctx-market', retreatTo: 11 },
  { index: 13, type: 'house',        label: 'Cottage',   reference: 'house',    challenge: false },
  { index: 14, type: 'path',         challenge: true,
    challengeId: 'ctx-cottage-after', retreatTo: 13 },
  { index: 15, type: 'bridge',       label: 'Bridge',    reference: 'bridge',   challenge: true,
    challengeId: 'ctx-bridge-second', retreatTo: 14 },
  { index: 16, type: 'path',         challenge: false },
  { index: 17, type: 'path',         challenge: true,
    challengeId: 'ctx-after-bridge', retreatTo: 15 },
  { index: 18, type: 'path',         challenge: false },
  { index: 19, type: 'path',         challenge: true,
    challengeId: 'ctx-mountain-prep', retreatTo: 18 },
  { index: 20, type: 'path',         challenge: false },
  { index: 21, type: 'path',         challenge: true,
    challengeId: 'ctx-dragon-spotted', retreatTo: 19 },
  { index: 22, type: 'path',         challenge: false },
  { index: 23, type: 'path',         label: 'Mountains', reference: 'mountains', challenge: true,
    challengeId: 'ctx-dragon-next-to', retreatTo: 21 },
  { index: 24, type: 'path',         challenge: false },
  { index: 25, type: 'path',         challenge: true,
    challengeId: 'ctx-castle-tower', retreatTo: 23 },
  { index: 26, type: 'house',        label: 'Cottage',   reference: 'house',    challenge: false },
  { index: 27, type: 'path',         challenge: true,
    challengeId: 'ctx-castle-gate', retreatTo: 25 },
  { index: 28, type: 'path',         challenge: false },
  { index: 29, type: 'castle-end',   label: 'Castle',    reference: 'castle',   challenge: false },
];

/**
 * Scenic decorations placed off the walkable path. They make the lesson
 * vocabulary concrete (children see the bakery while reading "next to
 * the bakery") and add medieval-fantasy flavour (dragon, wizard,
 * knight).
 */
const DECORATIONS_30: Decoration[] = [
  // Mountain border (top edge)
  { type: 'mountain', col: 0,  row: 0 },
  { type: 'mountain', col: 1,  row: 0 },
  { type: 'mountain', col: 2,  row: 0 },
  { type: 'mountain', col: 3,  row: 0 },
  { type: 'mountain', col: 13, row: 0 },
  { type: 'mountain', col: 14, row: 0 },
  { type: 'mountain', col: 15, row: 0 },
  { type: 'mountain', col: 16, row: 0 },
  { type: 'mountain', col: 17, row: 0 },
  { type: 'mountain', col: 0,  row: 1 },
  { type: 'mountain', col: 1,  row: 1 },
  { type: 'mountain', col: 16, row: 1 },
  { type: 'mountain', col: 17, row: 1 },
  { type: 'mountain', col: 0,  row: 2 },
  { type: 'mountain', col: 17, row: 2 },
  { type: 'mountain', col: 17, row: 3 },

  // Forest around the start area (forest region)
  { type: 'forest',   col: 0,  row: 9 },
  { type: 'forest',   col: 0,  row: 10 },
  { type: 'forest',   col: 0,  row: 11 },
  { type: 'forest',   col: 1,  row: 11 },
  { type: 'forest',   col: 2,  row: 11 },
  { type: 'forest',   col: 3,  row: 11 },
  { type: 'forest',   col: 4,  row: 11 },
  { type: 'forest',   col: 3,  row: 9 },
  { type: 'forest',   col: 2,  row: 9 },
  { type: 'forest',   col: 1,  row: 9 },

  // Forest around the south-east corner
  { type: 'forest',   col: 11, row: 11 },
  { type: 'forest',   col: 12, row: 11 },
  { type: 'forest',   col: 13, row: 11 },
  { type: 'forest',   col: 14, row: 11 },
  { type: 'forest',   col: 15, row: 11 },
  { type: 'forest',   col: 16, row: 11 },
  { type: 'forest',   col: 17, row: 11 },
  { type: 'forest',   col: 17, row: 10 },
  { type: 'forest',   col: 12, row: 10 },

  // River segments — two rivers run vertically; bridges (4 and 15) cross them
  { type: 'river-vertical', col: 5, row: 11 },
  { type: 'river-vertical', col: 5, row: 9  },
  { type: 'river-vertical', col: 6, row: 9  }, // small width
  { type: 'river-vertical', col: 6, row: 7  },
  { type: 'river-vertical', col: 6, row: 9  },

  // Mountains on the upper region — visible threats
  { type: 'mountain', col: 4,  row: 4 },
  { type: 'mountain', col: 5,  row: 4 },
  { type: 'mountain', col: 8,  row: 4 },
  { type: 'mountain', col: 9,  row: 4 },
  { type: 'mountain', col: 13, row: 4 },
  { type: 'mountain', col: 14, row: 4 },
  { type: 'mountain', col: 12, row: 5 },
  { type: 'mountain', col: 13, row: 5 },

  // Medieval threats / NPCs
  { type: 'dragon',   col: 14, row: 6 },
  { type: 'wizard',   col: 11, row: 8 },
  { type: 'knight',   col: 8,  row: 11 },

  // Friendly decorations along the road
  { type: 'flowers',  col: 6,  row: 11 },
  { type: 'flowers',  col: 7,  row: 11 },
  { type: 'flowers',  col: 9,  row: 11 },
  { type: 'flowers',  col: 3,  row: 7 },
  { type: 'flowers',  col: 1,  row: 6 },
  { type: 'flowers',  col: 11, row: 6 },

  // Signs near landmarks help the kids find their bearings
  { type: 'sign',     col: 1,  row: 11 },
  { type: 'sign',     col: 10, row: 11 },
];

export const BOARD: BoardLayout = {
  cols: 18,
  rows: 12,
  tileSize: 64,
  total: 30,
  tiles: TILES_30,
  decorations: DECORATIONS_30,
};

/** Helper: returns true iff every consecutive pair of path tiles is adjacent. */
export const isPathAdjacent = (): boolean => {
  for (let i = 1; i < BOARD_PATH.length; i++) {
    const a = BOARD_PATH[i - 1];
    const b = BOARD_PATH[i];
    const d = Math.abs(a.col - b.col) + Math.abs(a.row - b.row);
    if (d !== 1) return false;
  }
  return true;
};
