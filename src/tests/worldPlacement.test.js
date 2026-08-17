import { describe, it, expect } from "vitest";
import { ANIMALS } from "../data/animals.js";
import { MEMORIES } from "../data/memories.js";
import { SECRETS } from "../data/secrets.js";
import { FINAL_GIFT } from "../data/finalArea.js";
import { isWalkable } from "../engine/collision.js";

const ALL_ENTITIES = [
  ...ANIMALS.map((a) => ({ id: a.id, x: a.tileX, y: a.tileY })),
  ...MEMORIES.map((m) => ({ id: `memory-${m.id}`, x: m.tileX, y: m.tileY })),
  ...SECRETS.map((s) => ({ id: s.id, x: s.tileX, y: s.tileY })),
  { id: FINAL_GIFT.id, x: FINAL_GIFT.tileX, y: FINAL_GIFT.tileY },
];

describe("world entity placement", () => {
  it("has no two entities sharing the same tile", () => {
    const seen = new Map();
    for (const e of ALL_ENTITIES) {
      const key = `${e.x},${e.y}`;
      const existing = seen.get(key);
      expect.soft(existing, `"${e.id}" collides with "${existing?.id}" at ${key}`).toBeUndefined();
      seen.set(key, e);
    }
  });

  // Scenery secrets that intentionally sit on already-blocking terrain
  // (e.g. a bench) — the player interacts with them from the adjacent
  // tile, same as a sign or an animal.
  const SITS_ON_BLOCKING_TERRAIN = new Set(["romantic_bench"]);

  it("places every non-scenery entity on a walkable tile", () => {
    for (const e of ALL_ENTITIES) {
      if (SITS_ON_BLOCKING_TERRAIN.has(e.id)) continue;
      expect.soft(isWalkable(e.x, e.y), `"${e.id}" is on a non-walkable tile at ${e.x},${e.y}`).toBe(true);
    }
  });

  it("has no duplicate entity ids", () => {
    const ids = ALL_ENTITIES.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
