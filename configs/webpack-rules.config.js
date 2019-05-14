const ExtractTextPlugin = require('extract-text-webpack-plugin');
const babelConfig = require('../babel.config');

const isBuild = process.env.npm_lifecycle_event === 'build';

const extract = loaders => (
  isBuild
    ? ExtractTextPlugin.extract({ use: loaders.filter(x => x) })
    : loaders.filter(x => x)
);

module.exports = [
  {
    test: /\.(js|jsx|ts|tsx)$/,
    exclude: /node_modules\/(?!(@burnsred|@private)\/).*/,
    loader: 'babel-loader',
    options: babelConfig,
  },

  {
    test: /\.(css)(\?.*)?$/,
    use: extract([
      !isBuild && 'style-loader',
      'css-loader',
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
