"use strict";

/**
 * @class app.config
 * @desc Main module of the application.
 *
 * @param $stateProvider
 * @param $urlRouterProvider
 * @param $httpProvider
 * @param $locationProvider
 * @param $resourceProvider
 */
app.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, $resourceProvider) {
  $httpProvider.interceptors.push("AuthInterceptorService");
  $resourceProvider.defaults.stripTrailingSlashes = false;
});
