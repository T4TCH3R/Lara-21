function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

/**
 * Top-left tile-space coordinate of the camera, following (px, py)
 * (the player's tile-space position) and clamped to map bounds so we
 * never scroll past the edge of the world.
 */
export function computeCamera(px, py, mapWidth, mapHeight, viewportW, viewportH) {
  const maxX = Math.max(0, mapWidth - viewportW);
  const maxY = Math.max(0, mapHeight - viewportH);
  const x = clamp(px - viewportW / 2, 0, maxX);
  const y = clamp(py - viewportH / 2, 0, maxY);
  return { x, y };
}
