import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import includepaths from 'rollup-plugin-includepaths';
import path from 'path';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const dependencies = Object.keys(require('../package.json').dependencies)
  .concat(Object.keys(require('../package.json').peerDependencies))

console.log(path.resolve(__dirname, '../../../.babelrc'));
console.log('babel', path.resolve(__dirname, '../../../.babelrc'))
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
        configFile: path.resolve(__dirname, '../../../.babelrc'),
        // babelrc: false,
        // presets: [
        //   [
        //     '@babel/preset-env',
        //     {
        //       targets: {
        //         'edge': '17',
        //         'firefox': '60',
        //         'chrome': '67',
        //         'safari': '11.1'
        //       },
        //       useBuiltIns: 'usage'
        //     }
        //   ],
        //   '@babel/preset-react'
        // ],
        // plugins: [
        //   '@babel/plugin-proposal-class-properties',
        //   '@babel/plugin-proposal-optional-chaining',
        // ],
        exclude: 'node_modules/**',
        // include: '**/*',
        // include: [
        //   path.resolve(__dirname, '../../**'),
        //   path.resolve(__dirname, '../**'),
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
// higher order component is not being imported