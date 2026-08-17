// Tiny synthesized SFX (Web Audio oscillators — no audio files needed) plus
// optional background music support. Everything degrades gracefully:
// no AudioContext support, no music file, or sound disabled all just mean
// silence, never a crash.
class AudioManager {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.musicEl = null;
  }

  ensureContext() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      this.ctx = new AC();
    }
    if (this.ctx.state === "suspended") this.ctx.resume();
    return this.ctx;
  }

  setEnabled(value) {
    this.enabled = value;
    if (this.musicEl) {
      if (value) this.musicEl.play().catch(() => {});
      else this.musicEl.pause();
    }
  }

  tone(freq, duration = 0.08, type = "square", gain = 0.05) {
    if (!this.enabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    const now = ctx.currentTime;
    g.gain.setValueAtTime(gain, now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration);
  }

  footstep() {
    this.tone(170 + Math.random() * 20, 0.05, "square", 0.025);
  }

  menuBlip() {
    this.tone(520, 0.06, "square", 0.04);
  }

  typeTick() {
    this.tone(720, 0.015, "square", 0.015);
  }

  interact() {
    this.tone(660, 0.08, "triangle", 0.05);
  }

  discover() {
    [523, 659, 784].forEach((freq, i) => setTimeout(() => this.tone(freq, 0.1, "square", 0.05), i * 90));
  }

  celebrate() {
    [523, 659, 784, 1046].forEach((freq, i) => setTimeout(() => this.tone(freq, 0.2, "square", 0.05), i * 110));
  }

  initMusic(src) {
    if (this.musicEl) return;
    const el = new Audio(src);
    el.loop = true;
    el.volume = 0.35;
    el.addEventListener("error", () => {
      // No music file provided (or it failed to load) — perfectly fine,
      // the game works silently by default.
    });
    this.musicEl = el;
  }

  playMusic() {
    if (this.musicEl && this.enabled) this.musicEl.play().catch(() => {});
  }

  stopMusic() {
    if (this.musicEl) this.musicEl.pause();
  }
}

export const audioManager = new AudioManager();
