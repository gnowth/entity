const _flatten = require('lodash/flatten');
const path = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer');
const DirectoryNamedPlugin = require('directory-named-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');

const rules = require('./webpack-rules.config');
const alias = require('./alias.config');

const isBuild = process.env.npm_lifecycle_event === 'build';
const isAnalyze = process.env.npm_lifecycle_event === 'analyze';

module.exports = {
  module: { rules },

  devtool: 'cheap-source-map',

  resolve: {
    alias,
    extensions: ['.js', '.jsx'],
    plugins: [
      new DirectoryNamedPlugin(true),
    ],
  },

  entry: {
    index: './src/index.jsx',
  },

  output: {
    path: path.join(__dirname, '../dist/'),
    filename: `[name]${isBuild ? '.[chunkhash]' : ''}.js`,
    chunkFilename: `[name]${isBuild ? '.[chunkhash]' : ''}.js`,
  },

  optimization: {
    sideEffects: true,

    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true,
        },
      },
    },
  },

  stats: {
    colors: true,
    reasons: true,
  },

  plugins: _flatten([
    // Common plugins
    [
      new ExtractTextPlugin('[name].[hash].css'),
      new HtmlPlugin({ template: 'assets/index.html' }),
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

    // Analyze plugins
    isAnalyze && [
      new BundleAnalyzerPlugin.BundleAnalyzerPlugin(),
    ],

    // Build plugins
    (isBuild || isAnalyze) && [
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en-au/),
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
