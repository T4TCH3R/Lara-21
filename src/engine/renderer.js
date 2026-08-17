import { TILE, SPRITE_SCALE, SPRITE_GRID } from "./constants.js";
import { TILE_COLORS } from "../data/tiles.js";
import { PLAYER_SPRITES, PLAYER_PALETTE } from "../data/sprites.js";
import { ANIMAL_SHAPES, ANIMAL_PALETTES } from "../data/animalSprites.js";
import { drawPixelSprite } from "./spriteRenderer.js";

function drawSignShape(ctx, sx, sy, size, c = TILE_COLORS.sign) {
  ctx.fillStyle = c.post;
  ctx.fillRect(sx + size * 0.42, sy + size * 0.42, size * 0.16, size * 0.58);
  ctx.fillStyle = c.board;
  ctx.fillRect(sx + size * 0.08, sy + size * 0.08, size * 0.84, size * 0.4);
  ctx.fillStyle = c.text;
  ctx.fillRect(sx + size * 0.18, sy + size * 0.2, size * 0.64, size * 0.06);
  ctx.fillRect(sx + size * 0.18, sy + size * 0.34, size * 0.4, size * 0.06);
}

export function drawTile(ctx, type, sx, sy, size, worldX, worldY, t) {
  const c = TILE_COLORS[type] || TILE_COLORS.grass;
  ctx.fillStyle = c.base;
  ctx.fillRect(sx, sy, size, size);
  const speck = (worldX * 7 + worldY * 13) % 5;

  switch (type) {
    case TILE.GRASS:
    case TILE.TALLGRASS:
      ctx.fillStyle = c.accent;
      if (speck < 2) ctx.fillRect(sx + size * 0.2, sy + size * 0.2, size * 0.14, size * 0.14);
      if (speck < 1) ctx.fillRect(sx + size * 0.6, sy + size * 0.55, size * 0.14, size * 0.14);
      break;
    case TILE.PATH:
    case TILE.ENTRANCE:
    case TILE.SAND:
      ctx.fillStyle = c.accent;
      if (speck === 0) ctx.fillRect(sx + size * 0.3, sy + size * 0.3, size * 0.18, size * 0.18);
      break;
    case TILE.PLAZA:
      ctx.fillStyle = c.accent;
      if (speck < 2) ctx.fillRect(sx + size * 0.15, sy + size * 0.7, size * 0.7, size * 0.08);
      break;
    case TILE.WATER: {
      const wavePhase = Math.floor(t / 380 + worldX + worldY) % 2;
      ctx.fillStyle = wavePhase ? c.wave : c.base;
      ctx.fillRect(sx, sy + size * 0.35, size, size * 0.16);
      ctx.fillStyle = c.foam;
      const foamX = wavePhase ? 0.15 : 0.55;
      ctx.fillRect(sx + size * foamX, sy + size * 0.62, size * 0.22, size * 0.08);
      break;
    }
    case TILE.TREE:
      ctx.fillStyle = c.trunk;
      ctx.fillRect(sx + size * 0.42, sy + size * 0.62, size * 0.16, size * 0.38);
      ctx.fillStyle = c.leaf;
      ctx.fillRect(sx + size * 0.08, sy - size * 0.05, size * 0.84, size * 0.62);
      ctx.fillStyle = c.leafDark;
      ctx.fillRect(sx + size * 0.08, sy + size * 0.4, size * 0.84, size * 0.2);
      break;
    case TILE.FLOWER: {
      ctx.fillStyle = c.petal;
      ctx.fillRect(sx + size * 0.32, sy + size * 0.32, size * 0.12, size * 0.12);
      ctx.fillRect(sx + size * 0.56, sy + size * 0.32, size * 0.12, size * 0.12);
      ctx.fillRect(sx + size * 0.32, sy + size * 0.56, size * 0.12, size * 0.12);
      ctx.fillRect(sx + size * 0.56, sy + size * 0.56, size * 0.12, size * 0.12);
      ctx.fillStyle = c.center;
      ctx.fillRect(sx + size * 0.44, sy + size * 0.44, size * 0.12, size * 0.12);
      break;
    }
    case TILE.ROCK:
      ctx.fillStyle = c.shadow;
      ctx.fillRect(sx + size * 0.15, sy + size * 0.35, size * 0.7, size * 0.5);
      ctx.fillStyle = c.highlight;
      ctx.fillRect(sx + size * 0.2, sy + size * 0.3, size * 0.35, size * 0.2);
      break;
    case TILE.FENCE:
      ctx.fillStyle = c.post;
      ctx.fillRect(sx + size * 0.08, sy, size * 0.16, size);
      ctx.fillRect(sx + size * 0.76, sy, size * 0.16, size);
      ctx.fillStyle = c.dark;
      ctx.fillRect(sx, sy + size * 0.3, size, size * 0.14);
      ctx.fillRect(sx, sy + size * 0.62, size, size * 0.14);
      break;
    case TILE.BENCH:
      ctx.fillStyle = c.dark;
      ctx.fillRect(sx + size * 0.1, sy + size * 0.7, size * 0.1, size * 0.3);
      ctx.fillRect(sx + size * 0.8, sy + size * 0.7, size * 0.1, size * 0.3);
      ctx.fillStyle = c.seat;
      ctx.fillRect(sx + size * 0.05, sy + size * 0.45, size * 0.9, size * 0.2);
      ctx.fillRect(sx + size * 0.05, sy + size * 0.18, size * 0.9, size * 0.15);
      break;
    case TILE.SIGN:
      drawSignShape(ctx, sx, sy, size, c);
      break;
    case TILE.WALL:
      ctx.fillStyle = c.dark;
      ctx.fillRect(sx, sy + size * 0.5, size, size * 0.08);
      break;
    case TILE.DOOR:
      ctx.fillStyle = c.frame;
      ctx.fillRect(sx + size * 0.1, sy, size * 0.8, size);
      ctx.fillStyle = c.base;
      ctx.fillRect(sx + size * 0.2, sy + size * 0.1, size * 0.6, size * 0.9);
      break;
    default:
      break;
  }
}

export function drawPlayer(ctx, player, screenX, screenY) {
  const frames = PLAYER_SPRITES[player.dir] || PLAYER_SPRITES.down;
  const shapes = frames[player.moving ? player.frame : 0];
  drawPixelSprite(ctx, shapes, PLAYER_PALETTE, screenX, screenY, SPRITE_SCALE);
}

/** Small deterministic idle bob so still animals don't feel dead. */
export function bobOffset(seed, t) {
  return Math.sin(t / 420 + seed) * 1.6;
}

export function drawAnimal(ctx, speciesKey, screenX, screenY, seed, t) {
  const shapes = ANIMAL_SHAPES[speciesKey];
  const palette = ANIMAL_PALETTES[speciesKey];
  if (!shapes || !palette) return;
  const offsetY = bobOffset(seed, t);
  drawPixelSprite(ctx, shapes, palette, screenX, screenY + offsetY, SPRITE_SCALE);
}

export const SPRITE_PIXEL_SIZE = SPRITE_GRID * SPRITE_SCALE;

/** A little floating polaroid — used for memory/photo collectibles. */
export function drawMemoryIcon(ctx, sx, sy, size, t, seed = 0, isVideo = false) {
  const offsetY = bobOffset(seed, t);
  const pad = size * 0.22;
  ctx.fillStyle = "#f4ead2";
  ctx.fillRect(sx + pad, sy + pad + offsetY, size - pad * 2, size - pad * 2);
  ctx.fillStyle = "#e6a5b8";
  ctx.fillRect(sx + pad * 1.4, sy + pad * 1.4 + offsetY, size - pad * 2.8, size - pad * 3.6);
  if (isVideo) {
    // small play triangle badge, marks this as the one video memory
    ctx.fillStyle = "#16130f";
    const cx = sx + size / 2;
    const cy = sy + size / 2 + offsetY;
    ctx.beginPath();
    ctx.moveTo(cx - 3, cy - 4);
    ctx.lineTo(cx - 3, cy + 4);
    ctx.lineTo(cx + 4, cy);
    ctx.closePath();
    ctx.fill();
  } else {
    ctx.fillStyle = "#d9663f";
    ctx.fillRect(sx + size / 2 - 2, sy + pad * 1.4 + offsetY - 3, 4, 4);
  }
}

/** A small wrapped gift box — used for hidden/secret collectibles and the finale gift. */
export function drawGiftIcon(ctx, sx, sy, size, t, seed = 0) {
  const offsetY = bobOffset(seed, t);
  const pad = size * 0.2;
  ctx.fillStyle = "#b5473a";
  ctx.fillRect(sx + pad, sy + pad * 1.6 + offsetY, size - pad * 2, size - pad * 1.8);
  ctx.fillStyle = "#f4ead2";
  ctx.fillRect(sx + size / 2 - 2, sy + pad * 1.6 + offsetY, 4, size - pad * 1.8);
  ctx.fillRect(sx + pad, sy + size / 2 - 2 + offsetY, size - pad * 2, 4);
  ctx.fillStyle = "#8f3820";
  ctx.fillRect(sx + pad, sy + pad + offsetY, size - pad * 2, pad * 0.7);
}

/** A folded note with a dog-eared corner — used for the memory-gated secret. */
export function drawNoteIcon(ctx, sx, sy, size, t, seed = 0) {
  const offsetY = bobOffset(seed, t);
  const pad = size * 0.24;
  ctx.fillStyle = "#f4ead2";
  ctx.fillRect(sx + pad, sy + pad + offsetY, size - pad * 2, size - pad * 2);
  ctx.fillStyle = "#c2a468";
  ctx.fillRect(sx + size - pad * 1.6, sy + pad + offsetY, pad * 0.6, pad * 0.6);
  ctx.fillStyle = "#40301f";
  ctx.fillRect(sx + pad * 1.5, sy + pad * 2 + offsetY, size - pad * 3, size * 0.08);
  ctx.fillRect(sx + pad * 1.5, sy + pad * 3 + offsetY, size - pad * 4, size * 0.08);
}

/** A small pixel heart — used for the creator's secret message. */
export function drawHeartIcon(ctx, sx, sy, size, t, seed = 0) {
  const offsetY = bobOffset(seed, t);
  ctx.fillStyle = "#d9663f";
  ctx.fillRect(sx + size * 0.28, sy + size * 0.32 + offsetY, size * 0.18, size * 0.18);
  ctx.fillRect(sx + size * 0.54, sy + size * 0.32 + offsetY, size * 0.18, size * 0.18);
  ctx.fillRect(sx + size * 0.3, sy + size * 0.46 + offsetY, size * 0.4, size * 0.16);
  ctx.fillRect(sx + size * 0.38, sy + size * 0.6 + offsetY, size * 0.24, size * 0.1);
  ctx.fillRect(sx + size * 0.44, sy + size * 0.7 + offsetY, size * 0.12, size * 0.06);
}

/** A folded-out sign, freestanding (not tied to a terrain tile). */
export function drawSignIcon(ctx, sx, sy, size) {
  drawSignShape(ctx, sx, sy, size);
}
