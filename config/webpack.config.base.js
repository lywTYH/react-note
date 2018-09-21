'use strict';

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getClientEnvironment = require('./env');
const paths = require('./paths');

const env = getClientEnvironment();

const devMode = env.stringified['process.env'].NODE_ENV !== '"production"';
const publicPath = devMode ? env.raw.PUBLIC_URL : '/';

const postCss = [
  {
    loader: require.resolve('css-loader'),
    options: {
      importLoaders: 1
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
const sassUse = [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, ...postCss, 'sass-loader'];
const lessUse = [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, ...postCss, 'less-loader'];

module.exports = {
  output: {
    path: paths.appBuild,
    pathinfo: true, // 告诉 webpack 在 bundle 中引入「所包含模块信息」的相关注
    publicPath,
    devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules].concat(
      // 设置寻找模块的先后机制
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      components: `${path.resolve(__dirname, '..')}/src/common/components`,
      container: `${path.resolve(__dirname, '..')}/src/common/container`,
      images: `${path.resolve(__dirname, '..')}/src/common/images`,
      pages: `${path.resolve(__dirname, '..')}/src/common/pages`,
      utils: `${path.resolve(__dirname, '..')}/src/common/utils`,
      data: `${path.resolve(__dirname, '..')}/src/server/data`,
      actions: `${path.resolve(__dirname, '..')}/src/common/actions`,
      reducers: `${path.resolve(__dirname, '..')}/src/common/reducers`,
      api: `${path.resolve(__dirname, '..')}/src/common/api`
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
    new InterpolateHtmlPlugin(env.raw),
    // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。作用没理解~
    // new webpack.NamedModulesPlugin(),
    // 区别开发模式和发布模式的全局变量
    new webpack.DefinePlugin(env.stringified),
    // 在 npm install 新的依赖后自动刷新
    // new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    // 优化 moment.js 库的体积，https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  module: {
    strictExportPresence: true,
    rules: [
      // 在 babel 解析前进行 eslint 校验
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve('eslint')
            },
            loader: require.resolve('eslint-loader')
          }
        ],
        include: paths.appSrc
      },

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
