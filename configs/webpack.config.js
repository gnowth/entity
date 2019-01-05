const _flatten = require('lodash/flatten');
const path = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');

const rules = require('./webpack-rules.config');
const alias = require('./alias.config');

const isBuild = process.env.npm_lifecycle_event === 'build';

module.exports = {
  module: { rules },

  devtool: 'cheap-source-map',

  resolve: {
    alias,
    extensions: ['.js', '.jsx'],
  },

  entry: {
    index: './src/index.jsx',
  },

  output: {
    path: path.join(__dirname, '../dist/'),
    filename: `[name]${isBuild ? '.[chunkhash]' : ''}.js`,
    chunkFilename: `[id]${isBuild ? '.[chunkhash]' : ''}.js`,
  },

  stats: {
    colors: true,
    reasons: true,
  },

  plugins: _flatten([
    // Common plugins
    [
      new ExtractTextPlugin('[name].[hash].css'),
      new HtmlWebpackPlugin({ template: 'assets/index.html' }),
    ],

    // Development plugins
    !isBuild && [
      new BrowserSyncPlugin(
        {
          host: 'localhost',
          port: 9000,
          proxy: 'localhost:8080/',
          open: false,
        },
        { reload: false } // eslint-disable-line comma-dangle
      ),
    ],

    // Build plugins
    isBuild && [
      new webpack.optimize.AggressiveMergingPlugin(),
      new OptimizeCssnanoPlugin({
        cssnanoOptions: {
          preset: ['default', {
            discardComments: { removeAll: true },
          }],
        },
      }),
    ],
  ]).filter(p => p),
};
