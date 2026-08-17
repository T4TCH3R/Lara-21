export default function HUD({ found, total, soundOn, onToggleSound }) {
  return (
    <div className="hud">
      <div className="hud-memories pixel-panel">
        HERINNERINGEN: {found} / {total}
      </div>
      <button
        type="button"
        className="hud-sound pixel-panel"
        onClick={onToggleSound}
        aria-label={soundOn ? "Mute sound" : "Unmute sound"}
        aria-pressed={!soundOn}
      >
        {soundOn ? "🔊" : "🔇"}
      </button>
    </div>
  );
}
