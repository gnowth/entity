const ExtractTextPlugin = require('extract-text-webpack-plugin');
const babelConfig = require('../babel.config');

const isBuild = process.env.npm_lifecycle_event === 'analyze'
  || process.env.npm_lifecycle_event === 'build'
  || process.env.npm_lifecycle_event === 'deploy'
  || process.env.npm_lifecycle_event === 'storybook:build';

const extract = loaders => (
  isBuild
    ? ExtractTextPlugin.extract({ use: loaders.filter(x => x) })
    : loaders.filter(x => x)
);

module.exports = [
  {
    exclude: [
      /node_modules/,
      // /packages\/(?!(dev|private)).*/,
    ],
    loader: 'babel-loader',
    options: babelConfig,
    test: /\.(js|jsx|ts|tsx)$/,
    // type: 'javascript/esm',
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
    loader: 'file-loader',
    test: /\.(png|gif|jpg|woff|svg|woff2|ttf|eot)(\?.*)?$/,
  },

  {
    test: /\.(txt|ico)$/,
    use: [{
      loader: 'file-loader',
      options: { name: '[name].[ext]' },
    }],
  },
];
