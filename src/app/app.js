require('jquery');

import angular from 'angular';
import ngAnimate from "angular-animate"
import ngMessages from "angular-messages"
import ngResource from "angular-resource"
import ngCookies from "angular-cookies"
import ngSanitize from "angular-sanitize"
import ngTagsInput from "ng-tags-input"
import ngFileUpload from "ng-file-upload"

require('angular-loading-bar');
require('angular-loading-bar/build/loading-bar.css');

require('angular-ui-router');
require('angular-ui-bootstrap');
require('angularjs-toaster');
require('angular-chart.js')
require('chart.js')
require('@uirouter/angularjs');
require('angular-xeditable');
require('angular-slugify');
require('angular-modal-service');
require('angular-medium-editor');
require('angular-sortable-view');
require('angular-local-storage');


const deps = [
  'ngAnimate',
  'ngMessages',
  'ngResource',
  'ngCookies',
  'ngSanitize',
  'ngTagsInput',
  'ngFileUpload',
  'ui.router',
  'ui.bootstrap',
  'chart.js',
  'xeditable',
  'slugifier',
  'angularModalService',
  'angular-medium-editor',
  'angular-sortable-view',
  'angular-loading-bar',
  'toaster',
  'LocalStorageModule'
];
const MODULE_NAME = 'gonevisDash';
const app = angular.module(MODULE_NAME, deps)
  .constant('Client', {version: 4})
  .constant('Utils', {
    texts: {
      noPermission: 'You do not have permission to perform this action.',
      unverifiedEmail: 'Your email is not verified.'
    }
  })
  .constant('ENV', {
    name: 'staging',
    apiEndpoint: 'http://draft.gonevis.com/api/v1/',
    SENTRY_DSN: 'https://4c24bb4af47748a8882052418c4ad175@sentry.io/199809'
  });

export default app;
