"use strict";

/**
 * @class Config
 *
 * @param $httpProvider
 * @param $resourceProvider
 * @param $cookiesProvider
 * @param $qProvider
 * @param cfpLoadingBarProvider
 * @param ChartJsProvider
 */
function Config($httpProvider, $resourceProvider, $cookiesProvider, $qProvider,
  cfpLoadingBarProvider, ChartJsProvider) {

  // Http
  $httpProvider.interceptors.push("AuthInterceptorService");

  // Resource
  $resourceProvider.defaults.stripTrailingSlashes = false;

  // Cookies
  $cookiesProvider.defaults.domain = location.hostname.split(location.hostname.split(".")[0]).join("");

  // Q
  $qProvider.errorOnUnhandledRejections(false);

  // CFP loading bar
  cfpLoadingBarProvider.includeSpinner = false;

  // Configure all charts
  ChartJsProvider.setOptions({
    chartColors: [
      "#99FF99",
      "#FFAA00",
      "#DDDDDD"
    ],
    elements: {
      arc: {
        borderWidth: 4
      }
    }
  });
}

app.config(Config);
Config.$inject = [
  "$httpProvider",
  "$resourceProvider",
  "$cookiesProvider",
  "$qProvider",
  "cfpLoadingBarProvider",
  "ChartJsProvider"
];
