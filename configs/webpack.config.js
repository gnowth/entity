const _flatten = require('lodash/flatten');
const path = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer');
const DirectoryNamedPlugin = require('directory-named-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const rules = require('./webpack-rules.config');
const alias = require('./webpack-alias.config');

const isAnalyze = process.env.npm_lifecycle_event === 'analyze';
const isDeploy = process.env.npm_lifecycle_event === 'deploy';
const isBuild = process.env.npm_lifecycle_event === 'build' || isAnalyze || isDeploy;
const isStart = process.env.npm_lifecycle_event === 'start';

module.exports = {
  module: { rules },

  devtool: 'cheap-source-map',

  resolve: {
    alias: alias(path.join(process.cwd(), isBuild || isStart ? '' : 'packages/dev-client')),
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
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
    isBuild && [
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

    // Deploy plugins
    isDeploy && [
      new WorkboxPlugin.GenerateSW({
        exclude: [/\.(?:png|jpg|jpeg|svg)$/],

        runtimeCaching: [{
          urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images',
            expiration: { maxEntries: 10 },
          },
        }],
      }),
    ],
  ]).filter(p => p),
};
