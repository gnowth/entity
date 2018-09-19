import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import path from 'path';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const dependencies = Object.keys(require('../package.json').dependencies)
  .concat(Object.keys(require('../package.json').devDependencies))

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/development.js',
      format: 'es',
    },
    external: dependencies,

    plugins: [
      babel({
        exclude: 'node_modules/**',
        include: '**/*',
        // include: [
        //   path.resolve(__dirname, '../'),
        //   '../',
        //   path.resolve(__dirname, '../../../packages'),
        // ],
      }),
      resolve({ extensions: ['.jsx'] }),
      commonjs({
        main: false,
        module: true
      }),
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

// "build": "lerna exec -- rollup -c=../../rollup.config.js",