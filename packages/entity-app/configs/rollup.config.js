import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/index.jsx',
  output: {
    file: 'dist/entity-app.development.jsx',
    format: 'cjs',
  },

  plugins: [
    babel({}),
    resolve({
      extensions: ['.mjs', '.js', '.jsx', '.json'],
    }),
  ],
};
