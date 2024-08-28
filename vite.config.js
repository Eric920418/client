import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import MonacoEditorPlugin from "vite-plugin-monaco-editor";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/client/", // 设置基础路径
  plugins: [
    vue(),
    MonacoEditorPlugin({
      customWorkers: [
        {
          label: "editorWorkerService",
          entry: "monaco-editor/esm/vs/editor/editor.worker.js",
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 4173,
  },

  optimizeDeps: {
    exclude: ["pdfjs-dist"],
  },
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks: {
  //         // 將 Monaco Editor 的 Worker 分開打包
  //         "monaco-editor": ["monaco-editor"],
  //       },
  //     },
  //   },
  // },
});
