'use strict';

/**
 * @ngdoc overview
 * @name gonevisDash
 * @description
 * # gonevisDash
 *
 * Main module of the application.
 */
angular
  .module('gonevisDash', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngMaterial',
    'ui.router',
    'ui.router.title'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.interceptors.push('AuthenticationInterceptorService');

    $stateProvider
      .state('main', {
        url: '/',
        views: {
          content: {
            controller: 'MainController',
            templateUrl: 'main/main_view.html'
          }
        }
      });
    $urlRouterProvider.otherwise('/');
  });
