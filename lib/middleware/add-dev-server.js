const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const WEBPACK_CONFIG = require('../../webpack.config.js');

module.exports = function addDevServer(app) {
  const compiler = webpack(WEBPACK_CONFIG);
  const webpackDevMiddlewareWithCompiler = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: WEBPACK_CONFIG.output.publicPath,
    lazy: false,
    watchOptions: {
      poll: 2000,
      aggregateTimeout: 300,
    },
  });

  // Compile and emit files from webpack from memory, not the filesystem
  app.use(webpackDevMiddlewareWithCompiler);
  // Hot-reload any changed files using the dev middleware.
  app.use(webpackHotMiddleware(compiler));

  app.get('*', function serveFrontEndFromWebpackMiddleware(req, res) {
    req.url = '/'; // Always get the root HTML page; we'll deal with other URLs on the front end.
    webpackDevMiddlewareWithCompiler(req, res, () => { });
  });
};
