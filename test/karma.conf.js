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
    files: [
      'node_modules/jquery/dist/jquery.js',
      'node_modules/angular/angular.js',
      'node_modules/bootstrap/dist/js/bootstrap.js',
      'node_modules/angular-animate/angular-animate.js',
      'node_modules/angular-cookies/angular-cookies.js',
      'node_modules/angular-messages/angular-messages.js',
      'node_modules/angular-resource/angular-resource.js',
      'node_modules/angular-sanitize/angular-sanitize.js',
      'node_modules/angular-aria/angular-aria.js',
      'node_modules/angular-ui-router/release/angular-ui-router.js',
      'node_modules/angular-xeditable/dist/js/xeditable.js',
      'node_modules/rangy/lib/rangy-core.js',
      'node_modules/rangy/lib/rangy-classapplier.js',
      'node_modules/rangy/lib/rangy-highlighter.js',
      'node_modules/rangy/lib/rangy-selectionsaverestore.js',
      'node_modules/rangy/lib/rangy-serializer.js',
      'node_modules/rangy/lib/rangy-textrange.js',
      'node_modules/angular-bootstrap/ui-bootstrap-tpls.js',
      'node_modules/angular-modal-service/dst/angular-modal-service.js',
      'node_modules/ng-tags-input/build/ng-tags-input.js',
      'node_modules/ng-file-upload/dist/ng-file-upload.js',
      'node_modules/angular-slugify/angular-slugify.js',
      'node_modules/angular-sortable-view/src/angular-sortable-view.js',
      'node_modules/angular-loading-bar/build/loading-bar.js',
      'node_modules/angularjs-toaster/toaster.js',
      'node_modules/chart.js/dist/Chart.js',
      'node_modules/angular-chart.js/dist/angular-chart.js',
      'node_modules/raven-js/dist/raven.js',
      'node_modules/angular-local-storage/dist/angular-local-storage.js',
      'node_modules/angular-medium-editor/dist/angular-medium-editor.js',
      'app/app_module.js',
      'app/app_config.js',
      'app/app_run.js',
      'app/app_routes.js',
      'app/**/*.js',
      'test/spec/**/*.js'
    ],
    preprocessors: {
      'app/**/*.js': ['coverage']
    },
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
