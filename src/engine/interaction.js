const INTERACT_RANGE = 1.6; // tiles — a little generous so diagonal-adjacent feels right

function tileDistance(ax, ay, bx, by) {
  return Math.hypot(ax - bx, ay - by);
}

/**
 * Finds the closest interactable to the player, within range, that the
 * player is facing (or adjacent to). `interactables` is a flat list of
 * {id, tileX, tileY, ...}. Returns the interactable or null.
 */
export function findNearestInteractable(player, interactables) {
  let best = null;
  let bestDist = Infinity;
  for (const item of interactables) {
    const dist = tileDistance(player.tileX, player.tileY, item.tileX, item.tileY);
    if (dist <= INTERACT_RANGE && dist < bestDist) {
      best = item;
      bestDist = dist;
    }
  }
  return best;
}

export { INTERACT_RANGE };
