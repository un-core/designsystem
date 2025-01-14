'use strict';

const { babel } = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { pascalCase } = require('change-case');
const fs = require('fs-extra');
const path = require('path');
const { rollup } = require('rollup');

async function bundle(
  entrypoint,
  options = { name: 'Icon', globals: undefined }
) {
  console.log('bundle rollup', entrypoint);
  const globals = options.globals ? formatGlobals(options.globals) : {};
  const { name } = options;
  const packageFolder = await findPackageFolder(entrypoint);

  const outputFolders = [
    {
      format: 'esm',
      directory: path.join(packageFolder, 'es'),
    },
    {
      format: 'umd',
      directory: path.join(packageFolder, 'umd'),
    },
  ];

  await Promise.all(outputFolders.map(({ directory }) => fs.remove(directory)));

  const jsEntryPoints = outputFolders.map(({ directory, format }) => ({
    file: path.join(directory, 'index.js'),
    format,
  }));

  const packageJsonPath = path.join(packageFolder, 'package.json');
  const packageJson = await fs.readJson(packageJsonPath);
  const { dependencies = {} } = packageJson;

  const bundle = await rollup({
    input: entrypoint,
    external: Object.keys(dependencies),
    plugins: [
      babel({
        exclude: 'node_modules/**',
        babelrc: false,
        presets: [
          [
            '@babel/preset-react',
            {
              modules: false,
              targets: {
                browsers: ['last 1 version', 'ie >= 11', 'Firefox ESR'],
              },
            },
          ],
        ],
        babelHelpers: 'bundled',
      }),
      nodeResolve(),
      commonjs({
        include: [/node_modules/],
        extensions: ['.js'],
      }),
    ],
  });

  await Promise.all(
    jsEntryPoints.map(({ format, file }) => {
      const outputOptions = {
        format,
        file,
        exports: 'auto',
        name: 'not used',
        globals: undefined,
      };

      if (format === 'umd') {
        outputOptions.name = name;
        outputOptions.globals = {
          ...formatDependenciesIntoGlobals(dependencies),
          ...globals,
        };
      }
      return bundle.write(outputOptions);
    })
  );
}

function formatGlobals(string) {
  const mappings = string.split(',').map((mapping) => {
    return mapping.split('=');
  });
  return mappings.reduce(
    (acc, [pkg, global]) => ({
      ...acc,
      [pkg]: global,
    }),
    {}
  );
}

function formatDependenciesIntoGlobals(dependencies) {
  return Object.keys(dependencies).reduce((acc, key) => {
    const parts = key.split('/').map((identifier, i) => {
      if (i === 0) {
        return identifier.replace(/@/, '');
      }
      return identifier;
    });

    return {
      ...acc,
      [key]: pascalCase(parts.join(' ')),
    };
  }, {});
}

async function findPackageFolder(entrypoint) {
  let packageFolder = entrypoint;

  while (packageFolder !== '/' && path.dirname(packageFolder) !== '/') {
    packageFolder = path.dirname(packageFolder);
    const packageJsonPath = path.join(packageFolder, 'package.json');

    if (await fs.pathExists(packageJsonPath)) {
      break;
    }
  }

  return packageFolder;
}

export default bundle;
