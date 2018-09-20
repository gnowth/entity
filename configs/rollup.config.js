// TODO use closure for minification
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import path from 'path';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const rootPath = process.cwd();

const packageFile = require(path.join(rootPath, 'package.json'));
const dependencies = []
  .concat(packageFile.dependencies ? Object.keys(packageFile.dependencies) : [])
  .concat(packageFile.peerDependencies ? Object.keys(packageFile.peerDependencies) : [])

export default [
  {
    amd: { id: process.env.LERNA_PACKAGE_NAME },
    external: dependencies,
    input: path.join(rootPath, 'src/index.js'),
    name: process.env.LERNA_PACKAGE_NAME,
    output: {
      file: path.join(rootPath, 'dist/development.js'),
      format: 'es',
    },
    plugins: [
      babel({
        configFile: '../../babel.config.js',
        exclude: 'node_modules/**',
      }),
      resolve({
        extensions: ['.jsx'],
        main: false,
        module: true,
      }),
      commonjs(),
    ],
    sourcemap: true,
  },

  {
    amd: { id: process.env.LERNA_PACKAGE_NAME },
    external: dependencies,
    input: path.join(rootPath, 'src/index.js'),
    name: process.env.LERNA_PACKAGE_NAME,
    output: {
      file: path.join(rootPath, 'dist/production.min.js'),
      format: 'es',
    },
    plugins: [
      babel({
        configFile: '../../babel.config.js',
        exclude: 'node_modules/**',
      }),
      resolve({
        extensions: ['.jsx'],
        main: false,
        module: true,
      }),
      commonjs(),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      terser(),
    ],
  },
]

// export default formats.map(format => ({
//   plugins: [
//     resolve({
//       main: false,
//       module: true,
//     }),
//     commonjs(),
//   ],
//   input: inputFile,
//   external: moduleNames,
//   name: LERNA_PACKAGE_NAME,
//   output: {
//     file: path.join(rootPath, 'dist', `index.${format}.js`),
//     format: 'es',
//   },
//   amd: {
//     id: LERNA_PACKAGE_NAME,
//   },
//   sourcemap: true,
// }));

// "build": "lerna exec -- rollup -c=../../rollup.config.js",
