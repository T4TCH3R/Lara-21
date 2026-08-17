import { TILE } from "../engine/constants.js";

// ============================================================
// THE ZOO MAP
// Built with small helper functions instead of hand-typed ASCII
// so zones stay easy to reason about and re-shape.
//
// Layout (north at top, south/entrance at bottom):
//   MONKEY RESERVE
//   RED PANDA  |  TIGERS
//   ZOO PLAZA
//   GORILLAVERBLIJF | CAPIBARA'S
//   ZOO ENTRANCE
// ============================================================

export const MAP_WIDTH = 21;
export const MAP_HEIGHT = 29;

function makeGrid(w, h, fill) {
  return Array.from({ length: h }, () => Array.from({ length: w }, () => fill));
}

function fillRect(grid, x1, y1, x2, y2, tile) {
  for (let y = y1; y <= y2; y++) {
    for (let x = x1; x <= x2; x++) {
      if (grid[y] && x >= 0 && x < grid[y].length) grid[y][x] = tile;
    }
  }
}

function strokeRect(grid, x1, y1, x2, y2, tile) {
  for (let x = x1; x <= x2; x++) {
    grid[y1][x] = tile;
    grid[y2][x] = tile;
  }
  for (let y = y1; y <= y2; y++) {
    grid[y][x1] = tile;
    grid[y][x2] = tile;
  }
}

function hGate(grid, y, xCenter, width, tile) {
  const half = Math.floor(width / 2);
  for (let x = xCenter - half; x <= xCenter + half; x++) {
    grid[y][x] = tile;
  }
}

function build() {
  const grid = makeGrid(MAP_WIDTH, MAP_HEIGHT, TILE.GRASS);

  // Outer border
  strokeRect(grid, 0, 0, MAP_WIDTH - 1, MAP_HEIGHT - 1, TILE.TREE);

  // --- MONKEY RESERVE (y 1-6) ---
  fillRect(grid, 1, 1, 19, 6, TILE.GRASS);
  // scattered decoration, kept asymmetric on purpose
  [
    [3, 2], [4, 4], [16, 2], [17, 4], [7, 1], [13, 6],
  ].forEach(([x, y]) => (grid[y][x] = TILE.TREE));
  [[6, 3], [14, 3], [10, 2], [5, 5]].forEach(([x, y]) => (grid[y][x] = TILE.FLOWER));

  // fence line separating reserve from mid zone, gate south
  fillRect(grid, 1, 7, 19, 7, TILE.FENCE);
  hGate(grid, 7, 10, 3, TILE.PATH);

  // buffer row
  fillRect(grid, 1, 8, 19, 8, TILE.GRASS);
  fillRect(grid, 9, 8, 11, 8, TILE.PATH);

  // --- RED PANDA (west) / TIGERS (east), y 9-14 ---
  fillRect(grid, 1, 9, 9, 14, TILE.GRASS);
  fillRect(grid, 11, 9, 19, 14, TILE.GRASS);
  strokeRect(grid, 1, 9, 9, 14, TILE.FENCE);
  strokeRect(grid, 11, 9, 19, 14, TILE.FENCE);
  hGate(grid, 9, 5, 3, TILE.PATH); // panda gate (north)
  hGate(grid, 9, 15, 3, TILE.PATH); // tiger gate (north)
  fillRect(grid, 2, 10, 8, 13, TILE.GRASS);
  fillRect(grid, 12, 10, 18, 13, TILE.GRASS);
  grid[11][4] = TILE.ROCK;
  grid[12][6] = TILE.ROCK;
  grid[11][16] = TILE.ROCK;
  grid[12][14] = TILE.ROCK;

  // central spine connecting reserve gate down through to plaza
  fillRect(grid, 10, 9, 10, 16, TILE.PATH);

  // fence closing bottom of panda/tiger row
  fillRect(grid, 1, 15, 19, 15, TILE.FENCE);
  hGate(grid, 15, 10, 3, TILE.PATH);

  fillRect(grid, 1, 16, 19, 16, TILE.GRASS);
  fillRect(grid, 9, 16, 11, 16, TILE.PATH);

  // --- ZOO PLAZA, y 17-21 ---
  fillRect(grid, 2, 17, 18, 21, TILE.PLAZA);
  fillRect(grid, 9, 18, 11, 19, TILE.WATER); // small pond
  grid[19][9] = TILE.WATER;
  [[4, 18], [16, 18], [4, 20], [16, 20]].forEach(([x, y]) => (grid[y][x] = TILE.FLOWER));
  grid[17][10] = TILE.SIGN; // plaza welcome sign
  grid[21][6] = TILE.BENCH;
  grid[21][14] = TILE.BENCH;

  // fence closing plaza bottom
  fillRect(grid, 1, 22, 19, 22, TILE.FENCE);
  hGate(grid, 22, 10, 3, TILE.PATH);

  fillRect(grid, 1, 23, 19, 23, TILE.GRASS);
  fillRect(grid, 9, 23, 11, 23, TILE.PATH);

  // --- GORILLAVERBLIJF (west) / CAPIBARA'S (east), y 24-27 ---
  fillRect(grid, 1, 24, 9, 27, TILE.TALLGRASS);
  fillRect(grid, 11, 24, 19, 27, TILE.GRASS);
  strokeRect(grid, 1, 24, 9, 27, TILE.FENCE);
  strokeRect(grid, 11, 24, 19, 27, TILE.FENCE);
  hGate(grid, 24, 5, 3, TILE.PATH);
  hGate(grid, 24, 15, 3, TILE.PATH);
  fillRect(grid, 2, 25, 8, 26, TILE.TALLGRASS);
  fillRect(grid, 12, 25, 18, 26, TILE.GRASS);
  fillRect(grid, 14, 26, 16, 26, TILE.WATER); // capybara mud pool

  // central spine to entrance
  fillRect(grid, 10, 22, 10, 27, TILE.PATH);

  // --- ZOO ENTRANCE, y 28 border row gap ---
  grid[MAP_HEIGHT - 1][9] = TILE.ENTRANCE;
  grid[MAP_HEIGHT - 1][10] = TILE.ENTRANCE;
  grid[MAP_HEIGHT - 1][11] = TILE.ENTRANCE;
  fillRect(grid, 9, 27, 11, 27, TILE.ENTRANCE);
  grid[26][9] = TILE.SIGN; // "ZOO ENTRANCE" sign — set into the fence beside the path, not on it

  return grid;
}

export const MAP_GRID = build();

export const PLAYER_START = { tileX: 10, tileY: 27 };

// Named zones — used to label areas and to place animals inside them
export const ZONES = {
  monkeyReserve: { x1: 1, y1: 1, x2: 19, y2: 6, label: "APENRESERVAAT" },
  redPanda: { x1: 2, y1: 10, x2: 8, y2: 13, label: "RODE PANDA VERBLIJF" },
  tigers: { x1: 12, y1: 10, x2: 18, y2: 13, label: "GROTE KATTEN RESERVAAT" },
  plaza: { x1: 2, y1: 17, x2: 18, y2: 21, label: "DIERENTUINPLEIN" },
  gorillas: { x1: 2, y1: 25, x2: 8, y2: 26, label: "GORILLAVERBLIJF" },
  capybaras: { x1: 12, y1: 25, x2: 18, y2: 26, label: "CAPIBARAHOEKJE" },
  entrance: { x1: 9, y1: 27, x2: 11, y2: 28, label: "DIERENTUIN INGANG" },
};

export function tileAt(x, y) {
  if (y < 0 || y >= MAP_GRID.length) return TILE.TREE;
  const row = MAP_GRID[y];
  if (x < 0 || x >= row.length) return TILE.TREE;
  return row[x];
}
