// TODO use closure for minification
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import copy from 'rollup-plugin-copy';
import path from 'path';
import postcss from 'rollup-plugin-postcss';
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
    external: dependencies,
    input: path.join(rootPath, 'src/index.js'),
    output: {
      file: path.join(rootPath, 'dist/development.js'),
      format: 'es',
      sourcemap: true,
    },
    plugins: [
      babel({
        configFile: '../../babel.config.js',
        exclude: ['node_modules', '*.css'],
      }),
      postcss({ extract: true }),
      resolve({
        extensions: ['.jsx'],
        main: false,
        module: true,
      }),
      commonjs(),
      copy({ '../../assets/index.js': 'dist/index.js' }),
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
        configFile: '../../babel.config.js',
        exclude: 'node_modules',
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
];
