"use strict";

/**
 * @class AuthInterceptorService
 *
 * @param $window
 * @param ENV
 */
function AuthInterceptorService($window, ENV) {

  /**
   * @method request
   * @desc Automatically attach Authorization header
   *
   * @param config {Object}
   *
   * @returns {Object}
   */
  function request(config) {
    var token = $window.localStorage.getItem("jwtToken");

    if (config.url.indexOf(ENV.apiEndpoint) === 0 && token) {
      config.headers.Authorization = "JWT " + token;
    }

    return config;
  }

  return {
    request: request
  };
}

app.factory("AuthInterceptorService", AuthInterceptorService);
AuthInterceptorService.$inject = [
  "$window",
  "ENV"
];
