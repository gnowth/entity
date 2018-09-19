import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const dependencies = Object.keys(require('../package.json').dependencies)

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/development.js',
      format: 'es',
    },
    external: dependencies,

    plugins: [
      babel({ exclude: 'node_modules/**' }),
      resolve({ extensions: ['.jsx'] }),
      commonjs(),
    ],
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/production.min.js',
      format: 'es',
    },
    external: dependencies,

    plugins: [
      babel({ exclude: 'node_modules/**' }),
      resolve({ extensions: ['.jsx'] }),
      commonjs(),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      terser(),
    ],
  },
];
