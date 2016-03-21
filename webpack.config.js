const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const bourbon = require('bourbon');
const bourbonNeat = require('bourbon-neat');

// Sass Options
const SASS_OPTIONS = {
  includePaths: [].concat(bourbon.includePaths, bourbonNeat.includePaths),
};

// TODO: Make a development version and a production version
module.exports = {
  debug: true,
  context: __dirname + '/src',
  entry: [
    'webpack-hot-middleware/client', // this module connects to the server to effect hot reloading
    './index',
  ],
  output: {
    path: path.join(__dirname, 'public'),
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
  devtool: 'source-map',

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
        loader: ['style', 'css'],
      },

      // Sass loader
      {
        test: /\.scss$/,
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
      },
    ],
  },

  sassLoader: SASS_OPTIONS,
};
