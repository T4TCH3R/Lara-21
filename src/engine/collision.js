import { WALKABLE_TILES } from "./constants.js";
import { tileAt } from "../data/map.js";

/**
 * Is (x, y) a tile the player can stand on, ignoring other entities?
 */
export function isWalkable(x, y) {
  return WALKABLE_TILES.has(tileAt(x, y));
}

/**
 * Is (x, y) free to move onto right now — walkable terrain AND not
 * occupied by a blocking entity (animal, sign, bench, gift, ...).
 * `blockingEntities` is an array of {tileX, tileY}.
 */
export function isFree(x, y, blockingEntities = []) {
  if (!isWalkable(x, y)) return false;
  return !blockingEntities.some((e) => e.tileX === x && e.tileY === y);
}
