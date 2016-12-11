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
function AppConfig($stateProvider, $urlRouterProvider, $httpProvider,
    $locationProvider, $resourceProvider, ngQuillConfigProvider) {

  $httpProvider.interceptors.push("AuthInterceptorService");
  $resourceProvider.defaults.stripTrailingSlashes = false;
  ngQuillConfigProvider.set();
}

AppConfig.$inject = [
  "$stateProvider",
  "$urlRouterProvider",
  "$httpProvider",
  "$locationProvider",
  "$resourceProvider",
  "ngQuillConfigProvider"
];
app.config(AppConfig);
