'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const AnalyzeWebpackPlugin = require('analyze-webpack-plugin').default;
const merge = require('webpack-merge');
const webpackBase = require('./webpack.config.base');
const paths = require('./paths');

const devConfig = merge(
  {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: [
      `${require.resolve('webpack-dev-server/client')}?/`,
      require.resolve('webpack/hot/dev-server'),
      paths.appIndexJs,
    ],
    output: {
      filename: 'static/js/bundle.js',
      chunkFilename: 'static/js/[name].chunk.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        inject: true,
        template: paths.appHtml,
      }),
      // This is necessary to emit hot updates (currently CSS only):
      new webpack.HotModuleReplacementPlugin(),
      // 防止大小写错误
      new CaseSensitivePathsPlugin(),
      new AnalyzeWebpackPlugin(), // 输入 http://localhost:port/analyze.html 查看相应信息，从而进行优化
    ],
    performance: {
      hints: false,
    },
  },
  webpackBase
);
module.exports = devConfig;
