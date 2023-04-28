import solid from "solid-start/vite";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: "127.0.0.1",
    port: 3000,
  },
  plugins: [solid({
    rootEntry: "/src/app/ui/root.tsx",
  })],
});
