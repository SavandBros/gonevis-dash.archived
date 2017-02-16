"use strict";

/**
 * @class Config
 *
 * @param $httpProvider
 * @param $resourceProvider
 * @param $cookiesProvider
 * @param cfpLoadingBarProvider
 * @param AnalyticsProvider
 */
function Config($httpProvider, $resourceProvider, $cookiesProvider, cfpLoadingBarProvider, AnalyticsProvider) {
  // Http
  $httpProvider.interceptors.push("AuthInterceptorService");

  // Resource
  $resourceProvider.defaults.stripTrailingSlashes = false;

  // Cookies
  $cookiesProvider.defaults.domain = location.hostname.split(location.hostname.split(".")[0]).join("");

  // CFP loading bar
  cfpLoadingBarProvider.includeSpinner = false;

  // Google Analytics
  AnalyticsProvider.setAccount("UA-58251754-3");
}

app.config(Config);
Config.$inject = [
  "$httpProvider",
  "$resourceProvider",
  "$cookiesProvider",
  "cfpLoadingBarProvider",
  "AnalyticsProvider"
];
