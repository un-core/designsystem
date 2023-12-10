// rollup.config.js
import typescript from "@rollup/plugin-typescript";

export default {
  input: "scripts/generateTypeDefinitions.ts",
  output: {
    dir: ".temp",
    format: "cjs",
  },
  external: ["path", "fs/promises", "fs", "react-docgen-typescript"],
  plugins: [
    typescript({
      tsconfig: "./scripts/tsconfig.json",
      exclude: ["src", "node_modules", "**/*.stories.tsx", "**/*.test.tsx"],
    }),
  ],
};
