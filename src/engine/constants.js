export const TILE_SIZE = 32; // on-screen pixels per tile
export const SPRITE_GRID = 16; // virtual pixel grid each sprite is drawn on
export const SPRITE_SCALE = TILE_SIZE / SPRITE_GRID;

export const VIEWPORT_TILES_W = 11;
export const VIEWPORT_TILES_H = 9;

export const MOVE_DURATION_MS = 160; // time to glide one tile

export const DIRECTIONS = {
  UP: "up",
  DOWN: "down",
  LEFT: "left",
  RIGHT: "right",
};

export const DIR_DELTA = {
  [DIRECTIONS.UP]: { dx: 0, dy: -1 },
  [DIRECTIONS.DOWN]: { dx: 0, dy: 1 },
  [DIRECTIONS.LEFT]: { dx: -1, dy: 0 },
  [DIRECTIONS.RIGHT]: { dx: 1, dy: 0 },
};

export const TILE = {
  GRASS: "grass",
  TALLGRASS: "tallgrass",
  PATH: "path",
  TREE: "tree",
  WATER: "water",
  FLOWER: "flower",
  ROCK: "rock",
  FENCE: "fence",
  BENCH: "bench",
  SIGN: "sign",
  WALL: "wall",
  DOOR: "door",
  ENTRANCE: "entrance",
  PLAZA: "plaza",
  SAND: "sand",
};

export const WALKABLE_TILES = new Set([
  TILE.GRASS,
  TILE.TALLGRASS,
  TILE.PATH,
  TILE.FLOWER,
  TILE.ENTRANCE,
  TILE.PLAZA,
  TILE.DOOR,
  TILE.SAND,
]);
