import { defineConfig } from "vite";
import { resolve } from "path";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig({
  root: "src",
  envDir: __dirname,
  publicDir: "../public",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  plugins: [
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: "Ecommerce App",
        },
      },
    }),
  ],
});
