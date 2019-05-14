import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-copy';
import json from 'rollup-plugin-json';
import namedDirectory from 'rollup-plugin-named-directory';
import path from 'path';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const rootPath = process.cwd();

// eslint-disable-next-line import/no-dynamic-require
const packageFile = require(path.join(rootPath, 'package.json'));
const dependencies = []
  .concat(packageFile.dependencies ? Object.keys(packageFile.dependencies) : [])
  .concat(packageFile.devDependencies ? Object.keys(packageFile.devDependencies) : [])
  .concat(packageFile.peerDependencies ? Object.keys(packageFile.peerDependencies) : []);

export default [
  {
    external: dependencies,
    input: path.join(rootPath, 'src/index.js'),
    output: {
      file: path.join(rootPath, 'dist/development.js'),
      format: 'es',
      sourcemap: true,
    },
    plugins: [
      babel({
        configFile: path.join(__dirname, '../babel.config.js'),
        exclude: 'node_modules',
      }),
      json(),
      resolve({
        extensions: ['.jsx', '.json', '.ts', '.tsx'],
        main: false,
        module: true,
      }),
      namedDirectory({
        matchers: ['<dir>/index.js', '<dir>/index.jsx', '<dir>/<dir>.js', '<dir>/<dir>.jsx'],
      }),
      copy({ [path.join(__dirname, 'rollup-index.js')]: 'dist/index.js' }),
    ],
  },

  {
    external: dependencies,
    input: path.join(rootPath, 'src/index.js'),
    output: {
      file: path.join(rootPath, 'dist/production.min.js'),
      format: 'es',
    },
    plugins: [
      babel({
        configFile: path.join(__dirname, '../babel.config.js'),
        exclude: 'node_modules',
      }),
      json(),
      resolve({
        extensions: ['.jsx', '.json', '.ts', '.tsx'],
        main: false,
        module: true,
      }),
      namedDirectory({
        matchers: ['<dir>/index.js', '<dir>/index.jsx', '<dir>/<dir>.js', '<dir>/<dir>.jsx'],
      }),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      terser(),
    ],
  },
];
