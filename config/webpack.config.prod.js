'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const merge = require('webpack-merge');
const OptimizeCss = require('optimize-css-assets-webpack-plugin');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpackBase = require('./webpack.config.base');
const paths = require('./paths');

const webpackConfig = merge(
  {
    mode: 'production',
    // 当 webpack 遇到第一个错，标红抛出并中断运行
    bail: true,
    devtool: false,
    entry: [paths.appIndexJs],
    output: {
      filename: 'static/js/[name].[chunkhash:8].js',
      chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js'
    },
    optimization: {
      minimize: true,
      runtimeChunk: {
        name: 'manifest'
      },
      splitChunks: {
        cacheGroups: {
          commons: {
            chunks: 'initial',
            minChunks: 2,
            maxInitialRequests: 5, // The default limit is too small to showcase the effect
            minSize: 0 // This is example is too small to create commons chunks
          },
          vendor: {
            // 基础类库
            chunks: 'initial',
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            priority: 10,
            enforce: true
          }
        }
      }
    },
    plugins: [
      // minify css
      new OptimizeCss({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: true
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        inject: true,
        template: paths.appHtml,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
      }),
      // Generate a manifest file which contains a mapping of all asset filenames
      // to their corresponding output file so that tools can pick it up without
      // having to parse `index.html`.
      new ManifestPlugin({
        fileName: 'asset-manifest.json'
      }),
      // 生成一个能预缓存的 service worker，同时它能保持更新
      new SWPrecacheWebpackPlugin({
        // By default, a cache-busting query parameter is appended to requests
        // used to populate the caches, to ensure the responses are fresh.
        // cache-bust 跳过被 webpack hash 过的 url
        dontCacheBustUrlsMatching: /\.\w{8}\./,
        filename: 'service-worker.js',
        logger(message) {
          if (message.indexOf('Total precache size is') === 0) {
            return;
          }
          if (message.indexOf('Skipping static resource') === 0) {
            return;
          }
          console.log(message);
        },
        minify: true,
        // For unknown URLs, fallback to the index page
        navigateFallback: `${process.env.PUBLIC_URL}/index.html`,
        // Ignores URLs starting from /__ (useful for Firebase):
        // https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
        navigateFallbackWhitelist: [/^(?!\/__).*/],
        // Don't precache sourcemaps (they're large) and build asset manifest:
        staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
      }),
      new BundleAnalyzerPlugin()
    ]
  },
  webpackBase
);
module.exports = webpackConfig;
