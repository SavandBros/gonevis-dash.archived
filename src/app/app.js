/*global GoNevisEnv*/


const deps = [
  'ngAnimate',
  'ngMessages',
  'ngResource',
  'ngCookies',
  'ngSanitize',
  'ngTagsInput',
  'ngFileUpload',
  'ui.router',
  'oc.lazyLoad',
  'ui.bootstrap',
  'xeditable',
  'slugifier',
  'angularModalService',
  'angular-sortable-view',
  'angular-loading-bar',
  'toaster',
  'LocalStorageModule',
  'pascalprecht.translate'
];

const MODULE_NAME = 'gonevisDash';
const app = angular.module(MODULE_NAME, deps)
  .constant('Client', { version: 5 })
  .constant('Utils', {
    texts: {
      noPermission: 'You do not have permission to perform this action.',
      unverifiedEmail: 'Your email is not verified.'
    }
  })
  .constant('ENV', GoNevisEnv);

export default app;
