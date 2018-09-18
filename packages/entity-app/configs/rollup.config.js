import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.jsx',
  output: {
    file: 'dist/entity-app.development.jsx',
    format: 'cjs',
  },

  plugins: [
    babel({}),
  ],
};
