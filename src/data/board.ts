/*
 * Project developed by Cinthia Gonçalez
 * Educational project for elementary school English students
 *
 * The board is a one-way path from the start to the castle, threaded
 * through 6 themed regions (forest, bridge, village, river, mountains,
 * castle). Each tile is procedurally placed on a grid for the world
 * Phaser scene.
 */
import type { BoardTile } from '@/types/game';

export interface BoardLayout {
  /** Cols / rows of the underlying grid used for camera & rendering. */
  cols: number;
  rows: number;
  /** Total number of tiles the player walks through. */
  total: number;
  /** Tile size, in world pixels, used by Phaser. */
  tileSize: number;
  tiles: BoardTile[];
}

/**
 * The 30-tile journey was carefully designed so every ~3 tiles drops the
 * player into a different educational topic, and so the route weaves
 * through every landmark mentioned in the game story.
 */
export const BOARD: BoardLayout = {
  cols: 18,
  rows: 12,
  tileSize: 64,
  total: 30,
  tiles: [
    { index: 0, type: 'castle-start', label: 'Home', reference: 'home', challenge: false },
    { index: 1, type: 'path', challenge: false },
    { index: 2, type: 'grass', challenge: true },
    { index: 3, type: 'forest', label: 'Forest', reference: 'forest', challenge: false },
    { index: 4, type: 'forest', challenge: true },
    { index: 5, type: 'path', challenge: false },
    { index: 6, type: 'bridge', label: 'Bridge', reference: 'bridge', challenge: true },
    { index: 7, type: 'river', challenge: false },
    { index: 8, type: 'path', challenge: false },
    { index: 9, type: 'village', label: 'Village', reference: 'village', challenge: true },
    { index: 10, type: 'bakery', label: 'Bakery', reference: 'bakery', challenge: true },
    { index: 11, type: 'library', label: 'Library', reference: 'library', challenge: false },
    { index: 12, type: 'fountain', label: 'Fountain', reference: 'fountain', challenge: true },
    { index: 13, type: 'market', label: 'Market', reference: 'market', challenge: true },
    { index: 14, type: 'house', reference: 'house', challenge: false },
    { index: 15, type: 'path', challenge: true },
    { index: 16, type: 'grass', challenge: false },
    { index: 17, type: 'river', label: 'River', reference: 'river', challenge: true },
    { index: 18, type: 'bridge', challenge: false },
    { index: 19, type: 'path', challenge: true },
    { index: 20, type: 'mountain', label: 'Mountains', reference: 'mountains', challenge: false },
    { index: 21, type: 'mountain', challenge: true },
    { index: 22, type: 'mountain', challenge: false },
    { index: 23, type: 'path', challenge: true },
    { index: 24, type: 'grass', challenge: false },
    { index: 25, type: 'path', challenge: true },
    { index: 26, type: 'grass', challenge: false },
    { index: 27, type: 'path', challenge: true },
    { index: 28, type: 'path', challenge: false },
    { index: 29, type: 'castle-end', label: 'Castle', reference: 'castle', challenge: false },
  ],
};

/**
 * The serpentine route the player walks. Each entry is a grid (col,row)
 * pair for the tile of the matching index. The serpentine layout fits
 * 30 tiles inside an 18×12 grid and never overlaps.
 */
export const BOARD_PATH: Array<{ col: number; row: number }> = [
  { col: 1, row: 10 },
  { col: 2, row: 10 },
  { col: 3, row: 10 },
  { col: 4, row: 10 },
  { col: 5, row: 10 },
  { col: 6, row: 10 },
  { col: 7, row: 10 },
  { col: 8, row: 10 },
  { col: 9, row: 10 },
  { col: 10, row: 10 },
  { col: 10, row: 9 },
  { col: 10, row: 8 },
  { col: 9, row: 8 },
  { col: 8, row: 8 },
  { col: 7, row: 8 },
  { col: 6, row: 8 },
  { col: 5, row: 8 },
  { col: 4, row: 8 },
  { col: 3, row: 8 },
  { col: 3, row: 7 },
  { col: 3, row: 6 },
  { col: 4, row: 6 },
  { col: 5, row: 6 },
  { col: 6, row: 6 },
  { col: 7, row: 6 },
  { col: 8, row: 6 },
  { col: 9, row: 6 },
  { col: 10, row: 6 },
  { col: 11, row: 6 },
  { col: 12, row: 4 },
];
