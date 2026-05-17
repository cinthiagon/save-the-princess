/*
 * Project developed by Cinthia Gonçalez
 * Educational project for elementary school English students
 *
 * Procedurally drawn tile art for the world map (grass, path, forest,
 * bridge, river, mountain, village, house, market, bakery, library,
 * fountain, castle). Everything is rendered to a single tile sheet
 * canvas that Phaser uses as a texture.
 */
import type { TileType } from '@/types/game';

const TILE_SIZE = 64;

const COLORS = {
  grassA: '#5fa463',
  grassB: '#4a8a52',
  grassShade: '#37703f',
  path: '#cdb27a',
  pathShade: '#a98d56',
  pathEdge: '#7d6638',
  river: '#4ba7d6',
  riverShade: '#2f7fae',
  riverFoam: '#a5d8f0',
  stone: '#a3a3a3',
  stoneShade: '#6f6f6f',
  wood: '#8a5a3b',
  woodShade: '#5d3a23',
  forestDark: '#1f4527',
  forestLeaf: '#3f7d4a',
  forestLeafLight: '#5fa463',
  trunk: '#5a3a22',
  mountainBase: '#7a7a82',
  mountainShade: '#4d4d57',
  mountainSnow: '#fbf5e1',
  brickRed: '#a84c3a',
  brickRedShade: '#7a3023',
  brickRoof: '#5c4ddc',
  brickRoofShade: '#3a2fa0',
  brickWhite: '#f4e7b6',
  brickWhiteShade: '#caa861',
  gold: '#ffd066',
  goldShade: '#cc9836',
  rose: '#e3848a',
  flag: '#d8425a',
};

const drawPixel = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string,
): void => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
};

const drawGrassBackground = (ctx: CanvasRenderingContext2D, ox: number, oy: number) => {
  drawPixel(ctx, ox, oy, TILE_SIZE, TILE_SIZE, COLORS.grassA);
  for (let y = 0; y < TILE_SIZE; y += 8) {
    for (let x = 0; x < TILE_SIZE; x += 8) {
      const checker = ((x + y) / 8) % 2 === 0;
      if (checker) {
        drawPixel(ctx, ox + x, oy + y, 8, 8, COLORS.grassB);
      }
    }
  }
  // Random-looking grass tufts (deterministic per tile origin)
  const seed = ox * 31 + oy * 7;
  for (let i = 0; i < 5; i++) {
    const dx = (seed * (i + 1) * 13) % (TILE_SIZE - 6);
    const dy = (seed * (i + 1) * 17) % (TILE_SIZE - 6);
    drawPixel(ctx, ox + dx, oy + dy, 2, 4, COLORS.grassShade);
    drawPixel(ctx, ox + dx + 2, oy + dy + 2, 2, 4, COLORS.grassShade);
  }
};

const drawPath = (ctx: CanvasRenderingContext2D, ox: number, oy: number) => {
  drawGrassBackground(ctx, ox, oy);
  drawPixel(ctx, ox + 4, oy + 4, TILE_SIZE - 8, TILE_SIZE - 8, COLORS.path);
  // Pebbles
  drawPixel(ctx, ox + 12, oy + 16, 4, 4, COLORS.pathShade);
  drawPixel(ctx, ox + 32, oy + 36, 4, 4, COLORS.pathShade);
  drawPixel(ctx, ox + 46, oy + 12, 3, 3, COLORS.pathShade);
  drawPixel(ctx, ox + 18, oy + 44, 3, 3, COLORS.pathEdge);
  drawPixel(ctx, ox + 38, oy + 24, 3, 3, COLORS.pathEdge);
};

const drawForest = (ctx: CanvasRenderingContext2D, ox: number, oy: number) => {
  drawGrassBackground(ctx, ox, oy);
  const trees = [
    { x: 8, y: 8 },
    { x: 38, y: 6 },
    { x: 22, y: 30 },
    { x: 46, y: 36 },
  ];
  for (const t of trees) {
    drawPixel(ctx, ox + t.x + 4, oy + t.y + 10, 4, 8, COLORS.trunk);
    drawPixel(ctx, ox + t.x, oy + t.y, 12, 12, COLORS.forestLeaf);
    drawPixel(ctx, ox + t.x + 2, oy + t.y + 2, 8, 4, COLORS.forestLeafLight);
    drawPixel(ctx, ox + t.x, oy + t.y + 8, 4, 4, COLORS.forestDark);
    drawPixel(ctx, ox + t.x + 8, oy + t.y + 8, 4, 4, COLORS.forestDark);
  }
};

const drawBridge = (ctx: CanvasRenderingContext2D, ox: number, oy: number) => {
  drawPixel(ctx, ox, oy, TILE_SIZE, TILE_SIZE, COLORS.river);
  for (let x = 0; x < TILE_SIZE; x += 8) {
    drawPixel(ctx, ox + x, oy + 8, 8, 2, COLORS.riverFoam);
    drawPixel(ctx, ox + x + 4, oy + 30, 4, 2, COLORS.riverFoam);
    drawPixel(ctx, ox + x, oy + 52, 8, 2, COLORS.riverFoam);
  }
  // Bridge planks
  drawPixel(ctx, ox, oy + 18, TILE_SIZE, 28, COLORS.wood);
  for (let x = 0; x < TILE_SIZE; x += 8) {
    drawPixel(ctx, ox + x + 6, oy + 18, 2, 28, COLORS.woodShade);
  }
  drawPixel(ctx, ox, oy + 18, TILE_SIZE, 2, COLORS.woodShade);
  drawPixel(ctx, ox, oy + 44, TILE_SIZE, 2, COLORS.woodShade);
  // Rails
  for (let x = 0; x < TILE_SIZE; x += 12) {
    drawPixel(ctx, ox + x + 2, oy + 12, 2, 8, COLORS.wood);
    drawPixel(ctx, ox + x + 2, oy + 46, 2, 8, COLORS.wood);
  }
};

const drawRiver = (ctx: CanvasRenderingContext2D, ox: number, oy: number) => {
  drawPixel(ctx, ox, oy, TILE_SIZE, TILE_SIZE, COLORS.river);
  for (let x = 0; x < TILE_SIZE; x += 6) {
    drawPixel(ctx, ox + x, oy + 8, 4, 2, COLORS.riverFoam);
    drawPixel(ctx, ox + x + 2, oy + 22, 4, 2, COLORS.riverShade);
    drawPixel(ctx, ox + x, oy + 36, 4, 2, COLORS.riverFoam);
    drawPixel(ctx, ox + x + 2, oy + 50, 4, 2, COLORS.riverShade);
  }
};

const drawMountain = (ctx: CanvasRenderingContext2D, ox: number, oy: number) => {
  drawGrassBackground(ctx, ox, oy);
  // Two triangle peaks
  const drawPeak = (cx: number, cy: number, size: number) => {
    for (let i = 0; i < size; i++) {
      drawPixel(ctx, ox + cx - i, oy + cy + size - i, 2 * i + 2, 2, COLORS.mountainBase);
    }
    drawPixel(ctx, ox + cx - 1, oy + cy + 2, 4, 4, COLORS.mountainSnow);
    drawPixel(ctx, ox + cx - 6, oy + cy + size, 12, 4, COLORS.mountainShade);
  };
  drawPeak(18, 14, 14);
  drawPeak(44, 22, 12);
};

const drawHouse = (
  ctx: CanvasRenderingContext2D,
  ox: number,
  oy: number,
  wallColor: string,
  wallShade: string,
  roofColor: string,
  roofShade: string,
) => {
  drawGrassBackground(ctx, ox, oy);
  // Walls
  drawPixel(ctx, ox + 12, oy + 22, 40, 32, wallColor);
  drawPixel(ctx, ox + 12, oy + 50, 40, 4, wallShade);
  // Roof
  for (let i = 0; i < 12; i++) {
    drawPixel(ctx, ox + 8 + i, oy + 22 - i, 48 - 2 * i, 2, roofColor);
  }
  drawPixel(ctx, ox + 12, oy + 20, 40, 2, roofShade);
  // Door
  drawPixel(ctx, ox + 28, oy + 36, 8, 18, COLORS.woodShade);
  drawPixel(ctx, ox + 34, oy + 44, 2, 2, COLORS.gold);
  // Window
  drawPixel(ctx, ox + 16, oy + 28, 8, 8, COLORS.riverFoam);
  drawPixel(ctx, ox + 40, oy + 28, 8, 8, COLORS.riverFoam);
  drawPixel(ctx, ox + 16, oy + 32, 8, 1, COLORS.wood);
  drawPixel(ctx, ox + 40, oy + 32, 8, 1, COLORS.wood);
};

const drawVillage = (ctx: CanvasRenderingContext2D, ox: number, oy: number) => {
  drawHouse(ctx, ox, oy, COLORS.brickWhite, COLORS.brickWhiteShade, COLORS.brickRed, COLORS.brickRedShade);
  // Flag
  drawPixel(ctx, ox + 32, oy + 6, 1, 14, COLORS.wood);
  drawPixel(ctx, ox + 33, oy + 6, 8, 5, COLORS.flag);
};

const drawBakery = (ctx: CanvasRenderingContext2D, ox: number, oy: number) => {
  drawHouse(ctx, ox, oy, COLORS.brickWhite, COLORS.brickWhiteShade, COLORS.brickRed, COLORS.brickRedShade);
  // Sign (loaf of bread)
  drawPixel(ctx, ox + 22, oy + 14, 20, 8, COLORS.wood);
  drawPixel(ctx, ox + 26, oy + 16, 12, 4, COLORS.gold);
  drawPixel(ctx, ox + 28, oy + 17, 8, 2, COLORS.goldShade);
};

const drawLibrary = (ctx: CanvasRenderingContext2D, ox: number, oy: number) => {
  drawHouse(ctx, ox, oy, COLORS.brickWhite, COLORS.brickWhiteShade, COLORS.brickRoof, COLORS.brickRoofShade);
  // Open book sign
  drawPixel(ctx, ox + 24, oy + 14, 16, 8, COLORS.brickWhite);
  drawPixel(ctx, ox + 24, oy + 14, 16, 1, COLORS.wood);
  drawPixel(ctx, ox + 24, oy + 21, 16, 1, COLORS.wood);
  drawPixel(ctx, ox + 31, oy + 14, 2, 8, COLORS.wood);
};

const drawMarket = (ctx: CanvasRenderingContext2D, ox: number, oy: number) => {
  drawGrassBackground(ctx, ox, oy);
  // Stall canopy
  for (let i = 0; i < 6; i++) {
    drawPixel(ctx, ox + 6 + i * 8, oy + 18, 8, 4, i % 2 === 0 ? COLORS.flag : COLORS.gold);
  }
  // Posts
  drawPixel(ctx, ox + 6, oy + 18, 2, 30, COLORS.wood);
  drawPixel(ctx, ox + 56, oy + 18, 2, 30, COLORS.wood);
  // Table
  drawPixel(ctx, ox + 8, oy + 34, 48, 6, COLORS.wood);
  drawPixel(ctx, ox + 8, oy + 40, 48, 12, COLORS.woodShade);
  // Fruits
  drawPixel(ctx, ox + 14, oy + 28, 6, 6, COLORS.flag);
  drawPixel(ctx, ox + 24, oy + 30, 6, 4, COLORS.gold);
  drawPixel(ctx, ox + 34, oy + 28, 6, 6, COLORS.forestLeafLight);
  drawPixel(ctx, ox + 44, oy + 30, 6, 4, COLORS.rose);
};

const drawFountain = (ctx: CanvasRenderingContext2D, ox: number, oy: number) => {
  drawGrassBackground(ctx, ox, oy);
  // Base ring
  drawPixel(ctx, ox + 10, oy + 38, 44, 12, COLORS.stone);
  drawPixel(ctx, ox + 10, oy + 48, 44, 4, COLORS.stoneShade);
  drawPixel(ctx, ox + 16, oy + 28, 32, 14, COLORS.river);
  drawPixel(ctx, ox + 16, oy + 28, 32, 2, COLORS.riverFoam);
  // Center pillar
  drawPixel(ctx, ox + 28, oy + 14, 8, 18, COLORS.stone);
  drawPixel(ctx, ox + 30, oy + 8, 4, 8, COLORS.riverFoam);
  drawPixel(ctx, ox + 26, oy + 12, 12, 2, COLORS.river);
};

const drawCastle = (ctx: CanvasRenderingContext2D, ox: number, oy: number) => {
  drawGrassBackground(ctx, ox, oy);
  // Walls
  drawPixel(ctx, ox + 6, oy + 20, 52, 36, COLORS.stone);
  drawPixel(ctx, ox + 6, oy + 50, 52, 6, COLORS.stoneShade);
  // Towers
  drawPixel(ctx, ox + 2, oy + 12, 12, 44, COLORS.stone);
  drawPixel(ctx, ox + 50, oy + 12, 12, 44, COLORS.stone);
  drawPixel(ctx, ox + 2, oy + 50, 12, 6, COLORS.stoneShade);
  drawPixel(ctx, ox + 50, oy + 50, 12, 6, COLORS.stoneShade);
  // Roof cones
  for (let i = 0; i < 6; i++) {
    drawPixel(ctx, ox + 4 + i, oy + 12 - i, 8 - 2 * i, 2, COLORS.brickRoof);
    drawPixel(ctx, ox + 52 + i, oy + 12 - i, 8 - 2 * i, 2, COLORS.brickRoof);
  }
  // Battlements
  for (let x = 8; x < 56; x += 6) {
    drawPixel(ctx, ox + x, oy + 18, 4, 4, COLORS.stoneShade);
  }
  // Door
  drawPixel(ctx, ox + 26, oy + 32, 12, 24, COLORS.woodShade);
  drawPixel(ctx, ox + 26, oy + 32, 12, 2, COLORS.gold);
  drawPixel(ctx, ox + 31, oy + 42, 2, 2, COLORS.gold);
  // Flag on top
  drawPixel(ctx, ox + 31, oy + 0, 2, 12, COLORS.wood);
  drawPixel(ctx, ox + 33, oy + 0, 10, 6, COLORS.flag);
};

const drawCastleStart = (ctx: CanvasRenderingContext2D, ox: number, oy: number) => {
  drawGrassBackground(ctx, ox, oy);
  // Small hut
  drawPixel(ctx, ox + 14, oy + 28, 36, 24, COLORS.brickWhite);
  drawPixel(ctx, ox + 14, oy + 48, 36, 4, COLORS.brickWhiteShade);
  for (let i = 0; i < 14; i++) {
    drawPixel(ctx, ox + 10 + i, oy + 28 - i, 44 - 2 * i, 2, COLORS.brickRed);
  }
  drawPixel(ctx, ox + 28, oy + 38, 8, 14, COLORS.woodShade);
  // Sun symbol indicating start
  drawPixel(ctx, ox + 30, oy + 8, 4, 4, COLORS.gold);
  for (let i = 0; i < 4; i++) {
    drawPixel(ctx, ox + 28 - i, oy + 9, 2, 2, COLORS.gold);
    drawPixel(ctx, ox + 34 + i, oy + 9, 2, 2, COLORS.gold);
  }
};

const drawers: Record<TileType, (ctx: CanvasRenderingContext2D, ox: number, oy: number) => void> = {
  grass: drawGrassBackground,
  path: drawPath,
  forest: drawForest,
  bridge: drawBridge,
  river: drawRiver,
  mountain: drawMountain,
  village: drawVillage,
  house: drawVillage,
  market: drawMarket,
  bakery: drawBakery,
  library: drawLibrary,
  fountain: drawFountain,
  'castle-start': drawCastleStart,
  'castle-end': drawCastle,
};

/**
 * Build a single horizontal sheet with all tile variants. Returns the
 * canvas + a lookup map of TileType -> frame index.
 */
export const buildTileSheet = (): { canvas: HTMLCanvasElement; index: Record<TileType, number> } => {
  const types: TileType[] = [
    'grass', 'path', 'forest', 'bridge', 'river', 'mountain',
    'village', 'house', 'market', 'bakery', 'library', 'fountain',
    'castle-start', 'castle-end',
  ];
  const canvas = document.createElement('canvas');
  canvas.width = TILE_SIZE * types.length;
  canvas.height = TILE_SIZE;
  const ctx = canvas.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;
  const index = {} as Record<TileType, number>;
  types.forEach((t, i) => {
    drawers[t](ctx, i * TILE_SIZE, 0);
    index[t] = i;
  });
  return { canvas, index };
};

/**
 * Princess sprite drawn over the castle on victory. Returns a small canvas.
 */
export const buildPrincessSprite = (scale = 4): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  canvas.width = 16 * scale;
  canvas.height = 16 * scale;
  const ctx = canvas.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;
  const palette = {
    skin: '#f1c8a0', skinShade: '#c89a73',
    hair: '#d8a13b', hairShade: '#a77419',
    gown: '#d8425a', gownShade: '#88172a',
    crown: '#ffd066',
    eye: '#1a1a1a',
  };
  // Crown
  for (let x = 4; x <= 11; x++) drawPixel(ctx, x * scale, 2 * scale, scale, scale, palette.crown);
  drawPixel(ctx, 4 * scale, 1 * scale, scale, scale, palette.crown);
  drawPixel(ctx, 7 * scale, 1 * scale, scale, scale, palette.crown);
  drawPixel(ctx, 10 * scale, 1 * scale, scale, scale, palette.crown);
  // Hair
  for (let x = 3; x <= 12; x++) drawPixel(ctx, x * scale, 3 * scale, scale, scale, palette.hair);
  for (let x = 3; x <= 12; x++) drawPixel(ctx, x * scale, 4 * scale, scale, scale, palette.hairShade);
  // Face
  for (let x = 4; x <= 11; x++) drawPixel(ctx, x * scale, 5 * scale, scale, scale, palette.skin);
  for (let x = 4; x <= 11; x++) drawPixel(ctx, x * scale, 6 * scale, scale, scale, palette.skin);
  drawPixel(ctx, 6 * scale, 6 * scale, scale, scale, palette.eye);
  drawPixel(ctx, 9 * scale, 6 * scale, scale, scale, palette.eye);
  drawPixel(ctx, 7 * scale, 7 * scale, scale, scale, palette.skinShade);
  drawPixel(ctx, 8 * scale, 7 * scale, scale, scale, palette.skinShade);
  // Gown
  for (let y = 8; y <= 13; y++) {
    for (let x = 3; x <= 12; x++) drawPixel(ctx, x * scale, y * scale, scale, scale, palette.gown);
  }
  for (let x = 3; x <= 12; x++) drawPixel(ctx, x * scale, 13 * scale, scale, scale, palette.gownShade);
  // Feet
  drawPixel(ctx, 5 * scale, 14 * scale, scale * 2, scale, '#1a1a1a');
  drawPixel(ctx, 9 * scale, 14 * scale, scale * 2, scale, '#1a1a1a');
  return canvas;
};
