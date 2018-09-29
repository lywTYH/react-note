'use strict';

const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const config = require('./webpack.config.dev');
const paths = require('./paths');

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '0.0.0.0';

module.exports = (proxy, allowedHost) => ({
  disableHostCheck: !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true',
  // 启用 gzip 压缩生成的文件.
  compress: true,
  clientLogLevel: 'none',
  contentBase: paths.appPublic,
  watchContentBase: true,
  hot: true,
  publicPath: config.output.publicPath,
  // WebpackDevServer is noisy by default so we emit custom message instead
  // by listening to the compiler events with `compiler.plugin` calls above.
  quiet: true,
  watchOptions: {
    ignored: /node_modules/
  },
  https: protocol === 'https',
  host,
  overlay: false,
  historyApiFallback: {
    disableDotRule: true
  },
  public: allowedHost,
  proxy,
  setup(app) {
    app.use(errorOverlayMiddleware());
    app.use(noopServiceWorkerMiddleware());
  }
});
