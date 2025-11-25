/// <reference types="vitest/config" />

import react from "@vitejs/plugin-react";
import path from "path";
import preserveUseClientDirective from "rollup-plugin-preserve-use-client";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

import pkg from "./package.json" with { type: "json" };

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    preserveUseClientDirective(),
    dts({
      entryRoot: "src",
      outDir: "dist",
      tsconfigPath: path.resolve(dirname, "tsconfig.json"),
      exclude: [
        "**/*.stories.tsx",
        "**/*.stories.ts",
        "**/stories/**",
        "**/*.test.tsx",
        "**/*.test.ts",
        "**/__tests__/**",
        "**/*.spec.tsx",
        "**/*.spec.ts",
      ],
    }),
  ],
  build: {
    lib: {
      entry: {
        index: path.resolve(__dirname, "src/index.ts"),
        "utils/index": path.resolve(__dirname, "src/utils/index.ts"),
      },
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        ...Object.keys(pkg.peerDependencies || {}),
        "react/jsx-runtime",
        "tailwindcss/plugin",
      ],
      output: {
        assetFileNames: "index.css",
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].mjs", // preserves file names
      },
    },
    cssCodeSplit: false,
  },
  // test: {
  //   projects: [
  //     {
  //       extends: true,
  //       plugins: [
  //         storybookTest({
  //           configDir: path.join(dirname, ".storybook"),
  //         }),
  //       ],
  //       test: {
  //         name: "storybook",
  //         browser: {
  //           enabled: true,
  //           headless: true,
  //           provider: playwright({}),
  //           instances: [
  //             {
  //               browser: "chromium",
  //             },
  //           ],
  //         },
  //         setupFiles: [".storybook/vitest.setup.ts"],
  //       },
  //     },
  //   ],
  // },
});
