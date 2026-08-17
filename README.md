# Lara's 21st Adventure 🐒

A tiny handmade, Game-Boy-Color-inspired pixel adventure through a birthday
zoo — built as a 21st birthday gift. Runs entirely in the browser, no
backend, no database, no accounts.

## Running it locally

```bash
npm install
npm run dev
```

Open the printed `localhost` URL. Arrow keys / WASD to move, SPACE or
ENTER to interact, ENTER to advance the title/intro/dialogue screens.

Other useful commands:

```bash
npm test        # run the engine test suite (vitest)
npm run build   # production build into dist/
npm run preview # serve the production build locally
```

## Personalizing the game

Everything you're likely to want to change lives in a handful of data
files — you shouldn't need to touch the game engine itself.

| What to change | File |
| --- | --- |
| Names, title, intro lines, **the final birthday message** | `src/config/birthdayConfig.js` |
| Animal dialogue | `src/data/dialogue.js` |
| Where animals stand on the map | `src/data/animals.js` |
| Gift names & hints | `src/data/gifts.js` |
| Photos, captions, and where they appear | `src/data/memories.js` |
| Hidden secrets | `src/data/secrets.js` |
| Colors / theme | `src/styles/global.css` (the `:root` palette at the top) |
| The zoo map layout | `src/data/map.js` |

### Adding your own photos (and one video)

Drop files into `public/images/memories/` named `memory-01.jpg` through
`memory-07.jpg`, plus `memory-08.mp4` for the one video memory (see the
README in that folder — you can pick a different memory to be the video by
editing `src/data/memories.js`). Missing files show a tasteful placeholder
instead of breaking anything, so you can ship now and add media later.

### Writing the final message

Open `src/config/birthdayConfig.js` and edit `finalMessage` and
`partnerName`. This is the one part the game deliberately leaves blank —
write it yourself.

### Background music (optional)

Drop an MP3 named `bg-music.mp3` into `public/audio/`. No file needed —
the game's sound effects are all synthesized in the browser and work
fine without it. There's a 🔊/🔇 toggle in-game either way.

## Deploying to GitHub Pages

This repo is preconfigured to deploy at `https://T4TCH3R.github.io/Lara-21/`.

1. This repo is already named `Lara-21` on GitHub (if you ever rename it,
   update `base` in `vite.config.js` to match — case included).
2. In the repo settings, go to **Settings → Pages** and set **Source** to
   **GitHub Actions**.
3. Push to `main`. The included workflow (`.github/workflows/deploy.yml`)
   runs the test suite, builds the site, and deploys it automatically.
4. Your site will be live at `https://T4TCH3R.github.io/Lara-21/` a
   minute or two later.

You can also trigger a deploy manually from the **Actions** tab
(“Deploy to GitHub Pages” → **Run workflow**).

## Project structure

```
src/
  engine/     pure game logic (movement, collision, camera, dialogue,
              interaction, progress, audio, rendering) — mostly unit tested
  data/       all editable game content (map, animals, dialogue, gifts,
              memories, secrets, sprites)
  components/ React UI (game canvas, dialogue box, HUD, title/intro/final
              screens, photo viewer, touch controls)
  config/     birthdayConfig.js — the main personalization file
  styles/     global palette + pixel-styled UI CSS
public/
  images/memories/  your photos go here
  audio/             optional background music goes here
```

## Tech notes

React + Vite, HTML5 Canvas for the game world, vanilla CSS for UI
overlays. No external game engine, no backend, no analytics. The whole
thing ships as static files.
