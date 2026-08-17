import { useCallback, useMemo, useState } from "react";
import GameCanvas from "./components/GameCanvas.jsx";
import DialogueBox from "./components/DialogueBox.jsx";
import PhotoViewer from "./components/PhotoViewer.jsx";
import HUD from "./components/HUD.jsx";
import TitleScreen from "./components/TitleScreen.jsx";
import IntroSequence from "./components/IntroSequence.jsx";
import FinalSequence from "./components/FinalSequence.jsx";
import TouchControls from "./components/TouchControls.jsx";
import { useGameState, SCREENS } from "./hooks/useGameState.js";
import { ANIMALS } from "./data/animals.js";
import { DIALOGUE } from "./data/dialogue.js";
import { MEMORIES } from "./data/memories.js";
import { SECRETS } from "./data/secrets.js";
import { FINAL_GIFT } from "./data/finalArea.js";
import { drawMemoryIcon, drawNoteIcon, drawHeartIcon, drawSignIcon, drawGiftIcon } from "./engine/renderer.js";
import { createProgress, withMemoryFound, withGiftRevealed, withSecretFound } from "./engine/progress.js";
import { audioManager } from "./engine/audio.js";
import "./styles/pixel-ui.css";

const SECRET_ICON_RENDERERS = {
  note: drawNoteIcon,
  heart: drawHeartIcon,
  sign: (ctx, sx, sy, size) => drawSignIcon(ctx, sx, sy, size),
};

export default function App() {
  const { screen, start, finishIntro, triggerFinal } = useGameState();
  const [nearby, setNearby] = useState(null);
  const [activeItem, setActiveItem] = useState(null); // interactable currently showing dialogue
  const [activeMemory, setActiveMemory] = useState(null);
  const [progress, setProgress] = useState(createProgress());
  const [soundOn, setSoundOn] = useState(true);

  const memoryInteractables = useMemo(
    () =>
      MEMORIES.filter((m) => !progress.memories.includes(m.id)).map((m) => ({
        id: `memory-${m.id}`,
        tileX: m.tileX,
        tileY: m.tileY,
        blocking: false,
        type: "memory",
        memory: m,
        render: (ctx, sx, sy, size, t) => drawMemoryIcon(ctx, sx, sy, size, t, m.id, m.type === "video"),
      })),
    [progress.memories]
  );

  const secretInteractables = useMemo(
    () =>
      SECRETS.filter((s) => !s.requiresMemories || progress.memories.length >= s.requiresMemories).map((s) => {
        const base = {
          id: s.id,
          tileX: s.tileX,
          tileY: s.tileY,
          dialogueId: s.dialogueId,
          blocking: s.blocking,
          isSecret: true,
        };
        if (s.kind === "animal") return { ...base, species: s.species };
        if (s.kind === "icon") {
          const renderFn = SECRET_ICON_RENDERERS[s.icon];
          return { ...base, render: (ctx, sx, sy, size, t) => renderFn(ctx, sx, sy, size, t, s.tileX * 3 + s.tileY) };
        }
        return base; // scenery — relies on the existing bench/flower tile art
      }),
    [progress.memories]
  );

  const finalGiftInteractable = useMemo(
    () => ({
      id: FINAL_GIFT.id,
      tileX: FINAL_GIFT.tileX,
      tileY: FINAL_GIFT.tileY,
      blocking: true,
      isFinalGift: true,
      render: (ctx, sx, sy, size, t) => drawGiftIcon(ctx, sx, sy, size, t, 7),
    }),
    []
  );

  const interactables = useMemo(
    () => [...ANIMALS, ...memoryInteractables, ...secretInteractables, finalGiftInteractable],
    [memoryInteractables, secretInteractables, finalGiftInteractable]
  );

  const handleInteract = useCallback(
    (item) => {
      if (item.isFinalGift) {
        const unlocked = progress.gifts.length >= FINAL_GIFT.requiresGifts;
        if (unlocked) {
          triggerFinal();
        } else {
          setActiveItem({ id: "final_gift_locked", dialogueId: "final_locked" });
        }
        return;
      }
      audioManager.interact();
      if (item.type === "memory") {
        setActiveMemory(item.memory);
      } else if (item.dialogueId) {
        setActiveItem(item);
      }
    },
    [progress.gifts, triggerFinal]
  );

  const handleDialogueAdvance = useCallback(() => {
    setProgress((p) => {
      let next = p;
      if (activeItem?.giftId) next = withGiftRevealed(next, activeItem.giftId);
      if (activeItem?.isSecret) next = withSecretFound(next, activeItem.id);
      return next;
    });
    setActiveItem(null);
  }, [activeItem]);

  const handlePhotoClose = useCallback(() => {
    if (activeMemory) {
      setProgress((p) => withMemoryFound(p, activeMemory.id));
      audioManager.discover();
    }
    setActiveMemory(null);
  }, [activeMemory]);

  const activeDialogue = activeItem ? DIALOGUE[activeItem.dialogueId] : null;
  const inputDisabled = !!activeDialogue || !!activeMemory;

  if (screen === SCREENS.TITLE) {
    return <TitleScreen onStart={start} />;
  }

  if (screen === SCREENS.INTRO) {
    return <IntroSequence onComplete={finishIntro} />;
  }

  if (screen === SCREENS.FINAL) {
    return <FinalSequence />;
  }

  return (
    <div className="game-shell">
      <GameCanvas
        interactables={interactables}
        onInteract={handleInteract}
        onNearbyChange={setNearby}
        inputDisabled={inputDisabled}
      >
        <HUD
          found={progress.memories.length}
          total={MEMORIES.length}
          soundOn={soundOn}
          onToggleSound={() =>
            setSoundOn((s) => {
              const next = !s;
              audioManager.setEnabled(next);
              if (next) audioManager.menuBlip();
              return next;
            })
          }
        />
        {nearby && !inputDisabled && <div className="interact-prompt">[SPATIE] Praten</div>}
        {activeDialogue && <DialogueBox dialogue={activeDialogue} onAdvance={handleDialogueAdvance} />}
      </GameCanvas>
      <TouchControls />
      <PhotoViewer memory={activeMemory} onClose={handlePhotoClose} />
    </div>
  );
}
