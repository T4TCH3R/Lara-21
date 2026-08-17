import { describe, it, expect } from "vitest";
import { isWalkable, isFree } from "../engine/collision.js";
import { MAP_GRID, MAP_WIDTH, MAP_HEIGHT, PLAYER_START, ZONES } from "../data/map.js";
import { TILE } from "../engine/constants.js";

describe("isWalkable", () => {
  it("treats out-of-bounds tiles as not walkable", () => {
    expect(isWalkable(-1, 0)).toBe(false);
    expect(isWalkable(0, -1)).toBe(false);
    expect(isWalkable(MAP_WIDTH, 0)).toBe(false);
    expect(isWalkable(0, MAP_HEIGHT)).toBe(false);
  });

  it("player start tile is walkable", () => {
    expect(isWalkable(PLAYER_START.tileX, PLAYER_START.tileY)).toBe(true);
  });

  it("outer border trees are not walkable", () => {
    expect(isWalkable(0, 0)).toBe(false);
    expect(isWalkable(MAP_WIDTH - 1, MAP_HEIGHT - 1)).toBe(false);
  });
});

describe("isFree", () => {
  it("is blocked by an entity standing on an otherwise walkable tile", () => {
    const spot = { tileX: PLAYER_START.tileX, tileY: PLAYER_START.tileY };
    expect(isFree(spot.tileX, spot.tileY, [])).toBe(true);
    expect(isFree(spot.tileX, spot.tileY, [spot])).toBe(false);
  });
});

describe("map connectivity", () => {
  function floodFillReachable(startX, startY) {
    const visited = new Set();
    const stack = [[startX, startY]];
    while (stack.length) {
      const [x, y] = stack.pop();
      const key = `${x},${y}`;
      if (visited.has(key)) continue;
      if (!isWalkable(x, y)) continue;
      visited.add(key);
      stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }
    return visited;
  }

  it("reaches every named zone from the entrance", () => {
    const reachable = floodFillReachable(PLAYER_START.tileX, PLAYER_START.tileY);
    for (const [name, zone] of Object.entries(ZONES)) {
      const midX = Math.floor((zone.x1 + zone.x2) / 2);
      const midY = Math.floor((zone.y1 + zone.y2) / 2);
      // find nearest walkable tile within the zone to the zone center
      let found = false;
      for (let r = 0; r < 6 && !found; r++) {
        for (let dy = -r; dy <= r && !found; dy++) {
          for (let dx = -r; dx <= r && !found; dx++) {
            const x = midX + dx;
            const y = midY + dy;
            if (reachable.has(`${x},${y}`)) found = true;
          }
        }
      }
      expect.soft(found, `zone "${name}" should be reachable from entrance`).toBe(true);
    }
  });

  it("has no tile grid row shorter than MAP_WIDTH", () => {
    for (const row of MAP_GRID) {
      expect(row.length).toBe(MAP_WIDTH);
    }
  });

  it("has exactly MAP_HEIGHT rows", () => {
    expect(MAP_GRID.length).toBe(MAP_HEIGHT);
  });
});
