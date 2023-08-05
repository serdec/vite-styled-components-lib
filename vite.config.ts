import { resolve } from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsConfigPaths from "vite-tsconfig-paths";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    peerDepsExternal(),
    react({
      babel: {
        plugins: [["babel-plugin-styled-components", { displayName: false }]],

        env: {
          development: {
            plugins: [
              ["babel-plugin-styled-components", { displayName: true }],
            ],
          },
        },
      },
    }),
    tsConfigPaths(),
    dts({
      include: ["src/components/"],
    }),
  ],
  build: {
    lib: {
      entry: resolve("src", "components/index.ts"),
      name: "ReactViteLibrary",
      formats: ["es", "umd"],
      fileName: format => `react-vite-library.${format}.js`,
    },
    rollupOptions: {
      output: {
        interop: "auto",
      },
    },
  },
});
