import { useCallback, useState } from "react";

export const SCREENS = {
  TITLE: "title",
  INTRO: "intro",
  PLAYING: "playing",
  FINAL: "final",
};

export function useGameState() {
  const [screen, setScreen] = useState(SCREENS.TITLE);

  const start = useCallback(() => setScreen(SCREENS.INTRO), []);
  const finishIntro = useCallback(() => setScreen(SCREENS.PLAYING), []);
  const triggerFinal = useCallback(() => setScreen(SCREENS.FINAL), []);

  return { screen, start, finishIntro, triggerFinal };
}
