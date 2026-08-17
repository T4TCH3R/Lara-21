// Simple stacked-rect "pixel blob" critters on the same 16x16 grid as the
// player. Not meant to be zoological illustrations — just charming and
// instantly readable at tile size.

export const ANIMAL_PALETTES = {
  monkey: { fur: "#7a5a3a", furDark: "#4a3624", face: "#e0b98a", eye: "#16130f" },
  capybara: { fur: "#a68a5c", furDark: "#8a7048", face: "#c9ad78", eye: "#16130f" },
  redPanda: { fur: "#c1502e", furDark: "#8f3820", mask: "#f4ead2", eye: "#16130f", ring: "#40301f" },
  tiger: { fur: "#e08a2e", stripe: "#241a12", belly: "#f4ead2", eye: "#16130f" },
  gorilla: { fur: "#2b2b2b", furDark: "#141414", face: "#5c4a3a", back: "#6e6e68", eye: "#000000" },
};

export const ANIMAL_SHAPES = {
  monkey: [
    [4, 2, 2, 2, "furDark"],
    [10, 2, 2, 2, "furDark"],
    [5, 3, 6, 5, "fur"],
    [6, 5, 4, 3, "face"],
    [7, 6, 1, 1, "eye"],
    [9, 6, 1, 1, "eye"],
    [4, 8, 8, 5, "fur"],
    [7, 10, 2, 3, "face"],
    [12, 9, 3, 2, "fur"], // tail
    [14, 7, 2, 3, "fur"],
  ],
  capybara: [
    [3, 5, 2, 2, "furDark"],
    [11, 5, 2, 2, "furDark"],
    [2, 6, 12, 7, "fur"],
    [3, 8, 6, 4, "face"],
    [5, 9, 1, 1, "eye"],
    [4, 12, 2, 2, "furDark"],
    [10, 12, 2, 2, "furDark"],
  ],
  redPanda: [
    [3, 1, 2, 2, "furDark"],
    [11, 1, 2, 2, "furDark"],
    [4, 2, 8, 5, "fur"],
    [5, 4, 6, 3, "mask"],
    [6, 5, 1, 1, "eye"],
    [9, 5, 1, 1, "eye"],
    [3, 7, 10, 6, "fur"],
    [12, 8, 3, 2, "ring"],
    [14, 6, 2, 2, "fur"],
    [12, 4, 2, 2, "ring"],
  ],
  tiger: [
    [3, 2, 2, 2, "fur"],
    [11, 2, 2, 2, "fur"],
    [4, 3, 8, 6, "fur"],
    [5, 5, 1, 2, "stripe"],
    [10, 5, 1, 2, "stripe"],
    [6, 6, 1, 1, "eye"],
    [9, 6, 1, 1, "eye"],
    [3, 9, 10, 5, "fur"],
    [4, 10, 8, 3, "belly"],
    [5, 9, 1, 3, "stripe"],
    [8, 9, 1, 3, "stripe"],
    [13, 10, 3, 2, "fur"],
  ],
  gorilla: [
    [4, 1, 2, 2, "furDark"],
    [10, 1, 2, 2, "furDark"],
    [4, 2, 8, 4, "fur"],
    [5, 4, 6, 3, "face"],
    [6, 5, 1, 1, "eye"],
    [9, 5, 1, 1, "eye"],
    [3, 7, 10, 7, "fur"],
    [5, 8, 6, 4, "back"],
    [2, 9, 1, 3, "furDark"],
    [13, 9, 1, 3, "furDark"],
    [5, 12, 2, 3, "furDark"],
    [9, 12, 2, 3, "furDark"],
  ],
};
