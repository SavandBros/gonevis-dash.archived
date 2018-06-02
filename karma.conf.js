// Karma configuration
// Generated on 2016-06-11

const coverage_reporters = [
  { type: 'text-summary' }
];
const reporters = ['progress', 'coverage'];
var browsers = ['PhantomJS']; // for local builds

if (process.env.TRAVIS) {
  console.log('On Travis; pushing coverage reports');
  coverage_reporters.push( { type : 'lcov', dir : 'coverage' } );
  // reporters.push('coveralls');
} else {
  console.log('Not on Travis so not coverage reports');
  coverage_reporters.push( { type : 'html', dir : 'coverage', 'subdir' : '.' } );
}

module.exports = function(config) {
  'use strict';

  config.set({
    frameworks: ['jasmine'],
    files: [
      // 'src/app/index.js',
      'test/tests.webpack.js'
    ],
    preprocessors: {
      // Reference: http://webpack.github.io/docs/testing.html
      // Reference: https://github.com/webpack/karma-webpack
      // Convert files with webpack and load sourcemaps
      // 'src/app/index.js': ['webpack', 'babel'],
      // 'test/spec/**/*.js': ['webpack', 'babel', 'sourcemap', 'coverage'],
      'test/tests.webpack.js': ['webpack', 'babel', 'sourcemap', 'coverage']
    },
    browsers: browsers,
    reporters: reporters,
    coverageReporter: {
      reporters: coverage_reporters,
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
      'karma-babel-preprocessor',
      // 'karma-coveralls',
    ],
    singleRun: true,
    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO
  });
};
