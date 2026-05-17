/*
 * Project developed by Cinthia Gonçalez
 * Educational project for elementary school English students
 *
 * Bridge between the React UI and the Phaser scene. Both sides talk
 * through a tiny event bus instead of importing one another, which
 * keeps the game framework-agnostic.
 */
import Phaser from 'phaser';

export const gameBus = new Phaser.Events.EventEmitter();

export const GAME_EVENTS = {
  STEP: 'world:step',
  TELEPORT: 'world:teleport',
  AVATAR_CHANGED: 'world:avatar',
  VICTORY: 'world:victory',
  READY: 'world:ready',
} as const;
