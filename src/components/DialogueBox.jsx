import { useEffect, useRef, useState } from "react";
import { getPageText, isLastPage } from "../engine/dialogue.js";
import { audioManager } from "../engine/audio.js";

const TYPE_SPEED_MS = 22;

/**
 * Reusable RPG-style dialogue box. `dialogue` is a {speaker, pages} object
 * from src/data/dialogue.js. Calls `onAdvance` when the player presses
 * SPACE/ENTER past the last page (the caller decides what happens next —
 * close the box, trigger a gift reveal, chain to another dialogue, etc).
 */
export default function DialogueBox({ dialogue, onAdvance }) {
  const [pageIndex, setPageIndex] = useState(0);
  const [visibleChars, setVisibleChars] = useState(0);
  const intervalRef = useRef(null);

  const fullText = dialogue ? getPageText(dialogue, pageIndex) : "";
  const done = visibleChars >= fullText.length;

  useEffect(() => {
    setPageIndex(0);
    setVisibleChars(0);
  }, [dialogue]);

  useEffect(() => {
    setVisibleChars(0);
  }, [pageIndex]);

  useEffect(() => {
    if (!dialogue) return undefined;
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setVisibleChars((n) => {
        if (n >= fullText.length) {
          clearInterval(intervalRef.current);
          return n;
        }
        if (n % 2 === 0) audioManager.typeTick();
        return n + 1;
      });
    }, TYPE_SPEED_MS);
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogue, pageIndex, fullText]);

  useEffect(() => {
    if (!dialogue) return undefined;
    function handleKey(e) {
      if (e.code !== "Space" && e.code !== "Enter") return;
      e.preventDefault();
      audioManager.menuBlip();
      if (!done) {
        setVisibleChars(fullText.length);
        return;
      }
      if (isLastPage(dialogue, pageIndex)) {
        onAdvance && onAdvance();
      } else {
        setPageIndex((i) => i + 1);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [dialogue, pageIndex, done, fullText, onAdvance]);

  if (!dialogue) return null;

  return (
    <div className="dialogue-box pixel-panel" role="dialog" aria-live="polite">
      <div className="dialogue-speaker">{dialogue.speaker}</div>
      <div className="dialogue-text">{fullText.slice(0, visibleChars)}</div>
      <div className="dialogue-prompt">{done ? "▼ [SPATIE]" : ""}</div>
    </div>
  );
}
