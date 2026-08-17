import { useEffect, useRef } from "react";
import { TILE, TILE_SIZE } from "../engine/constants.js";
import { drawTile, drawPlayer, drawAnimal } from "../engine/renderer.js";
import { createPlayer } from "../engine/movement.js";
import { birthdayConfig } from "../config/birthdayConfig.js";
import { audioManager } from "../engine/audio.js";

const SCENE_W = 11;
const SCENE_H = 7;
const CANVAS_W = SCENE_W * TILE_SIZE;
const CANVAS_H = SCENE_H * TILE_SIZE;

function beginWithSound(onStart) {
  // First user gesture in the game — safe place to unlock audio and try
  // to start optional background music (see /public/audio/README.md).
  audioManager.ensureContext();
  audioManager.initMusic(`${import.meta.env.BASE_URL}audio/bg-music.mp3`);
  audioManager.playMusic();
  audioManager.menuBlip();
  onStart();
}

export default function TitleScreen({ onStart }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    function handleKey(e) {
      if (e.code === "Enter" || e.code === "Space") {
        e.preventDefault();
        beginWithSound(onStart);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onStart]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    const player = createPlayer(5, 4, "down");
    let raf;

    function frame(ts) {
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
      for (let y = 0; y < SCENE_H; y++) {
        for (let x = 0; x < SCENE_W; x++) {
          const border = x === 0 || y === 0 || x === SCENE_W - 1 || y === SCENE_H - 1;
          drawTile(ctx, border ? TILE.TREE : TILE.GRASS, x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, x, y, ts);
        }
      }
      drawTile(ctx, TILE.FLOWER, 2 * TILE_SIZE, 4 * TILE_SIZE, TILE_SIZE, 2, 4, ts);
      drawTile(ctx, TILE.FLOWER, 8 * TILE_SIZE, 5 * TILE_SIZE, TILE_SIZE, 8, 5, ts);
      drawTile(ctx, TILE.PATH, 5 * TILE_SIZE, 5 * TILE_SIZE, TILE_SIZE, 5, 5, ts);
      drawAnimal(ctx, "monkey", 7 * TILE_SIZE, 2.4 * TILE_SIZE, 3, ts);
      const bob = Math.abs(Math.sin(ts / 500)) * 2;
      drawPlayer(ctx, player, 5 * TILE_SIZE, 4 * TILE_SIZE - bob);
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="title-screen" onClick={() => beginWithSound(onStart)} role="button" tabIndex={0}>
      <canvas ref={canvasRef} width={CANVAS_W} height={CANVAS_H} className="title-canvas" />
      <div className="title-overlay">
        <h1 className="title-heading">{birthdayConfig.title}</h1>
        <p className="title-subtitle">{birthdayConfig.subtitle}</p>
        <p className="title-prompt">Druk op ENTER om te beginnen</p>
      </div>
    </div>
  );
}
