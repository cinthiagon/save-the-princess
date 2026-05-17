/*
 * Project developed by Cinthia Gonçalez
 * Educational project for elementary school English students
 *
 * React wrapper around the Phaser game instance. The world scene reads
 * the player's avatar + starting position from props and listens to the
 * shared event bus to move the character.
 */
import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { WorldScene } from '@/scenes/WorldScene';
import type { AvatarId } from '@/types/game';
import { gameBus, GAME_EVENTS } from '@/game/events';

interface PhaserGameProps {
  avatarId: AvatarId;
  position: number;
  onVictory?: () => void;
}

export const PhaserGame = ({ avatarId, position, onVictory }: PhaserGameProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const gameRef = useRef<Phaser.Game | null>(null);
  const sceneReady = useRef(false);
  const onVictoryRef = useRef(onVictory);

  useEffect(() => {
    onVictoryRef.current = onVictory;
  }, [onVictory]);

  useEffect(() => {
    if (!containerRef.current) return;
    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: containerRef.current,
      backgroundColor: '#1f4527',
      pixelArt: true,
      antialias: false,
      roundPixels: true,
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: '100%',
        height: '100%',
      },
      scene: new WorldScene(),
    });
    gameRef.current = game;

    const handleReady = () => {
      sceneReady.current = true;
    };
    const handleVictory = () => {
      onVictoryRef.current?.();
    };
    gameBus.on(GAME_EVENTS.READY, handleReady);
    gameBus.on(GAME_EVENTS.VICTORY, handleVictory);

    game.scene.start('WorldScene', { avatarId, startIndex: position });

    return () => {
      gameBus.off(GAME_EVENTS.READY, handleReady);
      gameBus.off(GAME_EVENTS.VICTORY, handleVictory);
      sceneReady.current = false;
      gameRef.current = null;
      game.destroy(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Step events: whenever the React position changes, instruct the scene
  // to walk one step forward.
  useEffect(() => {
    if (!sceneReady.current) {
      const off = () => {
        sceneReady.current = true;
        gameBus.emit(GAME_EVENTS.STEP, position);
        gameBus.off(GAME_EVENTS.READY, off);
      };
      gameBus.on(GAME_EVENTS.READY, off);
      return () => {
        gameBus.off(GAME_EVENTS.READY, off);
      };
    }
    gameBus.emit(GAME_EVENTS.STEP, position);
    return undefined;
  }, [position]);

  // Avatar changes outside the game (e.g., from settings).
  useEffect(() => {
    gameBus.emit(GAME_EVENTS.AVATAR_CHANGED, avatarId);
  }, [avatarId]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      role="img"
      aria-label="Pixel art world map. Use the dice button to roll and move."
    />
  );
};
