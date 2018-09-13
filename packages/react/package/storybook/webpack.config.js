// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const alias = require('../alias.config');

module.exports = {
  resolve: {
    alias,
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.(css)(\?.*)?$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|gif|jpg|woff|svg|woff2|ttf|eot)(\?.*)?$/,
        loader: 'file-loader',
      },
    ],
  },
};
