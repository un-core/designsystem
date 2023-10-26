// rollup.config.js
import typescript from "@rollup/plugin-typescript";

export default {
  input: "generateTypeDefinitions/generateTypeDefinitions.ts",
  output: {
    dir: ".temp",
    format: "cjs",
  },
  plugins: [
    typescript({
      tsconfig: false,
      exclude: ["src"],
    }),
  ],
};
