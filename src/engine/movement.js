import { DIR_DELTA, DIRECTIONS, MOVE_DURATION_MS } from "./constants.js";
import { isFree } from "./collision.js";

export function createPlayer(tileX, tileY, dir = DIRECTIONS.DOWN) {
  return {
    tileX,
    tileY,
    fromX: tileX,
    fromY: tileY,
    dir,
    moving: false,
    elapsed: 0,
    frame: 0,
  };
}

/**
 * Advance the player one frame. `heldDir` is the currently-held movement
 * direction (or null). `blockingEntities` is a list of {tileX, tileY} the
 * player cannot walk onto (animals, signs, benches, gifts...).
 */
export function stepPlayer(player, heldDir, blockingEntities, dt) {
  const next = { ...player };

  if (next.moving) {
    next.elapsed += dt;
    if (next.elapsed >= MOVE_DURATION_MS) {
      next.moving = false;
      next.elapsed = 0;
      next.fromX = next.tileX;
      next.fromY = next.tileY;
      next.frame = next.frame === 0 ? 1 : 0;
    }
    return next;
  }

  if (!heldDir) return next;

  next.dir = heldDir;
  const delta = DIR_DELTA[heldDir];
  const targetX = next.tileX + delta.dx;
  const targetY = next.tileY + delta.dy;

  if (isFree(targetX, targetY, blockingEntities)) {
    next.fromX = next.tileX;
    next.fromY = next.tileY;
    next.tileX = targetX;
    next.tileY = targetY;
    next.moving = true;
    next.elapsed = 0;
  }

  return next;
}

/** Interpolated tile-space position (floats), for smooth rendering + camera. */
export function getPixelPosition(player) {
  const t = player.moving ? Math.min(1, player.elapsed / MOVE_DURATION_MS) : 1;
  return {
    x: player.fromX + (player.tileX - player.fromX) * t,
    y: player.fromY + (player.tileY - player.fromY) * t,
  };
}
