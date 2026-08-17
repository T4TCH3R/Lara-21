import { describe, it, expect } from "vitest";
import { findNearestInteractable } from "../engine/interaction.js";

describe("findNearestInteractable", () => {
  const player = { tileX: 5, tileY: 5 };

  it("returns null when nothing is nearby", () => {
    const items = [{ id: "far", tileX: 20, tileY: 20 }];
    expect(findNearestInteractable(player, items)).toBeNull();
  });

  it("finds an adjacent interactable", () => {
    const items = [{ id: "sign", tileX: 5, tileY: 6 }];
    expect(findNearestInteractable(player, items).id).toBe("sign");
  });

  it("prefers the closest of several in range", () => {
    const items = [
      { id: "near", tileX: 5, tileY: 6 },
      { id: "same-tile", tileX: 5, tileY: 5 },
      { id: "far", tileX: 20, tileY: 20 },
    ];
    expect(findNearestInteractable(player, items).id).toBe("same-tile");
  });

  it("ignores interactables out of range", () => {
    const items = [{ id: "too-far", tileX: 9, tileY: 9 }];
    expect(findNearestInteractable(player, items)).toBeNull();
  });
});
