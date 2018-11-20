'use strict';

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getClientEnvironment = require('./env');
const paths = require('./paths');

const env = getClientEnvironment();

const devMode = env.stringified['process.env'].NODE_ENV !== '"production"';

const postCss = [
  {
    loader: require.resolve('css-loader'),
    options: {
      modules: true,
      getLocalIdent: (context, localIdentName, localName) => {
        if (context.resourcePath.includes('node_modules')) {
          return localName;
        }
        const match = context.resourcePath.match(/src(.*)/);
        if (match && match[1]) {
          const stylePath = match[1].replace(/\.(sa|sc|c)ss$/, '');
          const arr = stylePath
            .split('/')
            .map(a => a.replace(/([A-Z])/g, '-$1'))
            .map(a => a.toLowerCase());
          return `admin${arr.join('-')}-${localName}`.replace(/--/g, '-');
        }
        return localName;
      }
    }
  },
  {
    loader: require.resolve('postcss-loader'),
    options: {
      ident: 'postcss',
      plugins: [
        autoprefixer({
          flexbox: 'no-2009'
        })
      ]
    }
  }
];
const sassUse = [
  devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
  ...postCss,
  'sass-loader'
];
const lessUse = [
  devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
  ...postCss,
  'less-loader'
];
module.exports = {
  output: {
    path: paths.appBuild,
    pathinfo: true,
    publicPath: env.raw.PUBLIC_URL,
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules].concat(
      // 设置寻找模块的先后机制
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, '..', 'src'),
      scss: path.resolve(__dirname, '..', 'src', 'scss')
    },
    plugins: [
      // 该插件把模块作用域限制在 src 和 node_module 中
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[chunkhash:8].css',
      chunkFilename: 'static/css/[name].[chunkhash:8].chunk.css'
    }),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
    // 区别开发模式和发布模式的全局变量
    new webpack.DefinePlugin(env.stringified),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  module: {
    strictExportPresence: true,
    rules: [
      // {
      //   test: /\.(js|jsx)$/,
      //   enforce: 'pre',
      //   use: [
      //     {
      //       options: {
      //         formatter: eslintFormatter,
      //         eslintPath: require.resolve('eslint')
      //       },
      //       loader: require.resolve('eslint-loader')
      //     }
      //   ],
      //   include: paths.appSrc
      // },
      {
        // 使用第一个规则匹配
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]'
            }
          },
          {
            test: /\.(js|jsx)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader')
          },
          {
            test: /\.(sa|sc|c)ss$/,
            use: sassUse
          },
          {
            test: /\.less$/,
            loaders: lessUse
          },
          // 如果还要加 loader，请加到 file-loader 之前
          {
            exclude: [/\.js$/, /\.html$/, /\.json$/, /\.less$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },

  // 将一些在浏览器不起作用，但是引用到的库置空
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
