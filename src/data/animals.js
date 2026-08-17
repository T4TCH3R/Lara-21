// ============================================================
// ANIMAL PLACEMENT
// Each entry is a stationary NPC on the map. `dialogueId` points into
// src/data/dialogue.js — edit the words there, not here.
// ============================================================

export const ANIMALS = [
  {
    id: "guide_monkey",
    species: "monkey",
    name: "Gids",
    tileX: 7,
    tileY: 23,
    dialogueId: "guide_monkey",
    blocking: false, // a helpful guide should never stand in your way
  },
  {
    id: "monkey_1",
    species: "monkey",
    name: "Aap",
    tileX: 9,
    tileY: 3,
    dialogueId: "monkey_1",
  },
  {
    id: "monkey_2",
    species: "monkey",
    name: "Aap",
    tileX: 12,
    tileY: 2,
    dialogueId: "monkey_2",
  },
  {
    id: "monkey_special",
    species: "monkey",
    name: "???",
    tileX: 8,
    tileY: 5,
    dialogueId: "monkey_special",
    giftId: "gift_trip",
  },
  {
    id: "red_panda_1",
    species: "redPanda",
    name: "Rode Panda",
    tileX: 7,
    tileY: 11,
    dialogueId: "red_panda_1",
    giftId: "gift_soft",
  },
  {
    id: "tiger_1",
    species: "tiger",
    name: "Tijger",
    tileX: 17,
    tileY: 11,
    dialogueId: "tiger_1",
    giftId: "gift_big",
  },
  {
    id: "gorilla_1",
    species: "gorilla",
    name: "Gorilla",
    tileX: 3,
    tileY: 25,
    dialogueId: "gorilla_1",
  },
  {
    id: "gorilla_2",
    species: "gorilla",
    name: "Gorilla",
    tileX: 6,
    tileY: 26,
    dialogueId: "gorilla_2",
  },
  {
    id: "capybara_1",
    species: "capybara",
    name: "Capibara",
    tileX: 13,
    tileY: 25,
    dialogueId: "capybara_1",
    giftId: "gift_slow",
  },
  {
    id: "capybara_2",
    species: "capybara",
    name: "Capibara",
    tileX: 17,
    tileY: 25,
    dialogueId: "capybara_2",
  },
];
