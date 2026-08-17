export function createProgress() {
  return { memories: [], secrets: [], gifts: [] };
}

function withId(list, id) {
  return list.includes(id) ? list : [...list, id];
}

export function withMemoryFound(progress, id) {
  return { ...progress, memories: withId(progress.memories, id) };
}

export function withSecretFound(progress, id) {
  return { ...progress, secrets: withId(progress.secrets, id) };
}

export function withGiftRevealed(progress, id) {
  return { ...progress, gifts: withId(progress.gifts, id) };
}

export function hasMemory(progress, id) {
  return progress.memories.includes(id);
}

export function hasSecret(progress, id) {
  return progress.secrets.includes(id);
}
