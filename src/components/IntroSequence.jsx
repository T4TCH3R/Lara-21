import { useEffect, useState } from "react";
import { birthdayConfig } from "../config/birthdayConfig.js";

export default function IntroSequence({ onComplete }) {
  const [index, setIndex] = useState(0);
  const lines = birthdayConfig.introLines;

  useEffect(() => {
    function handleKey(e) {
      if (e.code !== "Space" && e.code !== "Enter") return;
      e.preventDefault();
      if (index < lines.length - 1) {
        setIndex((i) => i + 1);
      } else {
        onComplete();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [index, lines.length, onComplete]);

  return (
    <div className="intro-sequence" onClick={() => (index < lines.length - 1 ? setIndex((i) => i + 1) : onComplete())}>
      <p className="intro-line">{lines[index]}</p>
      <p className="intro-prompt">▼ [SPATIE]</p>
    </div>
  );
}
