import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.PAGES_BASE || "/",
  plugins: [react()],
  build: {
    ssr: "src/pages-entry-server.tsx",
    outDir: "pages-server",
    emptyOutDir: true,
    rollupOptions: { output: { entryFileNames: "render.mjs" } },
  },
});
