import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import namedDirectory from 'rollup-plugin-named-directory';
import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const rootPath = process.cwd();

// eslint-disable-next-line import/no-dynamic-require
const pkg = require(path.join(rootPath, 'package.json'));
const dependencies = []
  .concat(pkg.dependencies ? Object.keys(pkg.dependencies) : [])
  .concat(pkg.devDependencies ? Object.keys(pkg.devDependencies) : [])
  .concat(pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : [])
  .filter(dependency => !dependency.startsWith('@private/'));

export default {
  external: dependencies,
  input: path.join(rootPath, 'src/index.js'),
  output: {
    file: pkg.module,
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
    terser(),
  ],
};
