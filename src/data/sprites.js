import { mirrorShapes } from "../engine/spriteRenderer.js";

// Shared palette used by the player sprite. Tweak freely.
export const PLAYER_PALETTE = {
  hair: "#c1272d",
  hairDark: "#7a1218",
  skin: "#e8b58a",
  skinDark: "#c98f63",
  shirt: "#201d1e",
  shirtDark: "#111011",
  pants: "#1c1a1b",
  boots: "#0d0c0c",
  belt: "#4a3626",
  badge: "#d9663f",
  eye: "#1a1512",
};

const DOWN_BASE = [
  [3, 0, 10, 3, "hair"],
  [2, 1, 1, 2, "hair"],
  [13, 1, 1, 2, "hair"],
  [5, 3, 6, 4, "skin"],
  [6, 5, 1, 1, "eye"],
  [9, 5, 1, 1, "eye"],
  [2, 3, 3, 5, "hair"], // long hair, left side past the shoulder
  [11, 3, 3, 5, "hair"], // long hair, right side past the shoulder
  [4, 7, 8, 4, "shirt"],
  [4, 7, 8, 1, "shirtDark"],
  [7, 8, 2, 1, "badge"],
  [3, 8, 1, 3, "skin"],
  [12, 8, 1, 3, "skin"],
  [4, 11, 8, 1, "belt"],
];

const UP_BASE = [
  [3, 0, 10, 4, "hair"],
  [2, 1, 1, 2, "hair"],
  [13, 1, 1, 2, "hair"],
  [3, 4, 10, 5, "hair"], // long hair cascading down the back — no gap before the shirt
  [4, 7, 8, 4, "shirt"],
  [4, 7, 8, 1, "shirtDark"],
  [3, 8, 1, 3, "skin"],
  [12, 8, 1, 3, "skin"],
  [4, 11, 8, 1, "belt"],
];

const RIGHT_BASE = [
  [4, 0, 8, 3, "hair"],
  [2, 1, 2, 7, "hairDark"], // long hair trailing down the back
  [6, 3, 5, 4, "skin"],
  [9, 5, 1, 1, "eye"],
  [5, 7, 7, 4, "shirt"],
  [5, 7, 7, 1, "shirtDark"],
  [8, 8, 2, 1, "badge"],
  [10, 8, 2, 3, "skin"],
  [5, 11, 7, 1, "belt"],
];

function legsIdle() {
  return [
    [5, 12, 3, 3, "pants"],
    [8, 12, 3, 3, "pants"],
    [5, 15, 3, 1, "boots"],
    [8, 15, 3, 1, "boots"],
  ];
}

function legsWalk() {
  return [
    [4, 12, 3, 3, "pants"],
    [9, 12, 3, 3, "pants"],
    [4, 15, 3, 1, "boots"],
    [9, 15, 3, 1, "boots"],
  ];
}

function sideLegsIdle() {
  return [
    [6, 12, 4, 3, "pants"],
    [6, 15, 4, 1, "boots"],
  ];
}

function sideLegsWalk() {
  return [
    [5, 12, 3, 3, "pants"],
    [8, 12, 3, 3, "pants"],
    [5, 15, 3, 1, "boots"],
    [8, 15, 3, 1, "boots"],
  ];
}

const DOWN_IDLE = [...DOWN_BASE, ...legsIdle()];
const DOWN_WALK = [...DOWN_BASE, ...legsWalk()];
const UP_IDLE = [...UP_BASE, ...legsIdle()];
const UP_WALK = [...UP_BASE, ...legsWalk()];
const RIGHT_IDLE = [...RIGHT_BASE, ...sideLegsIdle()];
const RIGHT_WALK = [...RIGHT_BASE, ...sideLegsWalk()];

export const PLAYER_SPRITES = {
  down: [DOWN_IDLE, DOWN_WALK],
  up: [UP_IDLE, UP_WALK],
  right: [RIGHT_IDLE, RIGHT_WALK],
  left: [mirrorShapes(RIGHT_IDLE), mirrorShapes(RIGHT_WALK)],
};
