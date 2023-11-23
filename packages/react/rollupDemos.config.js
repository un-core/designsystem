("use strict");

import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import packageJson from "./package.json";
import exportsAsStrings from "./scripts/rollup-plugin-exports-as-strings.js";

const baseConfig = {
  input: "./src/indexStories.ts",

  external: [
    ...Object.keys(packageJson.peerDependencies),
    ...Object.keys(packageJson.dependencies),
    "prop-types",
  ],

  plugins: [
    nodeResolve(),
    commonjs({
      include: /node_modules/,
    }),
    babel({
      babelrc: false,
      exclude: ["node_modules/**"],
      presets: [
        [
          "@babel/preset-env",
          {
            modules: false,
            targets: {
              browsers: ["extends browserslist-config-carbon"],
            },
          },
        ],
        "@babel/preset-react",
        "@babel/preset-typescript",
      ],
      plugins: [
        "dev-expression",
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-syntax-import-meta",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-export-namespace-from",
        "@babel/plugin-proposal-export-default-from",
      ],
      babelHelpers: "bundled",
    }),
  ],
};

const umdExternalDependencies = Object.keys(
  packageJson.peerDependencies
).filter((dependency) => dependency !== "carbon-components");

const umdBundleConfig = {
  input: baseConfig.input,
  treeshake: {
    propertyReadSideEffects: false,
    moduleSideEffects: "no-external",
  },
  //external: [...umdExternalDependencies, "prop-types"],
  external: baseConfig.external,
  output: {
    file: "../website/demoCode/es/index.js",
    format: "es",
    exports: "named",
    sourcemap: true,
  },
};

module.exports = [
  /*{
    ...umdBundleConfig,
    plugins: [
      ...baseConfig.plugins,
      replace({
        preventAssignment: true,
        "process.env.NODE_ENV": JSON.stringify("development"),
      }),
    ],
    output: {
      ...umdBundleConfig.output,
      format: "esm",
      file: "demo/es/index.js",
    },
  }, */
  {
    input: "src/indexStories.ts",
    output: {
      file: "../website/demoCode/dist/bundle.js",
      format: "esm",
    },
    plugins: [
      exportsAsStrings({
        include: /src\/.*\.tsx$/, // Adjust the pattern to target .ts files
      }),
    ],
  },
];
