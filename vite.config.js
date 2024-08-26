import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import ViteMonacoPlugin from "vite-plugin-monaco-editor";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/client/",
  plugins: [
    vue(),
    // MonacoEditorPlugin({ languages: ['javascript', 'typescript', 'html', 'css', 'json'] })
    ViteMonacoPlugin({}),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173, // 确保端口是你想使用的端口
  },
  optimizeDeps: {
    exclude: ["pdfjs-dist"],
  },
  build: {
    rollupOptions: {
      external: ["vuetify"],
    },
  },
});
