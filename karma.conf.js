// Karma configuration
// Generated on 2016-06-11

const reporters = ['progress', 'coverage'];
const browsers = ['PhantomJS']; // for local builds
const webpack = require("./webpack.config");

module.exports = function (config) {
  'use strict';

  config.set({
    frameworks: ['jasmine'],
    files: [
      'test/tests.webpack.js'
    ],
    compressing: false,
    preprocessors: {
      'test/tests.webpack.js': ['coverage', 'webpack', 'sourcemap'],
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
    webpack,
    // Hide webpack build information from output
    webpackMiddleware: {
      noInfo: true,
      stats: "errors-only"
    },
    singleRun: true,
    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO
  });
};
