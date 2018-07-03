"use strict";

import AuthInterceptorService from "./account/auth/auth_interceptor_service";
import Raven from "raven-js";


const Config = function($httpProvider, $resourceProvider, $cookiesProvider, $qProvider, $provide,
  cfpLoadingBarProvider, ENV, $translateProvider) {

  // Http
  $httpProvider.interceptors.push(AuthInterceptorService);

  // Resource
  $resourceProvider.defaults.stripTrailingSlashes = false;

  // Cookies
  $cookiesProvider.defaults.domain = location.hostname.split(location.hostname.split(".")[0]).join("");

  // Q
  $qProvider.errorOnUnhandledRejections(false);

  // CFP loading bar
  cfpLoadingBarProvider.includeSpinner = false;

  // Custom exception handler
  $provide.decorator("$exceptionHandler", ["$delegate", "$window", function($delegate) {
    // Check if in localhost/127.0.0.1 or not
    const localhost = (
      window.location.href.indexOf("localhost") > 0 ||
      window.location.href.indexOf("127.0.0.1") > 0
    );

    if (!localhost) {
      // Using RavenJS for exception logging.
      Raven.config(ENV.SENTRY_DSN).install();
      return function(exception, cause) {
        Raven.captureException(exception);
        $delegate(exception, cause);
      };
    } else {
      // Using AngularJS standard exception logging.
      return function(exception, cause) {
        $delegate(exception, cause);
      };
    }
  }]);

  // Translation
  $translateProvider.useSanitizeValueStrategy(null);
  $translateProvider.preferredLanguage("en");
  $translateProvider.useLocalStorage();
  $translateProvider.useStaticFilesLoader({
    prefix: "/languages/",
    suffix: ".json"
  });
};

angular.module("gonevisDash").config(Config);
Config.$inject = [
  "$httpProvider",
  "$resourceProvider",
  "$cookiesProvider",
  "$qProvider",
  "$provide",
  "cfpLoadingBarProvider",
  "ENV",
  "$translateProvider"
];
