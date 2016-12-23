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
 * @param cfpLoadingBarProvider
 */
app.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, $resourceProvider,
  cfpLoadingBarProvider) {

  // Http config
  $httpProvider.interceptors.push("AuthInterceptorService");
  $resourceProvider.defaults.stripTrailingSlashes = false;

  // Loading config
  cfpLoadingBarProvider.includeSpinner = false;
});
