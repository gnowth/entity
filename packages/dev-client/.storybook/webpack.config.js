const path = require('path');
const DirectoryNamedPlugin = require('directory-named-webpack-plugin');

const alias = require('../../../configs/webpack-alias.config');
const babelConfig = require('../../../babel.config');

module.exports = {
  resolve: {
    alias: alias(path.join(__dirname, '..')),
    extensions: ['.js', '.jsx'],
    plugins: [
      new DirectoryNamedPlugin(true),
    ],
  },

  module: {
    rules: [
      {
        test: /stories\.jsx?$/,
        loaders: [
          {
            loader: 'babel-loader',
            options: babelConfig,
          },
          {
            loader: require.resolve('@storybook/addon-storysource/loader'),
          },
        ],
        enforce: 'pre',
      },

      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules\/(?!(@apps|@entity|@gnowth|@private)\/).*/,
        loader: 'babel-loader',
        options: babelConfig,
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
