import { useCallback, useRef } from "react";

// Virtual controls dispatch real KeyboardEvents so they flow through the
// exact same listeners as a physical keyboard (useKeyboardControls,
// DialogueBox, PhotoViewer) — one input path, no duplicated logic.
function dispatchKey(type, code) {
  window.dispatchEvent(new KeyboardEvent(type, { code, bubbles: true }));
}

export default function TouchControls() {
  const activeRef = useRef(new Set());

  const press = useCallback((code) => {
    if (activeRef.current.has(code)) return;
    activeRef.current.add(code);
    dispatchKey("keydown", code);
  }, []);

  const release = useCallback((code) => {
    if (!activeRef.current.has(code)) return;
    activeRef.current.delete(code);
    dispatchKey("keyup", code);
  }, []);

  function dpadButton(code, label, className) {
    return (
      <button
        type="button"
        className={`touch-btn ${className}`}
        onPointerDown={(e) => {
          e.preventDefault();
          press(code);
        }}
        onPointerUp={() => release(code)}
        onPointerLeave={() => release(code)}
        onPointerCancel={() => release(code)}
        aria-label={label}
      >
        {label}
      </button>
    );
  }

  return (
    <div className="touch-controls">
      <div className="touch-dpad">
        {dpadButton("ArrowUp", "▲", "touch-up")}
        {dpadButton("ArrowLeft", "◀", "touch-left")}
        {dpadButton("ArrowDown", "▼", "touch-down")}
        {dpadButton("ArrowRight", "▶", "touch-right")}
      </div>
      <button
        type="button"
        className="touch-btn touch-interact"
        onClick={() => dispatchKey("keydown", "Space")}
        aria-label="Interact"
      >
        A
      </button>
    </div>
  );
}
