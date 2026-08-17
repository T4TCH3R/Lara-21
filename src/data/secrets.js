// ============================================================
// SECRETS
// Hidden interactions that reward curiosity. `requiresMemories`, if set,
// hides the secret from the world until that many memories are found.
// ============================================================

export const SECRETS = [
  {
    id: "hidden_monkey",
    kind: "animal",
    species: "monkey",
    tileX: 13,
    tileY: 5,
    dialogueId: "secret_hidden_monkey",
    blocking: true,
  },
  {
    id: "joke_sign",
    kind: "icon",
    icon: "sign",
    tileX: 14,
    tileY: 17,
    dialogueId: "secret_joke_sign",
    blocking: true,
  },
  {
    id: "romantic_bench",
    kind: "scenery", // sits on an existing bench tile — no icon needed
    tileX: 6,
    tileY: 21,
    dialogueId: "secret_bench",
    blocking: false,
  },
  {
    id: "flower_clue",
    kind: "scenery", // sits on an existing flower tile — no icon needed
    tileX: 10,
    tileY: 2,
    dialogueId: "secret_flower",
    blocking: false,
  },
  {
    id: "memory_note",
    kind: "icon",
    icon: "note",
    tileX: 12,
    tileY: 19,
    dialogueId: "secret_unlock",
    blocking: false,
    requiresMemories: 4,
  },
  {
    id: "creator_message",
    kind: "icon",
    icon: "heart",
    tileX: 16,
    tileY: 23,
    dialogueId: "secret_creator",
    blocking: false,
  },
];
