/*
 * Project developed by Cinthia Gonçalez
 * Educational project for elementary school English students
 *
 * Top-down world scene. The whole world is rendered ONCE to a single
 * composite canvas (forest, mountains, river, bridges, village hall,
 * bakery, library, fountain, market, houses, castle, dragon, wizard,
 * knight…) and used as a single Phaser texture. The player avatar is
 * the only thing that animates on top.
 *
 * Movement is target-index driven: when React reports the new path
 * index, the scene advances ONE STEP at a time toward it. The avatar
 * therefore can never "skip" a tile or visit a cell that is not on the
 * path.
 */
import Phaser from 'phaser';
import { BOARD, BOARD_PATH, isPathAdjacent } from '@/data/board';
import {
  buildWorldCanvas,
  buildPrincessSprite,
  TILE_SIZE as TILE_PX,
} from '@/game/tiles';
import { buildAvatarSpriteSheet } from '@/game/sprites';
import { getAvatarById } from '@/data/avatars';
import { gameBus, GAME_EVENTS } from '@/game/events';
import type { AvatarId } from '@/types/game';

const WORLD_KEY = 'world-composite';
const PLAYER_KEY = 'player-sheet';
const PRINCESS_KEY = 'princess';

const FRAME_KEYS = ['p-idle', 'p-walk', 'p-idle2', 'p-celebrate'] as const;

const STEP_DURATION = 220; // ms per tile

export class WorldScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Sprite;
  private playerIdleTween?: Phaser.Tweens.Tween;
  private playerWalkTween?: Phaser.Tweens.Tween;
  private currentIndex = 0;
  private targetIndex = 0;
  private moving = false;
  private avatarId: AvatarId = 'aria';
  private princess?: Phaser.GameObjects.Image;

  constructor() {
    super({ key: 'WorldScene' });
  }

  init(data: { avatarId?: AvatarId; startIndex?: number }) {
    if (data.avatarId) this.avatarId = data.avatarId;
    const startIndex = Math.min(
      Math.max(data.startIndex ?? 0, 0),
      BOARD.total - 1,
    );
    this.currentIndex = startIndex;
    this.targetIndex = startIndex;
    if (!isPathAdjacent()) {
      // Programmer-error guard: the data file must remain consistent.
      // eslint-disable-next-line no-console
      console.warn('[WorldScene] BOARD_PATH has non-adjacent steps.');
    }
  }

  preload() {
    // 1) Composite world canvas → single texture.
    const world = buildWorldCanvas({
      cols: BOARD.cols,
      rows: BOARD.rows,
      path: BOARD_PATH,
      pathTiles: BOARD.tiles.map((t) => ({ type: t.type })),
      decorations: BOARD.decorations,
    });
    if (this.textures.exists(WORLD_KEY)) this.textures.remove(WORLD_KEY);
    this.textures.addCanvas(WORLD_KEY, world);

    // 2) Player sprite frames.
    this.rebuildPlayerTextures(this.avatarId);

    // 3) Princess (used at the end).
    if (!this.textures.exists(PRINCESS_KEY)) {
      this.textures.addCanvas(PRINCESS_KEY, buildPrincessSprite(4));
    }
  }

  private rebuildPlayerTextures(avatarId: AvatarId) {
    const sheet = buildAvatarSpriteSheet(getAvatarById(avatarId), 4);
    if (this.textures.exists(PLAYER_KEY)) this.textures.remove(PLAYER_KEY);
    this.textures.addCanvas(PLAYER_KEY, sheet);
    const frameW = sheet.width / 4;
    const frameH = sheet.height;
    FRAME_KEYS.forEach((k, i) => {
      const c = document.createElement('canvas');
      c.width = frameW;
      c.height = frameH;
      const cc = c.getContext('2d')!;
      cc.imageSmoothingEnabled = false;
      cc.drawImage(sheet, i * frameW, 0, frameW, frameH, 0, 0, frameW, frameH);
      if (this.textures.exists(k)) this.textures.remove(k);
      this.textures.addCanvas(k, c);
    });
  }

  create() {
    const worldW = BOARD.cols * TILE_PX;
    const worldH = BOARD.rows * TILE_PX;

    // World background — one big image.
    this.add.image(0, 0, WORLD_KEY).setOrigin(0, 0).setDisplaySize(worldW, worldH);

    // Subtle highlight on each walkable tile so the route is readable.
    BOARD_PATH.forEach((p, i) => {
      const tile = BOARD.tiles[i];
      if (!tile) return;
      const cx = p.col * TILE_PX + TILE_PX / 2;
      const cy = p.row * TILE_PX + TILE_PX / 2;
      const isLandmark =
        tile.type !== 'path' && tile.type !== 'grass' &&
        tile.type !== 'castle-start' && tile.type !== 'castle-end' &&
        tile.type !== 'bridge';
      if (isLandmark) return; // landmark is already visually obvious
      const dot = this.add.circle(
        cx,
        cy + TILE_PX * 0.32,
        4,
        tile.challenge ? 0xffc371 : 0xfbf5e1,
        0.85,
      );
      dot.setStrokeStyle(1, 0x1a1a1a, 0.7);
      dot.setDepth(2);
    });

    // Player.
    const startPos = BOARD_PATH[this.currentIndex];
    this.player = this.add.sprite(
      startPos.col * TILE_PX + TILE_PX / 2,
      startPos.row * TILE_PX + TILE_PX / 2,
      'p-idle',
    );
    this.player.setDisplaySize(TILE_PX * 0.9, TILE_PX * 0.9);
    this.player.setDepth(50);
    this.startIdleAnim();

    // Camera setup — strict bounds, no over-pan beyond the world edges.
    this.cameras.main.setBackgroundColor('#1f4527');
    this.cameras.main.setBounds(0, 0, worldW, worldH);
    this.cameras.main.startFollow(this.player, true, 0.18, 0.18);
    this.cameras.main.setRoundPixels(true);
    this.cameras.main.setZoom(this.computeZoom());

    this.scale.on('resize', this.handleResize, this);
    gameBus.on(GAME_EVENTS.STEP, this.handleStep, this);
    gameBus.on(GAME_EVENTS.TELEPORT, this.handleTeleport, this);
    gameBus.on(GAME_EVENTS.AVATAR_CHANGED, this.handleAvatarChanged, this);

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.scale.off('resize', this.handleResize, this);
      gameBus.off(GAME_EVENTS.STEP, this.handleStep, this);
      gameBus.off(GAME_EVENTS.TELEPORT, this.handleTeleport, this);
      gameBus.off(GAME_EVENTS.AVATAR_CHANGED, this.handleAvatarChanged, this);
      this.playerIdleTween?.stop();
      this.playerWalkTween?.stop();
    });

    gameBus.emit(GAME_EVENTS.READY);
  }

  private startIdleAnim() {
    this.playerIdleTween?.stop();
    this.player.setTexture('p-idle');
    this.playerIdleTween = this.tweens.add({
      targets: this.player,
      y: this.player.y - 4,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
      duration: 700,
    });
  }

  private computeZoom(): number {
    const { width, height } = this.scale.gameSize;
    const worldW = BOARD.cols * TILE_PX;
    const worldH = BOARD.rows * TILE_PX;
    const fitX = width / worldW;
    const fitY = height / worldH;
    // We zoom in more aggressively than "fit" so the tiles are large and
    // readable, but clamp to keep at least 6×4 tiles visible.
    const idealTilesAcross = 9;
    const targetZoom = width / (idealTilesAcross * TILE_PX);
    const minZoom = Math.max(fitX, fitY) * 1.05;
    const maxZoom = Math.max(fitX, fitY) * 3.5;
    return Phaser.Math.Clamp(targetZoom, minZoom, maxZoom);
  }

  private handleResize() {
    this.cameras.main.setZoom(this.computeZoom());
  }

  private handleAvatarChanged(avatarId: AvatarId) {
    if (this.avatarId === avatarId) return;
    this.avatarId = avatarId;
    this.rebuildPlayerTextures(avatarId);
    this.player?.setTexture('p-idle');
  }

  /** React tells us the new target index. We never accept invalid indices. */
  private handleStep(targetIndex: number) {
    const clamped = Math.max(0, Math.min(BOARD.total - 1, targetIndex | 0));
    this.targetIndex = clamped;
    this.advance();
  }

  /** Hop one tile toward the target. Recurses through the tween's onComplete. */
  private advance() {
    if (this.moving) return;
    if (this.currentIndex === this.targetIndex) {
      // Arrival.
      if (this.targetIndex === BOARD.total - 1) {
        this.spawnPrincess();
        gameBus.emit(GAME_EVENTS.VICTORY);
      }
      return;
    }

    // Always move TOWARD the target — never random or backward unless
    // explicitly requested (resets use handleTeleport instead).
    const next =
      this.currentIndex < this.targetIndex
        ? this.currentIndex + 1
        : this.currentIndex - 1;
    const pos = BOARD_PATH[next];
    if (!pos) return;

    this.moving = true;
    this.playerIdleTween?.stop();
    this.player.setTexture('p-walk');

    const targetX = pos.col * TILE_PX + TILE_PX / 2;
    const targetY = pos.row * TILE_PX + TILE_PX / 2;

    this.playerWalkTween = this.tweens.add({
      targets: this.player,
      x: targetX,
      y: targetY,
      duration: STEP_DURATION,
      ease: 'sine.inOut',
      onComplete: () => {
        this.currentIndex = next;
        this.moving = false;
        if (this.currentIndex === this.targetIndex) {
          this.startIdleAnim();
        }
        this.advance();
      },
    });
  }

  private handleTeleport(targetIndex: number) {
    const clamped = Math.max(0, Math.min(BOARD.total - 1, targetIndex | 0));
    const pos = BOARD_PATH[clamped];
    if (!pos) return;
    this.playerWalkTween?.stop();
    this.moving = false;
    this.currentIndex = clamped;
    this.targetIndex = clamped;
    this.player.x = pos.col * TILE_PX + TILE_PX / 2;
    this.player.y = pos.row * TILE_PX + TILE_PX / 2;
    if (this.princess) {
      this.princess.destroy();
      this.princess = undefined;
    }
    this.startIdleAnim();
  }

  private spawnPrincess() {
    if (this.princess) return;
    const last = BOARD_PATH[BOARD.total - 1];
    this.princess = this.add.image(
      last.col * TILE_PX + TILE_PX / 2 + 16,
      last.row * TILE_PX + TILE_PX / 2 + 18,
      PRINCESS_KEY,
    );
    this.princess.setDepth(60);
    this.princess.setDisplaySize(TILE_PX * 0.7, TILE_PX * 0.7);
    this.tweens.add({
      targets: this.princess,
      y: this.princess.y - 6,
      yoyo: true,
      repeat: -1,
      duration: 600,
      ease: 'sine.inOut',
    });
    this.player.setTexture('p-celebrate');
  }
}
