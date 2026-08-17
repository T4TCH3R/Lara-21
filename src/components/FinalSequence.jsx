import { useEffect, useState } from "react";
import { birthdayConfig } from "../config/birthdayConfig.js";
import { audioManager } from "../engine/audio.js";
import Confetti from "./Confetti.jsx";

function ordinalNL(n) {
  return `${n}e`;
}

export default function FinalSequence() {
  const [index, setIndex] = useState(0);
  const [stage, setStage] = useState("lines");
  const lines = birthdayConfig.finalIntroLines;

  useEffect(() => {
    if (stage !== "lines") return undefined;
    function handleKey(e) {
      if (e.code !== "Space" && e.code !== "Enter") return;
      e.preventDefault();
      if (index < lines.length - 1) {
        setIndex((i) => i + 1);
      } else {
        setStage("message");
        audioManager.celebrate();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [stage, index, lines.length]);

  function handleLineClick() {
    if (index < lines.length - 1) {
      setIndex((i) => i + 1);
    } else {
      setStage("message");
      audioManager.celebrate();
    }
  }

  if (stage === "lines") {
    return (
      <div className="intro-sequence" onClick={handleLineClick}>
        <p className="intro-line">{lines[index]}</p>
        <p className="intro-prompt">▼ [SPATIE]</p>
      </div>
    );
  }

  return (
    <div className="final-sequence">
      <Confetti />
      <div className="final-content">
        <h1 className="final-heading">
          GEFELICITEERD MET JE {ordinalNL(birthdayConfig.age).toUpperCase()} VERJAARDAG, {birthdayConfig.name.toUpperCase()} ❤️
        </h1>
        <pre className="final-message">{birthdayConfig.finalMessage}</pre>
      </div>
    </div>
  );
}
