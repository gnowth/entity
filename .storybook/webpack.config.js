const alias = require('../configs/alias.config');

module.exports = {
  resolve: {
    alias,
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /stories\.jsx?$/,
        loaders: [
          {
            loader: require.resolve('@storybook/addon-storysource/loader'),
          },
        ],
        enforce: 'pre',
      },

      {
        test: /\.(css)(\?.*)?$/,
        loaders: ['style-loader', 'css-loader'],
      },

      {
        test: /\.(png|gif|jpg|woff|svg|woff2|ttf|eot|otf)(\?.*)?$/,
        loader: 'file-loader',
      },
    ],
  },
};
