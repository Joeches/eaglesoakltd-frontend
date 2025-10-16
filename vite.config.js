import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode (development/production)
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    base: "/", // ✅ ensures correct asset paths on Netlify and local builds

    server: {
      watch: {
        ignored: [path.resolve(__dirname, "../backend")], // 🧠 prevents backend rebuild loops
      },
      strictPort: true,
      port: 5173,
    },

    build: {
      outDir: "dist", // ✅ Netlify serves from this folder
      emptyOutDir: true, // 🧹 cleans old build before new one
    },

    // ✅ make VITE_ env variables globally available
    define: {
      "process.env": env,
    },

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"), // 🧩 optional alias for cleaner imports
      },
    },
  };
});
