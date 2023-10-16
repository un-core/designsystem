("use strict");

import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import stripBanner from "rollup-plugin-strip-banner";
// TODO; Check terser
import { terser } from "rollup-plugin-terser";
import packageJson from "./package.json";
import typescript from "@rollup/plugin-typescript";
// import preserveDirectives from "rollup-plugin-preserve-directives";

const baseConfig = {
  input: "./src/index.ts",
  onwarn(warning, warn) {
    if (warning.code !== "MODULE_LEVEL_DIRECTIVE") {
      warn(warning);
    }
  },
  external: [
    ...Object.keys(packageJson.peerDependencies),
    ...Object.keys(packageJson.dependencies),
    "prop-types",
  ],
  output: {
    preserveModules: true,
    dir: "dist",
    // file: "es/index.js",
    format: "es",
    exports: "named",
    sourcemap: true,
    banner: `/*
    * Rollup Library Starter
    * {@link https://github.com/mryechkin/rollup-library-starter}
    * @copyright Mykhaylo Ryechkin (@mryechkin)
    * @license MIT
    */
   'use client';`,
  },
  plugins: [
    nodeResolve(),
    //  preserveDirectives(),
    commonjs({
      include: /node_modules/,
    }),
    typescript({
      sourceMap: true,
      compilerOptions: {
        declaration: true,
      },
      exclude: ["**/__tests__", "**/*.test.ts", "**/*.stories.tsx"],
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
    //stripBanner(),
    terser({
      compress: { directives: false },
    }),
    // terser(),
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
  external: [...umdExternalDependencies, "prop-types"],
  output: {
    //preserveModules: true,
    dir: "dist",
    // file: "es/index.js",
    format: "es",
    exports: "named",
    sourcemap: true,
    banner: `/*
    * Rollup Library Starter
    * {@link https://github.com/mryechkin/rollup-library-starter}
    * @copyright Mykhaylo Ryechkin (@mryechkin)
    * @license MIT
    */
   'use client';`,
  },
  /*{
      name: 'WfpUiReact',
      format: 'umd',
      globals: {
        classnames: 'classNames',
        'prop-types': 'PropTypes',
        react: 'React',
        'react-dom': 'ReactDOM',
        //'@wfp/icons': 'WfpIcons',
      },
    },*/
};

module.exports = [
  /*{
    ...baseConfig,
    output: [
    
      {
        format: "cjs",
        file: "lib/index.js",
      },
    ],
  },*/

  // Generate the development UMD bundle:
  {
    ...baseConfig,
    plugins: [
      ...baseConfig.plugins,
      replace({
        preventAssignment: true,
        "process.env.NODE_ENV": JSON.stringify("development"),
      }),
    ],
    output: [
      {
        ...baseConfig.output,
        format: "esm",
        // dir: "dist",
        // file: "es/index.js",
      },
    ],
  },
  /*{
    ...baseConfig,
    plugins: [
      ...baseConfig.plugins,
      replace({
        preventAssignment: true,
        "process.env.NODE_ENV": JSON.stringify("development"),
      }),
    ],
    output: {
      ...baseConfig.output,
      //file: "umd/index.js",
      dir: "dist",
    },
  },*/

  // Generate the production UMD bundle:
  /*{
    ...umdBundleConfig,
    plugins: [
      ...baseConfig.plugins,
      replace({
        preventAssignment: true,
        "process.env.NODE_ENV": JSON.stringify("production"),
      }),
      terser(),
    ],
    output: {
      ...umdBundleConfig.output,
      dir: "umd",
      // file: "umd/index.min.js",
    },
  },*/
];
