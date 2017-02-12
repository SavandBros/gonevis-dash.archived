"use strict";

/**
 * @class app.config
 * @desc Main module of the application.
 *
 * @param $httpProvider
 * @param $resourceProvider
 * @param cookiesProvider
 * @param cfpLoadingBarProvider
 */
app.config(function ($httpProvider, $resourceProvider, $cookiesProvider, cfpLoadingBarProvider) {
  $httpProvider.interceptors.push("AuthInterceptorService");

  $resourceProvider.defaults.stripTrailingSlashes = false;

  $cookiesProvider.defaults.domain = location.hostname.split(location.hostname.split(".")[0]).join("");

  cfpLoadingBarProvider.includeSpinner = false;
});
