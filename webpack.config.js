const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Sass options + asset build management (with Eyeglass)
const Eyeglass = require('eyeglass').Eyeglass;
const SASS_OPTIONS = {};

const eyeglass = new Eyeglass(SASS_OPTIONS);
// Assets will live in (src/)assets/*, be referenced in Sass with assets-url(*/...), and copied to public/*.
eyeglass.assets('assets/images', 'images', 'public/images');
eyeglass.assets('assets/fonts', 'fonts', 'public/fonts');

// TODO: Make a development version and a production version
module.exports = {
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

  // Options to pass to node-sass
  sassLoader: eyeglass.sassOptions(),
};
