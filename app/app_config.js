"use strict";

function Config($httpProvider, $resourceProvider, $cookiesProvider, $qProvider,
  cfpLoadingBarProvider, ChartJsProvider, RollbarProvider, ENV) {
  
  console.log("GoNevis Dash version: " + ENV.GONEVIS_CODE_VERSION);

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

  // Check localhost
  var localhost = (
    window.location.href.indexOf("localhost") > 0 || window.location.href.indexOf("127.0.0.1") > 0
  );

  // Rollbar integration
  if (!localhost) {
    RollbarProvider.init({
      accessToken: ENV.ROLLERBAR_TOKEN,
      captureUncaught: true,
      payload: {
        environment: ENV.name,
        client: {
          javascript: {
            source_map_enabled: true,
            code_version: ENV.GONEVIS_CODE_VERSION
          }
        }
      }
    });
  }
}

app.config(Config);
Config.$inject = [
  "$httpProvider",
  "$resourceProvider",
  "$cookiesProvider",
  "$qProvider",
  "cfpLoadingBarProvider",
  "ChartJsProvider",
  "RollbarProvider",
  "ENV"
];
