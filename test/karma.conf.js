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
    autoWatch: true,
    basePath: '../',
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      '.tmp/bundle.js',
      // 'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],
    preprocessors: {
      'app/**/*.js': ['coverage']
    },
    // list of files / patterns to exclude
    exclude: [],
    port: 8080,
    browsers: browsers,
    reporters: reporters,
    coverageReporter: {
      reporters: coverage_reporters,
    },
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-coverage'
      // 'karma-coveralls',
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO
  });
};
