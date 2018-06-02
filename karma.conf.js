// Karma configuration
// Generated on 2016-06-11

const reporters = ['progress', 'coverage'];
var browsers = ['PhantomJS']; // for local builds

module.exports = function (config) {
  'use strict';

  config.set({
    frameworks: ['jasmine'],
    files: [
      'test/tests.webpack.js'
    ],
    preprocessors: {
      // Reference: http://webpack.github.io/docs/testing.html
      // Reference: https://github.com/webpack/karma-webpack
      // Convert files with webpack and load sourcemap
      'test/tests.webpack.js': ['webpack', 'babel', 'sourcemap', 'coverage']
    },
    browsers: browsers,
    reporters: reporters,
    coverageReporter: {
      reporters: [
        {type: 'text-summary'},
        {type: 'lcovonly', subdir: '.'},
        {type: 'json', subdir: '.'},
      ],
    },
    webpack: require('./webpack.config'),
    // Hide webpack build information from output
    webpackMiddleware: {
      noInfo: 'errors-only'
    },
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-coverage',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-spec-reporter',
      'karma-babel-preprocessor'
    ],
    singleRun: true,
    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO
  });
};
