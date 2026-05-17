/*
 * Project developed by Cinthia Gonçalez
 * Educational project for elementary school English students
 *
 * Procedurally drawn tile art for the world map. Every drawing here is
 * 100% original — no external image is loaded. Each landmark gets a
 * unique silhouette so children can recognise the *bakery*, *library*,
 * *market* and *fountain* at a glance and use them as reference points
 * while answering English direction challenges.
 */
import type { TileType } from '@/types/game';

export const TILE_SIZE = 64;

const COLORS = {
  grassA: '#5fa463',
  grassB: '#4a8a52',
  grassShade: '#37703f',
  pathLight: '#e9d49a',
  path: '#cdb27a',
  pathShade: '#a98d56',
  pathEdge: '#7d6638',
  river: '#4ba7d6',
  riverShade: '#2f7fae',
  riverDeep: '#1f5d86',
  riverFoam: '#cfeaf7',
  stone: '#a3a3a3',
  stoneShade: '#6f6f6f',
  stoneDark: '#4a4a4a',
  wood: '#8a5a3b',
  woodShade: '#5d3a23',
  woodDark: '#3a2414',
  forestTrunk: '#5a3a22',
  forestLeafDark: '#1f4527',
  forestLeaf: '#3f7d4a',
  forestLeafLight: '#7ac478',
  mountainBase: '#7a7a82',
  mountainShade: '#4d4d57',
  mountainDark: '#2f2f37',
  mountainSnow: '#fbf5e1',
  brickRed: '#a84c3a',
  brickRedShade: '#7a3023',
  brickRedDark: '#4f1d14',
  brickRoofBlue: '#5c4ddc',
  brickRoofBlueShade: '#3a2fa0',
  brickRoofGreen: '#2c8f3f',
  brickRoofGreenShade: '#155322',
  cream: '#f4e7b6',
  creamShade: '#caa861',
  parchment: '#fbf5e1',
  gold: '#ffd066',
  goldShade: '#cc9836',
  rose: '#e3848a',
  pink: '#ffb3c1',
  red: '#d8425a',
  redDark: '#88172a',
  black: '#1a1a1a',
  white: '#ffffff',
  purple: '#7a4cd1',
  purpleShade: '#4a2885',
  yellow: '#ffe066',
  orange: '#ff8a3d',
};

const drawPixel = (
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, color: string,
): void => {
  ctx.fillStyle = color;
  ctx.fillRect(x | 0, y | 0, w, h);
};

const fillRect = drawPixel;

// ────────────────────────────── BASE TILES ──────────────────────────────

const drawGrass = (ctx: CanvasRenderingContext2D, ox: number, oy: number) => {
  fillRect(ctx, ox, oy, TILE_SIZE, TILE_SIZE, COLORS.grassA);
  // Soft checker
  for (let y = 0; y < TILE_SIZE; y += 8) {
    for (let x = 0; x < TILE_SIZE; x += 8) {
      if (((x + y) / 8) % 2 === 0) {
        fillRect(ctx, ox + x, oy + y, 8, 8, COLORS.grassB);
      }
    }
  }
  // Deterministic tufts
  const seed = (ox * 31 + oy * 7) & 0xffff;
  for (let i = 0; i < 4; i++) {
    const dx = (seed * (i + 1) * 13) % (TILE_SIZE - 6);
    const dy = (seed * (i + 1) * 17) % (TILE_SIZE - 6);
    fillRect(ctx, ox + dx, oy + dy, 2, 3, COLORS.grassShade);
    fillRect(ctx, ox + dx + 2, oy + dy + 1, 2, 4, COLORS.grassShade);
  }
};

const drawPath = (ctx: CanvasRenderingContext2D, ox: number, oy: number) => {
  drawGrass(ctx, ox, oy);
  // Sand path with rounded edges
  fillRect(ctx, ox + 2, oy + 2, TILE_SIZE - 4, TILE_SIZE - 4, COLORS.path);
  fillRect(ctx, ox + 4, oy + 4, TILE_SIZE - 8, TILE_SIZE - 8, COLORS.pathLight);
  // Edges
  fillRect(ctx, ox + 2, oy + 2, TILE_SIZE - 4, 2, COLORS.pathEdge);
  fillRect(ctx, ox + 2, oy + TILE_SIZE - 4, TILE_SIZE - 4, 2, COLORS.pathEdge);
  fillRect(ctx, ox + 2, oy + 2, 2, TILE_SIZE - 4, COLORS.pathEdge);
  fillRect(ctx, ox + TILE_SIZE - 4, oy + 2, 2, TILE_SIZE - 4, COLORS.pathEdge);
  // Pebbles
  fillRect(ctx, ox + 12, oy + 18, 4, 4, COLORS.pathShade);
  fillRect(ctx, ox + 13, oy + 19, 2, 2, COLORS.path);
  fillRect(ctx, ox + 34, oy + 38, 4, 3, COLORS.pathShade);
  fillRect(ctx, ox + 46, oy + 14, 3, 3, COLORS.pathShade);
  fillRect(ctx, ox + 22, oy + 46, 3, 2, COLORS.pathShade);
  fillRect(ctx, ox + 38, oy + 22, 2, 2, COLORS.pathShade);
};

// ────────────────────────────── FOREST ──────────────────────────────

const drawForest = (ctx: CanvasRenderingContext2D, ox: number, oy: number) => {
  drawGrass(ctx, ox, oy);
  const tree = (x: number, y: number, big: boolean) => {
    const w = big ? 18 : 14;
    const h = big ? 22 : 18;
    // Trunk
    fillRect(ctx, ox + x + (w / 2 - 2), oy + y + h, 4, 8, COLORS.forestTrunk);
    fillRect(ctx, ox + x + (w / 2 - 2), oy + y + h, 1, 8, COLORS.woodDark);
    // Leaves (diamond-ish)
    fillRect(ctx, ox + x + 2, oy + y + 4, w - 4, h - 8, COLORS.forestLeaf);
    fillRect(ctx, ox + x, oy + y + 6, w, h - 12, COLORS.forestLeaf);
    // Highlight (top-left)
    fillRect(ctx, ox + x + 4, oy + y + 6, 4, 3, COLORS.forestLeafLight);
    fillRect(ctx, ox + x + 6, oy + y + 4, 4, 2, COLORS.forestLeafLight);
    // Shadow (bottom-right)
    fillRect(ctx, ox + x + w - 6, oy + y + h - 4, 4, 2, COLORS.forestLeafDark);
    fillRect(ctx, ox + x + 2, oy + y + h - 4, 4, 2, COLORS.forestLeafDark);
  };
  tree(2, 4, true);
  tree(28, 0, true);
  tree(40, 26, false);
  tree(6, 32, false);
};

// ────────────────────────────── RIVER ──────────────────────────────

const drawRiverBase = (ctx: CanvasRenderingContext2D, ox: number, oy: number) => {
  fillRect(ctx, ox, oy, TILE_SIZE, TILE_SIZE, COLORS.river);
  // Banks (lighter blue)
  fillRect(ctx, ox, oy, TILE_SIZE, 4, COLORS.riverDeep);
  fillRect(ctx, ox, oy + TILE_SIZE - 4, TILE_SIZE, 4, COLORS.riverDeep);
};

const drawRiverHorizontal = (ctx: CanvasRenderingContext2D, ox: number, oy: number) => {
  drawRiverBase(ctx, ox, oy);
  for (let x = 0; x < TILE_SIZE; x += 8) {
    fillRect(ctx, ox + x, oy + 12, 4, 2, COLORS.riverFoam);
    fillRect(ctx, ox + x + 4, oy + 28, 4, 2, COLORS.riverShade);
    fillRect(ctx, ox + x, oy + 44, 4, 2, COLORS.riverFoam);
  }
};

const drawRiverVertical = (ctx: CanvasRenderingContext2D, ox: number, oy: number) => {
  fillRect(ctx, ox, oy, TILE_SIZE, TILE_SIZE, COLORS.grassA);
  // Banks (grass strips)
  fillRect(ctx, ox, oy, TILE_SIZE, TILE_SIZE, COLORS.grassA);
  fillRect(ctx, ox + 8, oy, TILE_SIZE - 16, TILE_SIZE, COLORS.river);
  // Edge shades
  fillRect(ctx, ox + 8, oy, 2, TILE_SIZE, COLORS.riverDeep);
  fillRect(ctx, ox + TILE_SIZE - 10, oy, 2, TILE_SIZE, COLORS.riverDeep);
  for (let y = 0; y < TILE_SIZE; y += 8) {
    fillRect(ctx, ox + 12, oy + y, 2, 3, COLORS.riverFoam);
    fillRect(ctx, ox + 28, oy + y + 4, 2, 3, COLORS.riverShade);
    fillRect(ctx, ox + 44, oy + y, 2, 3, COLORS.riverFoam);
  }
};

const drawBridge = (ctx: CanvasRenderingContext2D, ox: number, oy: number) => {
  // The bridge crosses a vertical river: grass on top/bottom, water in
  // the middle band, planks across.
  fillRect(ctx, ox, oy, TILE_SIZE, TILE_SIZE, COLORS.grassA);
  fillRect(ctx, ox, oy + 22, TILE_SIZE, 20, COLORS.river);
  fillRect(ctx, ox, oy + 22, TILE_SIZE, 2, COLORS.riverDeep);
  fillRect(ctx, ox, oy + 40, TILE_SIZE, 2, COLORS.riverDeep);
  // Foam ripples
  for (let x = 4; x < TILE_SIZE; x += 12) {
    fillRect(ctx, ox + x, oy + 32, 4, 2, COLORS.riverFoam);
  }
  // Planks (wood) running horizontally across the river
  fillRect(ctx, ox, oy + 18, TILE_SIZE, 28, COLORS.wood);
  for (let x = 0; x < TILE_SIZE; x += 10) {
    fillRect(ctx, ox + x + 8, oy + 18, 2, 28, COLORS.woodShade);
  }
  fillRect(ctx, ox, oy + 18, TILE_SIZE, 2, COLORS.woodDark);
  fillRect(ctx, ox, oy + 44, TILE_SIZE, 2, COLORS.woodDark);
  // Rope handrails
  fillRect(ctx, ox + 2, oy + 14, TILE_SIZE - 4, 1, COLORS.woodDark);
  fillRect(ctx, ox + 2, oy + 48, TILE_SIZE - 4, 1, COLORS.woodDark);
  for (let x = 4; x < TILE_SIZE; x += 8) {
    fillRect(ctx, ox + x, oy + 14, 2, 4, COLORS.wood);
    fillRect(ctx, ox + x, oy + 46, 2, 4, COLORS.wood);
  }
};

// ────────────────────────────── MOUNTAIN ──────────────────────────────

const drawMountain = (ctx: CanvasRenderingContext2D, ox: number, oy: number) => {
  drawGrass(ctx, ox, oy);
  // Big peak: triangle from (32, 6) with base width 40
  const peak = (cx: number, baseY: number, height: number, width: number, withSnow = true) => {
    for (let i = 0; i < height; i++) {
      const halfW = Math.round((width / 2) * (i / height));
      fillRect(ctx, ox + cx - halfW, oy + baseY - height + i, halfW * 2 + 1, 1, COLORS.mountainBase);
    }
    // Shadow side
    for (let i = 0; i < height; i++) {
      const halfW = Math.round((width / 2) * (i / height));
      fillRect(ctx, ox + cx, oy + baseY - height + i, halfW + 1, 1, COLORS.mountainShade);
    }
    // Snowcap
    if (withSnow) {
      fillRect(ctx, ox + cx - 3, oy + baseY - height, 7, 4, COLORS.mountainSnow);
      fillRect(ctx, ox + cx - 1, oy + baseY - height - 1, 3, 1, COLORS.mountainSnow);
      fillRect(ctx, ox + cx + 1, oy + baseY - height + 4, 3, 1, COLORS.mountainShade);
    }
    // Base shadow
    fillRect(ctx, ox + cx - width / 2, oy + baseY, width + 1, 2, COLORS.mountainDark);
  };
  peak(20, 50, 38, 36, true);
  peak(46, 52, 28, 26, true);
};

// ────────────────────────────── HOUSES & VILLAGE BUILDINGS ──────────────────────────────

const drawHouseShape = (
  ctx: CanvasRenderingContext2D, ox: number, oy: number,
  wall: string, wallShade: string,
  roof: string, roofShade: string, roofDark: string,
) => {
  drawGrass(ctx, ox, oy);
  // Walls
  fillRect(ctx, ox + 10, oy + 28, 44, 28, wall);
  fillRect(ctx, ox + 10, oy + 50, 44, 6, wallShade);
  fillRect(ctx, ox + 10, oy + 28, 2, 28, wallShade);
  fillRect(ctx, ox + 52, oy + 28, 2, 28, wallShade);
  // Triangular roof (sloped sides)
  for (let i = 0; i < 14; i++) {
    fillRect(ctx, ox + 6 + i, oy + 28 - i, 52 - 2 * i, 2, roof);
  }
  fillRect(ctx, ox + 6, oy + 28, 52, 2, roofShade);
  fillRect(ctx, ox + 8, oy + 26, 48, 1, roofDark);
  // Door (wood)
  fillRect(ctx, ox + 28, oy + 40, 10, 16, COLORS.wood);
  fillRect(ctx, ox + 28, oy + 40, 10, 2, COLORS.woodShade);
  fillRect(ctx, ox + 35, oy + 47, 2, 2, COLORS.gold);
  // Windows
  fillRect(ctx, ox + 14, oy + 34, 8, 8, COLORS.riverFoam);
  fillRect(ctx, ox + 14, oy + 34, 8, 1, COLORS.woodShade);
  fillRect(ctx, ox + 18, oy + 34, 1, 8, COLORS.woodShade);
  fillRect(ctx, ox + 42, oy + 34, 8, 8, COLORS.riverFoam);
  fillRect(ctx, ox + 42, oy + 34, 8, 1, COLORS.woodShade);
  fillRect(ctx, ox + 46, oy + 34, 1, 8, COLORS.woodShade);
};

const drawHouse = (ctx: CanvasRenderingContext2D, ox: number, oy: number) => {
  drawHouseShape(
    ctx, ox, oy,
    COLORS.cream, COLORS.creamShade,
    COLORS.brickRed, COLORS.brickRedShade, COLORS.brickRedDark,
  );
};

const drawVillage = (ctx: CanvasRenderingContext2D, ox: number, oy: number) => {
  // Village hall: bigger, blue roof, flag on top, sign at the door.
  drawGrass(ctx, ox, oy);
  // Walls
  fillRect(ctx, ox + 6, oy + 26, 52, 32, COLORS.cream);
  fillRect(ctx, ox + 6, oy + 52, 52, 6, COLORS.creamShade);
  fillRect(ctx, ox + 6, oy + 26, 2, 32, COLORS.creamShade);
  fillRect(ctx, ox + 56, oy + 26, 2, 32, COLORS.creamShade);
  // Wide roof
  for (let i = 0; i < 14; i++) {
    fillRect(ctx, ox + 2 + i, oy + 26 - i, 60 - 2 * i, 2, COLORS.brickRoofBlue);
  }
  fillRect(ctx, ox + 2, oy + 26, 60, 2, COLORS.brickRoofBlueShade);
  // Bell tower
  fillRect(ctx, ox + 28, oy + 4, 8, 12, COLORS.brickRoofBlue);
  fillRect(ctx, ox + 28, oy + 14, 8, 2, COLORS.brickRoofBlueShade);
  fillRect(ctx, ox + 30, oy + 8, 4, 4, COLORS.gold);
  // Flag
  fillRect(ctx, ox + 31, oy, 1, 6, COLORS.woodDark);
  fillRect(ctx, ox + 32, oy, 8, 4, COLORS.red);
  // Door & windows
  fillRect(ctx, ox + 28, oy + 38, 10, 20, COLORS.wood);
  fillRect(ctx, ox + 28, oy + 38, 10, 2, COLORS.woodShade);
  fillRect(ctx, ox + 34, oy + 48, 2, 2, COLORS.gold);
  fillRect(ctx, ox + 12, oy + 32, 10, 10, COLORS.riverFoam);
  fillRect(ctx, ox + 42, oy + 32, 10, 10, COLORS.riverFoam);
  // Window frames
  fillRect(ctx, ox + 16, oy + 32, 1, 10, COLORS.woodShade);
  fillRect(ctx, ox + 46, oy + 32, 1, 10, COLORS.woodShade);
  fillRect(ctx, ox + 12, oy + 36, 10, 1, COLORS.woodShade);
  fillRect(ctx, ox + 42, oy + 36, 10, 1, COLORS.woodShade);
};

const drawBakery = (ctx: CanvasRenderingContext2D, ox: number, oy: number) => {
  drawGrass(ctx, ox, oy);
  // Brick walls
  fillRect(ctx, ox + 6, oy + 30, 52, 26, COLORS.brickRed);
  fillRect(ctx, ox + 6, oy + 50, 52, 6, COLORS.brickRedShade);
  // Brick lines (mortar)
  for (let y = 32; y < 50; y += 4) {
    fillRect(ctx, ox + 6, oy + y, 52, 1, COLORS.brickRedDark);
  }
  for (let y = 32; y < 50; y += 8) {
    fillRect(ctx, ox + 14, oy + y, 1, 4, COLORS.brickRedDark);
    fillRect(ctx, ox + 30, oy + y, 1, 4, COLORS.brickRedDark);
    fillRect(ctx, ox + 46, oy + y, 1, 4, COLORS.brickRedDark);
  }
  // Slanted roof
  for (let i = 0; i < 12; i++) {
    fillRect(ctx, ox + 4 + i, oy + 30 - i, 56 - 2 * i, 2, COLORS.brickRoofGreen);
  }
  fillRect(ctx, ox + 4, oy + 30, 56, 2, COLORS.brickRoofGreenShade);
  // Tall chimney with smoke
  fillRect(ctx, ox + 12, oy + 8, 6, 14, COLORS.brickRedShade);
  fillRect(ctx, ox + 12, oy + 8, 6, 2, COLORS.brickRedDark);
  fillRect(ctx, ox + 16, oy + 4, 4, 4, COLORS.stone);
  fillRect(ctx, ox + 20, oy + 0, 6, 4, COLORS.stone);
  // Sign with a loaf of bread above the door
  fillRect(ctx, ox + 22, oy + 14, 22, 10, COLORS.wood);
  fillRect(ctx, ox + 22, oy + 14, 22, 1, COLORS.woodDark);
  fillRect(ctx, ox + 22, oy + 23, 22, 1, COLORS.woodDark);
  // Bread shape on sign
  fillRect(ctx, ox + 26, oy + 16, 14, 6, COLORS.cream);
  fillRect(ctx, ox + 28, oy + 17, 10, 4, COLORS.gold);
  fillRect(ctx, ox + 30, oy + 18, 2, 1, COLORS.goldShade);
  fillRect(ctx, ox + 34, oy + 18, 2, 1, COLORS.goldShade);
  // Display window (with bread loaves)
  fillRect(ctx, ox + 12, oy + 36, 12, 12, COLORS.parchment);
  fillRect(ctx, ox + 14, oy + 38, 4, 3, COLORS.gold);
  fillRect(ctx, ox + 18, oy + 41, 4, 2, COLORS.gold);
  fillRect(ctx, ox + 12, oy + 36, 12, 1, COLORS.woodShade);
  // Door
  fillRect(ctx, ox + 36, oy + 34, 14, 22, COLORS.wood);
  fillRect(ctx, ox + 36, oy + 34, 14, 2, COLORS.woodShade);
  fillRect(ctx, ox + 47, oy + 44, 2, 2, COLORS.gold);
};

const drawLibrary = (ctx: CanvasRenderingContext2D, ox: number, oy: number) => {
  drawGrass(ctx, ox, oy);
  // Stone walls (taller, narrower building)
  fillRect(ctx, ox + 10, oy + 16, 44, 40, COLORS.stone);
  fillRect(ctx, ox + 10, oy + 50, 44, 6, COLORS.stoneShade);
  // Stone block lines
  for (let y = 20; y < 50; y += 6) {
    fillRect(ctx, ox + 10, oy + y, 44, 1, COLORS.stoneShade);
  }
  for (let y = 20; y < 50; y += 12) {
    fillRect(ctx, ox + 22, oy + y, 1, 6, COLORS.stoneShade);
    fillRect(ctx, ox + 36, oy + y + 6, 1, 6, COLORS.stoneShade);
  }
  // Pointed parchment roof
  for (let i = 0; i < 12; i++) {
    fillRect(ctx, ox + 8 + i, oy + 16 - i, 48 - 2 * i, 2, COLORS.brickRoofBlue);
  }
  fillRect(ctx, ox + 8, oy + 16, 48, 2, COLORS.brickRoofBlueShade);
  // Big arched window with scroll/book emblem
  fillRect(ctx, ox + 18, oy + 22, 28, 18, COLORS.parchment);
  fillRect(ctx, ox + 18, oy + 22, 28, 2, COLORS.woodShade);
  // Two open book pages
  fillRect(ctx, ox + 22, oy + 26, 8, 12, COLORS.cream);
  fillRect(ctx, ox + 34, oy + 26, 8, 12, COLORS.cream);
  fillRect(ctx, ox + 31, oy + 24, 2, 16, COLORS.wood);
  fillRect(ctx, ox + 24, oy + 28, 4, 1, COLORS.woodShade);
  fillRect(ctx, ox + 24, oy + 31, 4, 1, COLORS.woodShade);
  fillRect(ctx, ox + 36, oy + 28, 4, 1, COLORS.woodShade);
  fillRect(ctx, ox + 36, oy + 31, 4, 1, COLORS.woodShade);
  // Door
  fillRect(ctx, ox + 26, oy + 42, 12, 14, COLORS.wood);
  fillRect(ctx, ox + 26, oy + 42, 12, 2, COLORS.woodShade);
  fillRect(ctx, ox + 35, oy + 49, 2, 2, COLORS.gold);
};

const drawMarket = (ctx: CanvasRenderingContext2D, ox: number, oy: number) => {
  drawGrass(ctx, ox, oy);
  // Two wooden posts
  fillRect(ctx, ox + 6, oy + 14, 4, 42, COLORS.wood);
  fillRect(ctx, ox + 54, oy + 14, 4, 42, COLORS.wood);
  fillRect(ctx, ox + 6, oy + 14, 1, 42, COLORS.woodDark);
  fillRect(ctx, ox + 54, oy + 14, 1, 42, COLORS.woodDark);
  // Striped canopy
  for (let x = 6; x < 58; x += 6) {
    const isRed = ((x - 6) / 6) % 2 === 0;
    fillRect(ctx, ox + x, oy + 14, 6, 8, isRed ? COLORS.red : COLORS.cream);
  }
  fillRect(ctx, ox + 6, oy + 22, 52, 2, COLORS.redDark);
  // Wooden table
  fillRect(ctx, ox + 10, oy + 36, 44, 8, COLORS.wood);
  fillRect(ctx, ox + 10, oy + 44, 44, 12, COLORS.woodShade);
  fillRect(ctx, ox + 10, oy + 36, 44, 2, COLORS.woodDark);
  // Goods on the table: apples, pumpkins, carrots, breads
  // Apples
  fillRect(ctx, ox + 14, oy + 28, 8, 8, COLORS.red);
  fillRect(ctx, ox + 14, oy + 28, 8, 2, COLORS.redDark);
  fillRect(ctx, ox + 16, oy + 27, 2, 2, COLORS.forestLeaf);
  // Pumpkin
  fillRect(ctx, ox + 24, oy + 30, 10, 6, COLORS.orange);
  fillRect(ctx, ox + 24, oy + 30, 10, 1, COLORS.goldShade);
  fillRect(ctx, ox + 28, oy + 28, 2, 2, COLORS.forestLeaf);
  // Greens
  fillRect(ctx, ox + 36, oy + 28, 8, 8, COLORS.forestLeafLight);
  fillRect(ctx, ox + 36, oy + 28, 8, 2, COLORS.forestLeafDark);
  // Bread
  fillRect(ctx, ox + 46, oy + 30, 8, 6, COLORS.gold);
  fillRect(ctx, ox + 46, oy + 30, 8, 1, COLORS.goldShade);
  // Price sign
  fillRect(ctx, ox + 26, oy + 46, 12, 6, COLORS.cream);
  fillRect(ctx, ox + 30, oy + 48, 4, 2, COLORS.red);
};

const drawFountain = (ctx: CanvasRenderingContext2D, ox: number, oy: number) => {
  drawGrass(ctx, ox, oy);
  // Stone plaza base
  fillRect(ctx, ox + 6, oy + 42, 52, 14, COLORS.stone);
  fillRect(ctx, ox + 6, oy + 50, 52, 6, COLORS.stoneShade);
  // Round basin (drawn as horizontal slices)
  const basin = [
    { y: 30, w: 36 }, { y: 32, w: 40 }, { y: 34, w: 44 },
    { y: 36, w: 44 }, { y: 38, w: 44 }, { y: 40, w: 40 },
  ];
  for (const slice of basin) {
    fillRect(ctx, ox + (TILE_SIZE - slice.w) / 2, oy + slice.y, slice.w, 2, COLORS.stone);
  }
  // Water inside basin
  fillRect(ctx, ox + 16, oy + 34, 32, 6, COLORS.river);
  fillRect(ctx, ox + 16, oy + 34, 32, 1, COLORS.riverFoam);
  // Central pillar with spout
  fillRect(ctx, ox + 28, oy + 18, 8, 16, COLORS.stoneShade);
  fillRect(ctx, ox + 28, oy + 18, 8, 2, COLORS.stoneDark);
  fillRect(ctx, ox + 30, oy + 14, 4, 6, COLORS.stone);
  // Water streams (left/right)
  fillRect(ctx, ox + 26, oy + 24, 2, 8, COLORS.riverFoam);
  fillRect(ctx, ox + 36, oy + 24, 2, 8, COLORS.riverFoam);
  // Water spout
  fillRect(ctx, ox + 30, oy + 6, 4, 10, COLORS.riverFoam);
  fillRect(ctx, ox + 31, oy + 4, 2, 2, COLORS.riverFoam);
  // Drops
  fillRect(ctx, ox + 20, oy + 22, 2, 2, COLORS.riverFoam);
  fillRect(ctx, ox + 42, oy + 22, 2, 2, COLORS.riverFoam);
};

const drawCastle = (ctx: CanvasRenderingContext2D, ox: number, oy: number) => {
  drawGrass(ctx, ox, oy);
  // Main keep walls
  fillRect(ctx, ox + 8, oy + 22, 48, 34, COLORS.stone);
  fillRect(ctx, ox + 8, oy + 50, 48, 6, COLORS.stoneShade);
  // Block lines
  for (let y = 26; y < 50; y += 6) {
    fillRect(ctx, ox + 8, oy + y, 48, 1, COLORS.stoneShade);
  }
  for (let y = 26; y < 50; y += 12) {
    fillRect(ctx, ox + 20, oy + y, 1, 6, COLORS.stoneShade);
    fillRect(ctx, ox + 32, oy + y + 6, 1, 6, COLORS.stoneShade);
    fillRect(ctx, ox + 44, oy + y, 1, 6, COLORS.stoneShade);
  }
  // Two towers
  fillRect(ctx, ox + 2, oy + 18, 10, 38, COLORS.stone);
  fillRect(ctx, ox + 2, oy + 50, 10, 6, COLORS.stoneShade);
  fillRect(ctx, ox + 52, oy + 18, 10, 38, COLORS.stone);
  fillRect(ctx, ox + 52, oy + 50, 10, 6, COLORS.stoneShade);
  // Tower windows
  fillRect(ctx, ox + 5, oy + 30, 4, 6, COLORS.black);
  fillRect(ctx, ox + 55, oy + 30, 4, 6, COLORS.black);
  // Tower roofs (cone)
  for (let i = 0; i < 8; i++) {
    fillRect(ctx, ox + 2 + i, oy + 18 - i, 10 - 2 * i, 2, COLORS.brickRoofBlue);
    fillRect(ctx, ox + 52 + i, oy + 18 - i, 10 - 2 * i, 2, COLORS.brickRoofBlue);
  }
  // Flags on towers
  fillRect(ctx, ox + 6, oy + 4, 1, 8, COLORS.woodDark);
  fillRect(ctx, ox + 7, oy + 4, 6, 4, COLORS.red);
  fillRect(ctx, ox + 56, oy + 4, 1, 8, COLORS.woodDark);
  fillRect(ctx, ox + 57, oy + 4, 6, 4, COLORS.red);
  // Battlements (crenellations)
  for (let x = 10; x < 56; x += 6) {
    fillRect(ctx, ox + x, oy + 18, 4, 4, COLORS.stoneShade);
  }
  // Gate (arched door)
  fillRect(ctx, ox + 26, oy + 32, 14, 24, COLORS.woodDark);
  fillRect(ctx, ox + 27, oy + 30, 12, 4, COLORS.woodDark);
  fillRect(ctx, ox + 28, oy + 28, 10, 4, COLORS.woodDark);
  fillRect(ctx, ox + 30, oy + 30, 6, 24, COLORS.wood);
  fillRect(ctx, ox + 33, oy + 30, 1, 24, COLORS.woodShade);
  fillRect(ctx, ox + 30, oy + 36, 6, 1, COLORS.woodShade);
  fillRect(ctx, ox + 30, oy + 44, 6, 1, COLORS.woodShade);
  // Gate ring
  fillRect(ctx, ox + 35, oy + 42, 2, 2, COLORS.gold);
  // Main flag (taller)
  fillRect(ctx, ox + 31, oy + 0, 1, 18, COLORS.woodDark);
  fillRect(ctx, ox + 32, oy + 0, 10, 6, COLORS.red);
  fillRect(ctx, ox + 36, oy + 2, 2, 2, COLORS.gold);
};

const drawCastleStart = (ctx: CanvasRenderingContext2D, ox: number, oy: number) => {
  // Friendly cottage with a glowing sun above it — "home".
  drawGrass(ctx, ox, oy);
  // Cottage
  fillRect(ctx, ox + 12, oy + 32, 40, 24, COLORS.cream);
  fillRect(ctx, ox + 12, oy + 50, 40, 6, COLORS.creamShade);
  // Roof
  for (let i = 0; i < 12; i++) {
    fillRect(ctx, ox + 8 + i, oy + 32 - i, 48 - 2 * i, 2, COLORS.brickRedShade);
  }
  // Door
  fillRect(ctx, ox + 28, oy + 40, 10, 16, COLORS.wood);
  fillRect(ctx, ox + 28, oy + 40, 10, 2, COLORS.woodShade);
  fillRect(ctx, ox + 35, oy + 47, 2, 2, COLORS.gold);
  // Window
  fillRect(ctx, ox + 16, oy + 38, 8, 8, COLORS.riverFoam);
  fillRect(ctx, ox + 42, oy + 38, 8, 8, COLORS.riverFoam);
  // Friendly sun
  fillRect(ctx, ox + 26, oy + 6, 12, 12, COLORS.yellow);
  fillRect(ctx, ox + 28, oy + 4, 8, 16, COLORS.yellow);
  fillRect(ctx, ox + 24, oy + 8, 16, 8, COLORS.yellow);
  fillRect(ctx, ox + 26, oy + 8, 12, 8, COLORS.gold);
  fillRect(ctx, ox + 30, oy + 10, 4, 4, COLORS.parchment);
  // Sun rays
  fillRect(ctx, ox + 31, oy + 0, 2, 4, COLORS.gold);
  fillRect(ctx, ox + 18, oy + 11, 4, 2, COLORS.gold);
  fillRect(ctx, ox + 42, oy + 11, 4, 2, COLORS.gold);
};

// ────────────────────────── MEDIEVAL THREATS / NPCs ──────────────────────────

const drawDragon = (ctx: CanvasRenderingContext2D, ox: number, oy: number) => {
  drawGrass(ctx, ox, oy);
  // Body
  fillRect(ctx, ox + 18, oy + 32, 28, 18, COLORS.red);
  fillRect(ctx, ox + 18, oy + 46, 28, 4, COLORS.redDark);
  // Belly
  fillRect(ctx, ox + 22, oy + 38, 20, 8, COLORS.cream);
  for (let y = 38; y < 46; y += 2) {
    fillRect(ctx, ox + 22, oy + y, 20, 1, COLORS.goldShade);
  }
  // Head (left)
  fillRect(ctx, ox + 8, oy + 26, 16, 12, COLORS.red);
  fillRect(ctx, ox + 8, oy + 34, 16, 4, COLORS.redDark);
  // Snout
  fillRect(ctx, ox + 4, oy + 30, 6, 6, COLORS.red);
  fillRect(ctx, ox + 4, oy + 34, 6, 2, COLORS.redDark);
  // Eye
  fillRect(ctx, ox + 14, oy + 28, 3, 3, COLORS.yellow);
  fillRect(ctx, ox + 15, oy + 29, 1, 2, COLORS.black);
  // Horns
  fillRect(ctx, ox + 12, oy + 22, 2, 4, COLORS.stoneShade);
  fillRect(ctx, ox + 18, oy + 22, 2, 4, COLORS.stoneShade);
  // Wings (right)
  fillRect(ctx, ox + 32, oy + 18, 20, 14, COLORS.redDark);
  for (let i = 0; i < 12; i++) {
    fillRect(ctx, ox + 34 + i, oy + 18 - 0, 16 - i, 1, COLORS.red);
  }
  fillRect(ctx, ox + 32, oy + 30, 20, 2, COLORS.black);
  // Tail
  fillRect(ctx, ox + 46, oy + 36, 12, 6, COLORS.red);
  fillRect(ctx, ox + 54, oy + 32, 4, 8, COLORS.red);
  fillRect(ctx, ox + 56, oy + 30, 4, 6, COLORS.redDark);
  // Legs / claws
  fillRect(ctx, ox + 22, oy + 50, 4, 6, COLORS.red);
  fillRect(ctx, ox + 38, oy + 50, 4, 6, COLORS.red);
  fillRect(ctx, ox + 22, oy + 54, 4, 2, COLORS.black);
  fillRect(ctx, ox + 38, oy + 54, 4, 2, COLORS.black);
  // Fire breath
  fillRect(ctx, ox + 0, oy + 30, 4, 2, COLORS.orange);
  fillRect(ctx, ox + 0, oy + 34, 3, 2, COLORS.yellow);
};

const drawWizard = (ctx: CanvasRenderingContext2D, ox: number, oy: number) => {
  drawGrass(ctx, ox, oy);
  // Robe
  fillRect(ctx, ox + 20, oy + 28, 24, 28, COLORS.purple);
  fillRect(ctx, ox + 20, oy + 50, 24, 6, COLORS.purpleShade);
  // Belt
  fillRect(ctx, ox + 20, oy + 40, 24, 3, COLORS.gold);
  // Head
  fillRect(ctx, ox + 24, oy + 18, 16, 14, '#f1c8a0');
  fillRect(ctx, ox + 24, oy + 30, 16, 2, '#c89a73');
  // Beard
  fillRect(ctx, ox + 24, oy + 26, 16, 12, COLORS.parchment);
  fillRect(ctx, ox + 28, oy + 38, 8, 4, COLORS.parchment);
  fillRect(ctx, ox + 28, oy + 24, 2, 2, COLORS.black);
  fillRect(ctx, ox + 34, oy + 24, 2, 2, COLORS.black);
  // Pointed hat
  for (let i = 0; i < 14; i++) {
    fillRect(ctx, ox + 30 - Math.floor(i / 2), oy + 16 - i, i + 4, 1, COLORS.purpleShade);
  }
  // Stars on hat
  fillRect(ctx, ox + 28, oy + 8, 2, 2, COLORS.yellow);
  fillRect(ctx, ox + 32, oy + 12, 2, 2, COLORS.yellow);
  // Staff
  fillRect(ctx, ox + 46, oy + 20, 2, 36, COLORS.wood);
  fillRect(ctx, ox + 44, oy + 16, 6, 6, COLORS.yellow);
  fillRect(ctx, ox + 45, oy + 17, 4, 4, COLORS.gold);
};

const drawKnight = (ctx: CanvasRenderingContext2D, ox: number, oy: number) => {
  drawGrass(ctx, ox, oy);
  // Body armour
  fillRect(ctx, ox + 22, oy + 28, 20, 24, COLORS.stone);
  fillRect(ctx, ox + 22, oy + 48, 20, 4, COLORS.stoneShade);
  // Plates
  fillRect(ctx, ox + 22, oy + 34, 20, 1, COLORS.stoneShade);
  fillRect(ctx, ox + 22, oy + 40, 20, 1, COLORS.stoneShade);
  // Tabard with cross
  fillRect(ctx, ox + 28, oy + 30, 8, 22, COLORS.red);
  fillRect(ctx, ox + 31, oy + 32, 2, 16, COLORS.parchment);
  fillRect(ctx, ox + 28, oy + 38, 8, 2, COLORS.parchment);
  // Helmet
  fillRect(ctx, ox + 24, oy + 16, 16, 14, COLORS.stone);
  fillRect(ctx, ox + 24, oy + 16, 16, 2, COLORS.stoneShade);
  // Visor slit
  fillRect(ctx, ox + 26, oy + 22, 12, 2, COLORS.black);
  // Plume
  fillRect(ctx, ox + 30, oy + 8, 4, 8, COLORS.red);
  fillRect(ctx, ox + 30, oy + 6, 4, 2, COLORS.redDark);
  // Sword in right hand
  fillRect(ctx, ox + 44, oy + 18, 2, 28, COLORS.stoneShade);
  fillRect(ctx, ox + 43, oy + 46, 4, 2, COLORS.gold);
  fillRect(ctx, ox + 43, oy + 48, 4, 4, COLORS.wood);
  // Shield
  fillRect(ctx, ox + 12, oy + 28, 10, 18, COLORS.brickRoofBlue);
  fillRect(ctx, ox + 12, oy + 28, 10, 2, COLORS.brickRoofBlueShade);
  fillRect(ctx, ox + 16, oy + 32, 2, 10, COLORS.parchment);
  fillRect(ctx, ox + 12, oy + 36, 10, 2, COLORS.parchment);
  // Legs
  fillRect(ctx, ox + 24, oy + 52, 6, 4, COLORS.stoneShade);
  fillRect(ctx, ox + 34, oy + 52, 6, 4, COLORS.stoneShade);
};

const drawFlowers = (ctx: CanvasRenderingContext2D, ox: number, oy: number) => {
  drawGrass(ctx, ox, oy);
  const flower = (x: number, y: number, petal: string) => {
    fillRect(ctx, ox + x + 2, oy + y + 6, 1, 6, COLORS.forestLeaf);
    fillRect(ctx, ox + x, oy + y + 2, 6, 4, petal);
    fillRect(ctx, ox + x + 2, oy + y, 2, 6, petal);
    fillRect(ctx, ox + x + 2, oy + y + 2, 2, 2, COLORS.yellow);
  };
  flower(10, 20, COLORS.pink);
  flower(28, 14, COLORS.yellow);
  flower(44, 22, COLORS.purple);
  flower(18, 38, COLORS.white);
  flower(36, 42, COLORS.red);
  flower(50, 44, COLORS.pink);
  flower(6, 46, COLORS.yellow);
};

const drawSign = (ctx: CanvasRenderingContext2D, ox: number, oy: number) => {
  drawGrass(ctx, ox, oy);
  // Pole
  fillRect(ctx, ox + 30, oy + 22, 4, 30, COLORS.wood);
  fillRect(ctx, ox + 30, oy + 22, 1, 30, COLORS.woodDark);
  // Plank
  fillRect(ctx, ox + 12, oy + 18, 40, 14, COLORS.wood);
  fillRect(ctx, ox + 12, oy + 18, 40, 2, COLORS.woodShade);
  fillRect(ctx, ox + 12, oy + 30, 40, 2, COLORS.woodDark);
  // Arrow tip pointing right
  for (let i = 0; i < 7; i++) {
    fillRect(ctx, ox + 52 + i, oy + 20 + i, 2, 1, COLORS.wood);
    fillRect(ctx, ox + 52 + i, oy + 30 - i, 2, 1, COLORS.wood);
  }
  // Letters (decorative)
  fillRect(ctx, ox + 18, oy + 22, 2, 6, COLORS.parchment);
  fillRect(ctx, ox + 24, oy + 22, 2, 6, COLORS.parchment);
  fillRect(ctx, ox + 30, oy + 22, 2, 6, COLORS.parchment);
  fillRect(ctx, ox + 36, oy + 22, 2, 6, COLORS.parchment);
  fillRect(ctx, ox + 42, oy + 22, 2, 6, COLORS.parchment);
};

// ──────────────────────────── DRAWER REGISTRY ────────────────────────────

const drawers: Record<TileType, (ctx: CanvasRenderingContext2D, ox: number, oy: number) => void> = {
  grass: drawGrass,
  path: drawPath,
  forest: drawForest,
  bridge: drawBridge,
  'river-horizontal': drawRiverHorizontal,
  'river-vertical': drawRiverVertical,
  mountain: drawMountain,
  village: drawVillage,
  house: drawHouse,
  market: drawMarket,
  bakery: drawBakery,
  library: drawLibrary,
  fountain: drawFountain,
  'castle-start': drawCastleStart,
  'castle-end': drawCastle,
  dragon: drawDragon,
  wizard: drawWizard,
  knight: drawKnight,
  flowers: drawFlowers,
  sign: drawSign,
};

/**
 * Build a single horizontal sheet with every tile variant — used to
 * create per-type textures. Returns the canvas + a lookup map.
 */
export const buildTileSheet = (): { canvas: HTMLCanvasElement; index: Record<TileType, number> } => {
  const types = Object.keys(drawers) as TileType[];
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
 * Composite the whole world (grass + decorations + path + landmarks)
 * into a single canvas. Phaser then uses this as one giant texture
 * instead of hundreds of per-tile sprites — sharper and faster.
 */
export interface WorldBuildInput {
  cols: number;
  rows: number;
  path: ReadonlyArray<{ col: number; row: number }>;
  pathTiles: Array<{ type: TileType }>;
  decorations: Array<{ type: TileType; col: number; row: number }>;
}

export const buildWorldCanvas = (input: WorldBuildInput): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  canvas.width = input.cols * TILE_SIZE;
  canvas.height = input.rows * TILE_SIZE;
  const ctx = canvas.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;

  // 1) Grass everywhere.
  for (let row = 0; row < input.rows; row++) {
    for (let col = 0; col < input.cols; col++) {
      drawers.grass(ctx, col * TILE_SIZE, row * TILE_SIZE);
    }
  }

  // 2) Decorations first so the path/landmarks always sit on top.
  const occupied = new Set(input.path.map((p) => `${p.col},${p.row}`));
  for (const d of input.decorations) {
    if (occupied.has(`${d.col},${d.row}`)) continue;
    drawers[d.type](ctx, d.col * TILE_SIZE, d.row * TILE_SIZE);
  }

  // 3) Path tiles. For every walkable cell, paint the sand path beneath
  //    (except where it would not make sense, like across a bridge).
  input.path.forEach((pos, i) => {
    const tile = input.pathTiles[i];
    const isBridge = tile.type === 'bridge';
    if (!isBridge) {
      drawers.path(ctx, pos.col * TILE_SIZE, pos.row * TILE_SIZE);
    }
    if (tile.type !== 'path' && tile.type !== 'grass') {
      drawers[tile.type](ctx, pos.col * TILE_SIZE, pos.row * TILE_SIZE);
    }
  });

  return canvas;
};

/**
 * The rescued princess sprite (used by the victory screen + the world).
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
  const px = (x: number, y: number, w: number, h: number, color: string) =>
    drawPixel(ctx, x * scale, y * scale, w * scale, h * scale, color);

  // Crown
  for (let x = 4; x <= 11; x++) px(x, 2, 1, 1, palette.crown);
  px(4, 1, 1, 1, palette.crown);
  px(7, 1, 1, 1, palette.crown);
  px(10, 1, 1, 1, palette.crown);
  // Hair
  for (let x = 3; x <= 12; x++) px(x, 3, 1, 1, palette.hair);
  for (let x = 3; x <= 12; x++) px(x, 4, 1, 1, palette.hairShade);
  // Face
  for (let x = 4; x <= 11; x++) px(x, 5, 1, 1, palette.skin);
  for (let x = 4; x <= 11; x++) px(x, 6, 1, 1, palette.skin);
  px(6, 6, 1, 1, palette.eye);
  px(9, 6, 1, 1, palette.eye);
  px(7, 7, 1, 1, palette.skinShade);
  px(8, 7, 1, 1, palette.skinShade);
  // Gown
  for (let y = 8; y <= 13; y++) for (let x = 3; x <= 12; x++) px(x, y, 1, 1, palette.gown);
  for (let x = 3; x <= 12; x++) px(x, 13, 1, 1, palette.gownShade);
  // Feet
  px(5, 14, 2, 1, '#1a1a1a');
  px(9, 14, 2, 1, '#1a1a1a');
  return canvas;
};
