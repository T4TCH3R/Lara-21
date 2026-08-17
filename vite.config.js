import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT: base must match your GitHub Pages repo name exactly (case
// included), e.g. https://T4TCH3R.github.io/Lara-21/ -> base: "/Lara-21/"
// If you rename the repo, update this value (and nothing else).
export default defineConfig({
  base: "/Lara-21/",
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
  },
});
