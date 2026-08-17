import { describe, it, expect } from "vitest";
import {
  createProgress,
  withMemoryFound,
  withSecretFound,
  withGiftRevealed,
  hasMemory,
  hasSecret,
} from "../engine/progress.js";

describe("progress tracker", () => {
  it("starts empty", () => {
    const p = createProgress();
    expect(p.memories).toEqual([]);
    expect(p.secrets).toEqual([]);
    expect(p.gifts).toEqual([]);
  });

  it("records a found memory without mutating the original", () => {
    const p1 = createProgress();
    const p2 = withMemoryFound(p1, 3);
    expect(hasMemory(p1, 3)).toBe(false);
    expect(hasMemory(p2, 3)).toBe(true);
  });

  it("does not duplicate an already-found memory", () => {
    let p = createProgress();
    p = withMemoryFound(p, 1);
    p = withMemoryFound(p, 1);
    expect(p.memories).toEqual([1]);
  });

  it("tracks secrets and gifts independently", () => {
    let p = createProgress();
    p = withSecretFound(p, "hidden_monkey");
    p = withGiftRevealed(p, "gift_soft");
    expect(hasSecret(p, "hidden_monkey")).toBe(true);
    expect(p.gifts).toEqual(["gift_soft"]);
  });
});
