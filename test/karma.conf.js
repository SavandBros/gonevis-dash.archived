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
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-aria/angular-aria.js',
      'bower_components/angular-material/angular-material.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-gettext/dist/angular-gettext.js',
      'bower_components/angular-ui-router-title/angular-ui-router-title.js',
      'bower_components/angular-xeditable/dist/js/xeditable.js',
      'bower_components/rangy/rangy-core.js',
      'bower_components/rangy/rangy-classapplier.js',
      'bower_components/rangy/rangy-highlighter.js',
      'bower_components/rangy/rangy-selectionsaverestore.js',
      'bower_components/rangy/rangy-serializer.js',
      'bower_components/rangy/rangy-textrange.js',
      'bower_components/textAngular/dist/textAngular.js',
      'bower_components/textAngular/dist/textAngular-sanitize.js',
      'bower_components/textAngular/dist/textAngularSetup.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/angular-modal-service/dst/angular-modal-service.js',
      'bower_components/ng-tags-input/ng-tags-input.js',
      'bower_components/ng-file-upload/ng-file-upload.js',
      'bower_components/angular-slugify/angular-slugify.js',
      'bower_components/angular-sortable-view/src/angular-sortable-view.js',
      'bower_components/angular-loading-bar/build/loading-bar.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      'app/app_module.js',
      'app/app_config.js',
      'app/app_run.js',
      'app/app_routes.js',
      'app/**/*.js',
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
