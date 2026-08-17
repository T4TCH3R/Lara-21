// A tiny singleton so keyboard AND on-screen touch controls can drive the
// same movement state without prop-drilling. There's only ever one game
// board on screen, so a module-level singleton is the simplest thing here.
const held = [];

export const inputController = {
  press(dir) {
    if (!held.includes(dir)) held.push(dir);
  },
  release(dir) {
    const i = held.indexOf(dir);
    if (i !== -1) held.splice(i, 1);
  },
  getDirection() {
    return held.length ? held[held.length - 1] : null;
  },
  reset() {
    held.length = 0;
  },
};
