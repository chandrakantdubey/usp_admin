import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      sass: {
        includePaths: ["node_modules"],
      },
    },
  },
  resolve: {
    alias: {
      src: "/src",
      "~@ibm": "/node_modules/@ibm",
    },
  },
});
