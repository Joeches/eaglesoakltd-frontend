import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: process.cwd(),
  plugins: [react()],
  server: {
    watch: {
      ignored: [path.resolve(__dirname, "../backend")],
    },
    strictPort: true,
  },
});
