import { useEffect, useState } from "react";

/**
 * Full-screen viewer for a collected memory — a photo or (for one memory)
 * a video. Missing files fall back to a tasteful placeholder instead of
 * a broken-media icon.
 */
export default function PhotoViewer({ memory, onClose }) {
  const [mediaError, setMediaError] = useState(false);
  const isVideo = memory?.type === "video";

  useEffect(() => {
    setMediaError(false);
  }, [memory]);

  useEffect(() => {
    if (!memory) return undefined;
    function handleKey(e) {
      // Let SPACE reach a focused <video> so it can toggle play/pause
      // natively — only ENTER/ESCAPE close the viewer in that case.
      if (e.code === "Space" && e.target?.tagName === "VIDEO") return;
      if (e.code === "Space" || e.code === "Enter" || e.code === "Escape") {
        e.preventDefault();
        onClose && onClose();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [memory, onClose]);

  if (!memory) return null;

  return (
    <div className="photo-backdrop" role="dialog" aria-modal="true" aria-label={memory.title}>
      <div className="photo-viewer pixel-panel">
        <div className="photo-frame">
          {mediaError ? (
            <div className="photo-placeholder">
              <span className="photo-placeholder-icon">{isVideo ? "🎬" : "📷"}</span>
              <p>{isVideo ? "Video komt binnenkort" : "Foto komt binnenkort"}</p>
            </div>
          ) : isVideo ? (
            <video
              src={memory.image}
              controls
              playsInline
              preload="metadata"
              onError={() => setMediaError(true)}
            />
          ) : (
            <img src={memory.image} alt={memory.title} onError={() => setMediaError(true)} />
          )}
        </div>
        <h3 className="photo-title">{memory.title}</h3>
        <p className="photo-caption">{memory.caption}</p>
        <button type="button" className="photo-close" onClick={onClose}>
          [SPATIE] Sluiten
        </button>
      </div>
    </div>
  );
}
