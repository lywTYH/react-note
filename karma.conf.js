// Karma configuration
// Generated on Thu Nov 23 2017 22:01:37 GMT+0800 (中国标准时间)

let path = require('path');
let webpack = require('webpack');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'test/*.js',
      'test/**/*.js',
      'test/**/*.jsx'
      // 'test/**/ReactComponentLifeCycle-test.jsx',
    ],


    // list of files to exclude
    exclude: [
    ],
    preprocessors: {
      'test/**/*.js': ['webpack'],
      'test/**/*.jsx': ['webpack']
    },
    reporters: ['progress'],
    port: 9876,
    webpack: {
      module: {
        /* Transpile source and test files */
        rules: [{
          test: /\.jsx?$/,
          use: 'babel-loader'
        }]
      }
    },
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: [],
    singleRun: false,
    concurrency: Infinity
  });
};
