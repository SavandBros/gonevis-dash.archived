'use strict';

// Modules
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
const ENV = process.env.npm_lifecycle_event;
const isTest = ENV === 'test' || ENV === 'test-watch';
const isProd = ENV === 'build';
const isDev = ENV === "server-dev";
const isStats = ENV === 'stats';
let devtool = 'eval-source-map';

let envFileName = function () {
  let envFileName = "staging";
  if (isProd){
    envFileName = "production";
  } else if (isTest || isDev) {
    envFileName = "dev";
  }

  return `./envs/${envFileName}.json`;
}();

/**
 * Devtool
 * Reference: http://webpack.github.io/docs/configuration.html#devtool
 * Type of sourcemap to use per build type
 */
if (isTest) {
  devtool = 'inline-source-map';
} else if (isProd) {
  devtool = 'source-map';
}

/**
 * Config
 * Reference: http://webpack.github.io/docs/configuration.html
 * This is the object where all configuration gets set
 */
module.exports = {
  mode: "development",
  cache: true,
  /**
   * Entry
   * Reference: http://webpack.github.io/docs/configuration.html#entry
   * Should be an empty object if it's generating a test build
   * Karma will set this when it's a test build
   */
  entry: isTest ? void 0 : {
    vendor: './src/app/vendor.js',
    app: './src/app/index.js'
  },

  /**
   * Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   * Should be an empty object if it's generating a test build
   * Karma will handle setting it up for you when it's a test build
   */
  output: {
    // Absolute output directory
    path: __dirname + '/dist',

    // Output path from the view of the page
    // Uses webpack-dev-server in development
    publicPath: isProd ? '/' : 'http://localhost:8080/',

    // Filename for entry points
    // Only adds hash in build mode
    filename: isProd ? '[name].[hash].js' : '[name].bundle.js',

    // Filename for non-entry points
    // Only adds hash in build mode
    chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
  },
  devtool: devtool,

  /**
   * Loaders
   * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
   * List: http://webpack.github.io/docs/list-of-loaders.html
   * This handles most of the magic responsible for converting modules
   */

  // Initialize module
  module: {
    rules: [{
      // JS LOADER
      // Reference: https://github.com/babel/babel-loader
      // Transpile .js files using babel-loader
      // Compiles ES6 and ES7 into ES5 code
      test: /\.(js|jsx)$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }, {
      // CSS LOADER
      // Reference: https://github.com/webpack/css-loader
      // Allow loading css through js
      //
      // Reference: https://github.com/postcss/postcss-loader
      // Postprocess your css with PostCSS plugins
      test: /\.css$/,
      // Reference: https://github.com/webpack-contrib/mini-css-extract-plugin
      // Extract css files in production builds
      //
      // Reference: https://github.com/webpack/style-loader
      // Use style-loader in development.
      use: [
        isTest ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
      ],
    }, {
      // ASSET LOADER
      // Reference: https://github.com/webpack/file-loader
      // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
      // Rename the file using the asset hash
      // Pass along the updated reference to your code
      // You can add here any file extension you want to get copied to your output
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
      use: 'file-loader'
    }, {
      // HTML LOADER
      // Reference: https://github.com/webpack/raw-loader
      // Allow loading html through js
      test: /\.html$/,
      use: 'raw-loader'
    }]
  },

  /**
   * PostCSS
   * Reference: https://github.com/postcss/autoprefixer-core
   * Add vendor prefixes to your css
   */
  // NOTE: This is now handled in the `postcss.config.js`
  //       webpack2 has some issues, making the config file necessary

  /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  plugins: [
    new webpack.LoaderOptionsPlugin({
      test: /\.scss$/i,
      options: {
        postcss: {
          plugins: [autoprefixer]
        }
      }
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
    new webpack.DefinePlugin({
      "GoNevisEnv": JSON.stringify(require(envFileName)),
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],

  /**
   * Dev server configuration
   * Reference: http://webpack.github.io/docs/configuration.html#devserver
   * Reference: http://webpack.github.io/docs/webpack-dev-server.html
   */
  devServer: {
    contentBase: './src/public',
    stats: 'minimal',
    watchContentBase: true,
    open: true,
    host: 'localhost'
  }
};


if (isStats) {
  module.exports.plugins.push(
    new BundleAnalyzerPlugin()
  );
}

// Add build specific plugins
if (isProd) {
  module.exports.mode = 'production';
  module.exports.optimization = {
    splitChunks: {
      chunks: "async",
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
            priority: -10
        },
      default: {
          minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps,
        exclude: /\/test/
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  };
  module.exports.plugins.push(
    // Copy assets from the public folder
    // Reference: https://github.com/kevlened/copy-webpack-plugin
    new CopyWebpackPlugin([{
      from: __dirname + '/src/public'
    }]),
  )
}

if (!isTest) {
  // Reference: https://github.com/ampedandwired/html-webpack-plugin
  // Render index.html
  module.exports.plugins.push(
    new HtmlWebpackPlugin({
      template: './src/public/index.html',
      inject: 'body'
    }),

    // Reference: https://github.com/webpack-contrib/mini-css-extract-plugin
    // Extract css files
    // Disabled when in test mode or not in build mode
    new MiniCssExtractPlugin({filename: 'css/[name].css', chunkFilename: "[id].css"})
  );
}
//
// ISTANBUL LOADER
// https://github.com/deepsweet/istanbul-instrumenter-loader
// Instrument JS files with istanbul-lib-instrument for subsequent code coverage reporting
// Skips node_modules and files that end with .spec.js
if (isTest) {
  module.exports.mode = 'development';

  module.exports.module.rules.push({
    enforce: 'pre',
    test: /\.js$/,
    exclude: [
      /node_modules/,
      /src\/test/
    ],
    loader: 'istanbul-instrumenter-loader',
    query: {
      esModules: true
    }
  });
}
