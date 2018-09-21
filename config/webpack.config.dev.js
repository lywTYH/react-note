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
      paths.appIndexJs
    ],
    output: {
      filename: 'static/js/bundle.js', // 这不是真实的文件，其仅仅是在开发环境下由 WebpackDevServer 提供的一个虚拟路径
      chunkFilename: 'static/js/[name].chunk.js' // 使用了 code splitting 后其它的 chunk 文件·
    },
    plugins: [
      // 这个插件允许我们在 index.html 中使用自定义变量
      // new InterpolateHtmlPlugin(env.raw),
      // 将 Webpack 打包生成的 bundles 插入 HTML 中 script 标签中
      new HtmlWebpackPlugin({
        filename: 'index.html',
        inject: true,
        template: paths.appHtml
      }),
      // This is necessary to emit hot updates (currently CSS only):
      new webpack.HotModuleReplacementPlugin(),
      // 防止大小写错误
      new CaseSensitivePathsPlugin(),
      new AnalyzeWebpackPlugin() // 输入 http://localhost:3000/analyze.html 查看相应信息，从而进行优化
    ],
    performance: {
      hints: false
    }
  },
  webpackBase
);
module.exports = devConfig;
