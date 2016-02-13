const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname + '/src',
  entry: [
    'webpack-hot-middleware/client', // this module connects to the server to effect hot reloading
    './index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  plugins: [
    // These three plugins (Occurence [sic] Order, Hot Module Replacement, and No Errors) enable hot module replacement
    // via the webpack-hot-middleware package.
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.template.html',
      hash: true,
    }),
  ],

  module: {
    loaders: [
      // JS loader (uses Babel to transform ES2015 and JSX as well)
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        loaders: [
          'react-hot',
          'babel' + '?' + JSON.stringify({ presets: ['react', 'es2015'] }),
        ],
      },

      // Style/CSS loader
      {
        test: /\.css$/,
        loader: 'style!css',
      },

      // Bootstrap loader
      // **IMPORTANT** This is needed so that each bootstrap js file required by
      // bootstrap-webpack has access to the jQuery object
      { test: /bootstrap\/dist\/js\//, loader: 'imports?jQuery=jquery' },

      // Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
      // loads bootstrap's css.
      /* eslint-disable no-multi-spaces */
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: 'url?limit=10000&minetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,  loader: 'url?limit=10000&minetype=application/font-woff2' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: 'url?limit=10000&minetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: 'url?limit=10000&minetype=image/svg+xml' },
      /* eslint-enable no-multi-spaces */
    ],
  },
};
