import { describe, it, expect } from "vitest";
import { createPlayer, stepPlayer, getPixelPosition } from "../engine/movement.js";
import { computeCamera } from "../engine/camera.js";
import { DIRECTIONS, MOVE_DURATION_MS } from "../engine/constants.js";
import { PLAYER_START } from "../data/map.js";

describe("createPlayer", () => {
  it("starts idle, facing down, at the given tile", () => {
    const p = createPlayer(5, 5);
    expect(p).toMatchObject({ tileX: 5, tileY: 5, fromX: 5, fromY: 5, dir: DIRECTIONS.DOWN, moving: false });
  });
});

describe("stepPlayer", () => {
  it("moves onto a walkable tile and starts a glide", () => {
    const p = createPlayer(PLAYER_START.tileX, PLAYER_START.tileY);
    const next = stepPlayer(p, DIRECTIONS.UP, [], 16);
    expect(next.moving).toBe(true);
    expect(next.tileY).toBe(PLAYER_START.tileY - 1);
    expect(next.fromY).toBe(PLAYER_START.tileY);
  });

  it("does not move into a fence, but does turn to face it", () => {
    // (0,0) neighbourhood is all border tree; step left from (1,1) hits tree at (0,1)
    const p = createPlayer(1, 1, DIRECTIONS.DOWN);
    const next = stepPlayer(p, DIRECTIONS.LEFT, [], 16);
    expect(next.moving).toBe(false);
    expect(next.dir).toBe(DIRECTIONS.LEFT);
    expect(next.tileX).toBe(1);
  });

  it("is blocked by a blocking entity even on walkable terrain", () => {
    const p = createPlayer(PLAYER_START.tileX, PLAYER_START.tileY);
    const blocker = { tileX: PLAYER_START.tileX, tileY: PLAYER_START.tileY - 1 };
    const next = stepPlayer(p, DIRECTIONS.UP, [blocker], 16);
    expect(next.moving).toBe(false);
  });

  it("completes the glide after MOVE_DURATION_MS and toggles frame", () => {
    let p = createPlayer(PLAYER_START.tileX, PLAYER_START.tileY);
    p = stepPlayer(p, DIRECTIONS.UP, [], 16);
    expect(p.moving).toBe(true);
    p = stepPlayer(p, DIRECTIONS.UP, [], MOVE_DURATION_MS);
    expect(p.moving).toBe(false);
    expect(p.frame).toBe(1);
    expect(p.fromY).toBe(p.tileY);
  });

  it("ignores new direction input while mid-glide", () => {
    let p = createPlayer(PLAYER_START.tileX, PLAYER_START.tileY);
    p = stepPlayer(p, DIRECTIONS.UP, [], 16);
    const midTileX = p.tileX;
    p = stepPlayer(p, DIRECTIONS.LEFT, [], 16);
    expect(p.tileX).toBe(midTileX);
    expect(p.moving).toBe(true);
  });
});

describe("getPixelPosition", () => {
  it("returns the resting tile position when idle", () => {
    const p = createPlayer(3, 4);
    expect(getPixelPosition(p)).toEqual({ x: 3, y: 4 });
  });

  it("interpolates halfway through a glide", () => {
    let p = createPlayer(PLAYER_START.tileX, PLAYER_START.tileY);
    p = stepPlayer(p, DIRECTIONS.UP, [], 0); // start the glide (known-walkable tile above entrance)
    p = stepPlayer(p, DIRECTIONS.UP, [], MOVE_DURATION_MS / 2); // advance it halfway
    const pos = getPixelPosition(p);
    expect(pos.y).toBeCloseTo(PLAYER_START.tileY - 0.5, 1);
    expect(pos.x).toBe(PLAYER_START.tileX);
  });
});

describe("computeCamera", () => {
  it("centers on the player away from edges", () => {
    const cam = computeCamera(10, 10, 21, 29, 11, 9);
    expect(cam).toEqual({ x: 4.5, y: 5.5 });
  });

  it("clamps at the top-left map edge", () => {
    const cam = computeCamera(0, 0, 21, 29, 11, 9);
    expect(cam).toEqual({ x: 0, y: 0 });
  });

  it("clamps at the bottom-right map edge", () => {
    const cam = computeCamera(20, 28, 21, 29, 11, 9);
    expect(cam).toEqual({ x: 10, y: 20 });
  });
});
