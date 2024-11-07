import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
// import MonacoEditorPlugin from "vite-plugin-monaco-editor";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/client/", // 設置基礎路徑
  plugins: [
    vue(),
    // MonacoEditorPlugin({
    //   // 減少 languageWorkers 配置，以避免 worker 加載問題
    //   languageWorkers: ["css", "html", "javascript"],
    // }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "monaco-editor": path.resolve(__dirname, "node_modules/monaco-editor"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 移除手動拆分配置以讓 Vite 自動管理拆分
        },
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 4173,
  },
  optimizeDeps: {
    exclude: ["pdfjs-dist", "monaco-editor"],
  },
});
