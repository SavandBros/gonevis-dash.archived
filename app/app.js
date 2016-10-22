"use strict";

/**
 * @ngdoc overview
 * @name gonevisDash
 * @description
 * # gonevisDash
 *
 * Main module of the application.
 */
app.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, $resourceProvider) {
  $httpProvider.interceptors.push("AuthInterceptorService");
  $resourceProvider.defaults.stripTrailingSlashes = false;
});

