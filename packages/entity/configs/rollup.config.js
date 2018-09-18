import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/entity.development.js',
    format: 'cjs',
  },

  plugins: [
    babel({}),
  ],
};
