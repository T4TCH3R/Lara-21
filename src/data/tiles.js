// Visual palette per tile type. The renderer draws a base fill plus a
// couple of accent shapes per type — tweak colors here to re-theme tiles.
export const TILE_COLORS = {
  grass: { base: "#2f5233", accent: "#3d6a41" },
  tallgrass: { base: "#3a6b3f", accent: "#2d5330" },
  path: { base: "#c9b183", accent: "#b39c6b" },
  entrance: { base: "#d8c093", accent: "#c2a468" },
  plaza: { base: "#caa06a", accent: "#b98c53" },
  tree: { base: "#1c331f", trunk: "#4a3626", leaf: "#356b3a", leafDark: "#20431f" },
  water: { base: "#2a5c7d", wave: "#3a7ca5", foam: "#bfe3f0" },
  flower: { base: "#2f5233", petal: "#e6a5b8", petalAlt: "#f4ead2", center: "#d9663f" },
  rock: { base: "#6b6558", shadow: "#4a463c", highlight: "#8a8375" },
  fence: { base: "#6b4a34", dark: "#40301f", post: "#40301f" },
  bench: { base: "#6b4a34", seat: "#8a6a4a", dark: "#40301f" },
  sign: { base: "#8a6a4a", board: "#f4ead2", post: "#40301f", text: "#40301f" },
  wall: { base: "#6b4a34", dark: "#40301f" },
  door: { base: "#40301f", frame: "#6b4a34" },
  sand: { base: "#d8c093", accent: "#c2a468" },
};
