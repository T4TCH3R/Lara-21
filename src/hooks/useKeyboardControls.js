import { useEffect } from "react";
import { DIRECTIONS } from "../engine/constants.js";
import { inputController } from "../engine/inputController.js";

const KEY_TO_DIR = {
  ArrowUp: DIRECTIONS.UP,
  KeyW: DIRECTIONS.UP,
  ArrowDown: DIRECTIONS.DOWN,
  KeyS: DIRECTIONS.DOWN,
  ArrowLeft: DIRECTIONS.LEFT,
  KeyA: DIRECTIONS.LEFT,
  ArrowRight: DIRECTIONS.RIGHT,
  KeyD: DIRECTIONS.RIGHT,
};

/**
 * Wires arrow keys / WASD to the shared inputController, and SPACE/ENTER
 * to `onInteract`. `enabled` lets a screen (dialogue, menus) suspend
 * movement input without unmounting the game.
 */
export function useKeyboardControls(onInteract, enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined;

    function handleKeyDown(e) {
      const dir = KEY_TO_DIR[e.code];
      if (dir) {
        e.preventDefault();
        inputController.press(dir);
        return;
      }
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        onInteract && onInteract();
      }
    }

    function handleKeyUp(e) {
      const dir = KEY_TO_DIR[e.code];
      if (dir) inputController.release(dir);
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      inputController.reset();
    };
  }, [onInteract, enabled]);
}
