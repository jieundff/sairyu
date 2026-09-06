import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      // Two entries: the editorial site at `/`, the shop at `/shop.html`.
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        shop: fileURLToPath(new URL("./shop.html", import.meta.url)),
      },
    },
  },
});
