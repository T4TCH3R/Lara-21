import { SPRITE_GRID } from "./constants.js";

/**
 * Draws a pixel-art sprite defined as a list of rects on a 16x16 virtual
 * grid: [x, y, w, h, paletteKey]. Keeping sprites as rect lists (instead of
 * a full 256-cell array) makes them easy to hand-author and re-color.
 */
export function drawPixelSprite(ctx, shapes, palette, originX, originY, scale) {
  for (const [x, y, w, h, colorKey] of shapes) {
    ctx.fillStyle = palette[colorKey] || colorKey;
    ctx.fillRect(
      Math.round(originX + x * scale),
      Math.round(originY + y * scale),
      Math.ceil(w * scale),
      Math.ceil(h * scale)
    );
  }
}

/** Mirrors a shape list horizontally across the sprite's 16px grid. */
export function mirrorShapes(shapes) {
  return shapes.map(([x, y, w, h, c]) => [SPRITE_GRID - x - w, y, w, h, c]);
}
