/*
 * Project developed by Cinthia Gonçalez
 * Educational project for elementary school English students
 *
 * Top-down world scene. Procedurally renders a grid of grass + a path
 * of themed landmarks + the player avatar. Receives commands from the
 * React UI via the game event bus.
 */
import Phaser from 'phaser';
import { BOARD, BOARD_PATH } from '@/data/board';
import { buildTileSheet, buildPrincessSprite } from '@/game/tiles';
import { buildAvatarSpriteSheet } from '@/game/sprites';
import { getAvatarById } from '@/data/avatars';
import { gameBus, GAME_EVENTS } from '@/game/events';
import type { AvatarId, TileType } from '@/types/game';

const PLAYER_KEY = 'player-sheet';
const PRINCESS_KEY = 'princess';

export class WorldScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Sprite;
  private playerCol = BOARD_PATH[0].col;
  private playerRow = BOARD_PATH[0].row;
  private currentIndex = 0;
  private moving = false;
  private avatarId: AvatarId = 'aria';
  private tileTextureKeys: Partial<Record<TileType, string>> = {};
  private princess?: Phaser.GameObjects.Image;

  constructor() {
    super({ key: 'WorldScene' });
  }

  init(data: { avatarId?: AvatarId; startIndex?: number }) {
    if (data.avatarId) this.avatarId = data.avatarId;
    if (typeof data.startIndex === 'number') this.currentIndex = data.startIndex;
    const start = BOARD_PATH[this.currentIndex] ?? BOARD_PATH[0];
    this.playerCol = start.col;
    this.playerRow = start.row;
  }

  preload() {
    // Build a master sheet, then split it into a texture per tile type so
    // we can place them via simple `add.image`. Nothing is loaded from disk.
    const { canvas: sheet, index } = buildTileSheet();
    const tileTypes = Object.keys(index) as TileType[];
    for (const type of tileTypes) {
      const key = `tile-${type}`;
      const c = document.createElement('canvas');
      c.width = BOARD.tileSize;
      c.height = BOARD.tileSize;
      const ctx = c.getContext('2d')!;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(
        sheet,
        index[type] * BOARD.tileSize, 0,
        BOARD.tileSize, BOARD.tileSize,
        0, 0,
        BOARD.tileSize, BOARD.tileSize,
      );
      if (this.textures.exists(key)) this.textures.remove(key);
      this.textures.addCanvas(key, c);
      this.tileTextureKeys[type] = key;
    }

    // Player sprite frames
    this.rebuildPlayerTexture(this.avatarId);

    // Princess sprite
    if (!this.textures.exists(PRINCESS_KEY)) {
      this.textures.addCanvas(PRINCESS_KEY, buildPrincessSprite(4));
    }
  }

  private rebuildPlayerTexture(avatarId: AvatarId) {
    const sheet = buildAvatarSpriteSheet(getAvatarById(avatarId), 4);
    if (this.textures.exists(PLAYER_KEY)) this.textures.remove(PLAYER_KEY);
    this.textures.addCanvas(PLAYER_KEY, sheet);
    const frameW = sheet.width / 4;
    const frameH = sheet.height;
    const frameKeys = ['p-idle', 'p-walk', 'p-idle2', 'p-celebrate'];
    frameKeys.forEach((k, i) => {
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
    const { tileSize } = BOARD;
    const world = this.add.container(0, 0);

    const placeTile = (type: TileType, col: number, row: number) => {
      const key = this.tileTextureKeys[type];
      if (!key) return;
      const img = this.add.image(col * tileSize, row * tileSize, key)
        .setOrigin(0, 0)
        .setDisplaySize(tileSize, tileSize);
      world.add(img);
    };

    // 1) Fill grid with grass.
    for (let row = 0; row < BOARD.rows; row++) {
      for (let col = 0; col < BOARD.cols; col++) {
        placeTile('grass', col, row);
      }
    }

    // 2) Decorative scatter — placed BEFORE the path so the path always wins.
    const decoration: Array<{ col: number; row: number; type: TileType }> = [
      { col: 0, row: 11, type: 'forest' },
      { col: 2, row: 11, type: 'forest' },
      { col: 5, row: 11, type: 'forest' },
      { col: 13, row: 11, type: 'mountain' },
      { col: 16, row: 11, type: 'forest' },
      { col: 0, row: 0, type: 'mountain' },
      { col: 2, row: 0, type: 'mountain' },
      { col: 4, row: 0, type: 'mountain' },
      { col: 15, row: 0, type: 'mountain' },
      { col: 17, row: 2, type: 'mountain' },
      { col: 0, row: 5, type: 'forest' },
      { col: 17, row: 8, type: 'forest' },
      { col: 6, row: 4, type: 'forest' },
      { col: 14, row: 8, type: 'forest' },
      { col: 14, row: 5, type: 'forest' },
      { col: 0, row: 7, type: 'forest' },
      { col: 0, row: 3, type: 'mountain' },
      { col: 16, row: 0, type: 'mountain' },
    ];
    const usedByPath = new Set(BOARD_PATH.map((p) => `${p.col},${p.row}`));
    for (const d of decoration) {
      if (usedByPath.has(`${d.col},${d.row}`)) continue;
      placeTile(d.type, d.col, d.row);
    }

    // 3) Path + landmarks (in board order).
    BOARD.tiles.forEach((tile, i) => {
      const pos = BOARD_PATH[i];
      if (!pos) return;
      const isLandmark =
        tile.type !== 'path' && tile.type !== 'grass' &&
        tile.type !== 'forest' && tile.type !== 'river' &&
        tile.type !== 'mountain' && tile.type !== 'bridge';
      // Always paint a path beneath the route except over water / forest / mountain.
      if (
        tile.type !== 'forest' && tile.type !== 'river' &&
        tile.type !== 'mountain' && tile.type !== 'bridge'
      ) {
        placeTile('path', pos.col, pos.row);
      }
      if (tile.type !== 'path' && tile.type !== 'grass') {
        placeTile(tile.type, pos.col, pos.row);
      }
      // Marker dots on the path for stepable tiles (subtle).
      if (!isLandmark && tile.type !== 'bridge' && tile.type !== 'river' && tile.type !== 'mountain' && tile.type !== 'forest') {
        const dot = this.add.circle(
          pos.col * tileSize + tileSize / 2,
          pos.row * tileSize + tileSize / 2,
          4,
          tile.challenge ? 0xffc371 : 0xfbf5e1,
          0.7,
        );
        dot.setDepth(2);
        world.add(dot);
      }
    });

    // 4) Player.
    this.player = this.add.sprite(
      this.playerCol * tileSize + tileSize / 2,
      this.playerRow * tileSize + tileSize / 2,
      'p-idle',
    );
    this.player.setDisplaySize(tileSize * 0.85, tileSize * 0.85);
    this.player.setDepth(50);
    this.tweens.add({
      targets: this.player,
      y: this.player.y - 4,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
      duration: 700,
    });

    // 5) Camera setup.
    this.cameras.main.setBackgroundColor('#1f4527');
    this.cameras.main.setBounds(0, 0, BOARD.cols * tileSize, BOARD.rows * tileSize);
    this.cameras.main.startFollow(this.player, true, 0.15, 0.15);
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
    });

    gameBus.emit(GAME_EVENTS.READY);
  }

  private computeZoom(): number {
    const { width, height } = this.scale.gameSize;
    const worldW = BOARD.cols * BOARD.tileSize;
    const worldH = BOARD.rows * BOARD.tileSize;
    const zx = width / worldW;
    const zy = height / worldH;
    const zoom = Math.min(zx, zy) * 1.4;
    return Phaser.Math.Clamp(zoom, 0.45, 1.6);
  }

  private handleResize() {
    this.cameras.main.setZoom(this.computeZoom());
  }

  private handleAvatarChanged(avatarId: AvatarId) {
    if (this.avatarId === avatarId) return;
    this.avatarId = avatarId;
    this.rebuildPlayerTexture(avatarId);
    if (this.player) this.player.setTexture('p-idle');
  }

  private handleStep(targetIndex: number) {
    if (this.moving) {
      this.time.delayedCall(220, () => this.handleStep(targetIndex));
      return;
    }
    const pos = BOARD_PATH[targetIndex];
    if (!pos) return;
    this.moving = true;
    this.currentIndex = targetIndex;
    this.player.setTexture('p-walk');
    this.tweens.add({
      targets: this.player,
      x: pos.col * BOARD.tileSize + BOARD.tileSize / 2,
      y: pos.row * BOARD.tileSize + BOARD.tileSize / 2,
      duration: 200,
      ease: 'sine.inOut',
      onComplete: () => {
        this.moving = false;
        this.player.setTexture('p-idle');
        this.playerCol = pos.col;
        this.playerRow = pos.row;
        if (targetIndex === BOARD.total - 1) {
          this.spawnPrincess();
          gameBus.emit(GAME_EVENTS.VICTORY);
        }
      },
    });
  }

  private handleTeleport(targetIndex: number) {
    const pos = BOARD_PATH[targetIndex];
    if (!pos) return;
    this.currentIndex = targetIndex;
    this.player.x = pos.col * BOARD.tileSize + BOARD.tileSize / 2;
    this.player.y = pos.row * BOARD.tileSize + BOARD.tileSize / 2;
    this.playerCol = pos.col;
    this.playerRow = pos.row;
    if (this.princess) {
      this.princess.destroy();
      this.princess = undefined;
    }
  }

  private spawnPrincess() {
    if (this.princess) return;
    const last = BOARD_PATH[BOARD.total - 1];
    this.princess = this.add.image(
      last.col * BOARD.tileSize + BOARD.tileSize / 2,
      last.row * BOARD.tileSize + BOARD.tileSize - 6,
      PRINCESS_KEY,
    );
    this.princess.setDepth(60);
    this.princess.setDisplaySize(BOARD.tileSize * 0.7, BOARD.tileSize * 0.7);
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
