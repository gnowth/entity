const ExtractTextPlugin = require('extract-text-webpack-plugin');
const babelConfig = require('../babel.config');

const isBuild = process.env.npm_lifecycle_event === 'build'
  || process.env.npm_lifecycle_event === 'deploy';

const extract = loaders => (
  isBuild
    ? ExtractTextPlugin.extract({ use: loaders.filter(x => x) })
    : loaders.filter(x => x)
);

module.exports = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules\/(?!(@gnowth)\/).*/,
    loader: 'babel-loader',
    options: babelConfig,
  },

  {
    test: /\.(css)(\?.*)?$/,
    use: extract([
      !isBuild && 'style-loader',
      {
        loader: 'css-loader',
        options: { minimize: isBuild },
      },
    ]),
  },

  {
    test: /\.(md)$/,
    loader: 'raw-loader',
  },

  {
    test: /\.(png|gif|jpg|woff|svg|woff2|ttf|eot)(\?.*)?$/,
    loader: 'file-loader',
  },

  {
    test: /\.(txt|ico)$/,
    use: [{
      loader: 'file-loader',
      options: { name: '[name].[ext]' },
    }],
  },
];
