import { useCallback, useEffect, useRef } from "react";
import { TILE_SIZE, VIEWPORT_TILES_W, VIEWPORT_TILES_H } from "../engine/constants.js";
import { MAP_WIDTH, MAP_HEIGHT, PLAYER_START, tileAt } from "../data/map.js";
import { createPlayer, stepPlayer, getPixelPosition } from "../engine/movement.js";
import { computeCamera } from "../engine/camera.js";
import { drawTile, drawPlayer, drawAnimal } from "../engine/renderer.js";
import { findNearestInteractable } from "../engine/interaction.js";
import { inputController } from "../engine/inputController.js";
import { useKeyboardControls } from "../hooks/useKeyboardControls.js";
import { audioManager } from "../engine/audio.js";

export const CANVAS_W = VIEWPORT_TILES_W * TILE_SIZE;
export const CANVAS_H = VIEWPORT_TILES_H * TILE_SIZE;

/**
 * The playable zoo. Owns the render loop and player movement; talks to
 * the rest of the app only through callback props so dialogue, HUD, and
 * progress tracking can live in plain React state above it.
 *
 * `interactables`: flat list of {id, tileX, tileY, blocking?, species?, render?}
 * `onInteract(item)`: fired when the player presses SPACE/ENTER near something
 * `onNearbyChange(item|null)`: fired when the closest interactable changes
 * `onPlayerMove(tileX, tileY)`: fired every frame with the player's tile
 * `inputDisabled`: true while a dialogue/menu/cutscene owns the keyboard
 */
export default function GameCanvas({
  interactables = [],
  onInteract,
  onNearbyChange,
  onPlayerMove,
  inputDisabled = false,
  children,
}) {
  const canvasRef = useRef(null);
  const playerRef = useRef(createPlayer(PLAYER_START.tileX, PLAYER_START.tileY));
  const rafRef = useRef(null);
  const lastTsRef = useRef(null);
  const nearbyRef = useRef(null);
  const interactablesRef = useRef(interactables);
  const inputDisabledRef = useRef(inputDisabled);

  interactablesRef.current = interactables;
  inputDisabledRef.current = inputDisabled;

  const handleInteract = useCallback(() => {
    if (inputDisabledRef.current) return;
    if (nearbyRef.current) onInteract && onInteract(nearbyRef.current);
  }, [onInteract]);

  useKeyboardControls(handleInteract, true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    function frame(ts) {
      const dt = lastTsRef.current ? ts - lastTsRef.current : 16;
      lastTsRef.current = ts;

      const disabled = inputDisabledRef.current;
      const currentInteractables = interactablesRef.current;
      const heldDir = disabled ? null : inputController.getDirection();
      const blocking = currentInteractables.filter((i) => i.blocking !== false);
      const wasMoving = playerRef.current.moving;
      playerRef.current = stepPlayer(playerRef.current, heldDir, blocking, dt);
      if (!wasMoving && playerRef.current.moving) audioManager.footstep();

      const pos = getPixelPosition(playerRef.current);
      const nearest = disabled ? null : findNearestInteractable(playerRef.current, currentInteractables);
      if (nearest?.id !== nearbyRef.current?.id) {
        nearbyRef.current = nearest;
        onNearbyChange && onNearbyChange(nearest);
      }
      onPlayerMove && onPlayerMove(playerRef.current.tileX, playerRef.current.tileY);

      const cam = computeCamera(pos.x + 0.5, pos.y + 0.5, MAP_WIDTH, MAP_HEIGHT, VIEWPORT_TILES_W, VIEWPORT_TILES_H);

      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      const startX = Math.floor(cam.x);
      const startY = Math.floor(cam.y);
      const endX = Math.ceil(cam.x + VIEWPORT_TILES_W);
      const endY = Math.ceil(cam.y + VIEWPORT_TILES_H);

      for (let y = startY; y < endY; y++) {
        for (let x = startX; x < endX; x++) {
          const sx = (x - cam.x) * TILE_SIZE;
          const sy = (y - cam.y) * TILE_SIZE;
          drawTile(ctx, tileAt(x, y), sx, sy, TILE_SIZE, x, y, ts);
        }
      }

      const sortedEntities = [...currentInteractables].sort((a, b) => a.tileY - b.tileY);
      for (const item of sortedEntities) {
        const sx = (item.tileX - cam.x) * TILE_SIZE;
        const sy = (item.tileY - cam.y) * TILE_SIZE;
        if (item.species) {
          drawAnimal(ctx, item.species, sx, sy, item.tileX * 3 + item.tileY, ts);
        } else if (item.render) {
          item.render(ctx, sx, sy, TILE_SIZE, ts);
        }
      }

      const playerSx = (pos.x - cam.x) * TILE_SIZE;
      const playerSy = (pos.y - cam.y) * TILE_SIZE;
      drawPlayer(ctx, playerRef.current, playerSx, playerSy);

      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [onNearbyChange, onPlayerMove]);

  return (
    <div className="game-viewport" style={{ aspectRatio: `${CANVAS_W} / ${CANVAS_H}` }}>
      <canvas ref={canvasRef} width={CANVAS_W} height={CANVAS_H} className="game-canvas" />
      {children}
    </div>
  );
}
