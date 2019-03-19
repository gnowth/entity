const path = require('path');
const DirectoryNamedPlugin = require('directory-named-webpack-plugin');

const alias = require('../../../configs/webpack-alias.config');
const babelConfig = require('../../../babel.config');
const rules = require('../../../configs/webpack-rules.config');

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
      ...rules,

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
    ],
  },
};
