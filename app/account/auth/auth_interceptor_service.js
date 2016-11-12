"use strict";

/**
 * Auth Interceptor Service
 *
 * @class AuthInterceptorService
 * @namespace gonevisDash.AuthInterceptorService
 * @param {Object} $window
 * @param {Object} ENV
 *
 */
function AuthInterceptorService($window, ENV) {
  /**
   * request
   * Automatically attach Authorization header
   *
   * @method request
   * @param {Object} config
   * @memberOf gonevisDash.AuthInterceptorService
   * @returns {Object}
   */
  function request(config) {
    var token = $window.localStorage.getItem("jwtToken");

    if (token) {
      if (config.url.indexOf(ENV.apiEndPoint === 0 && token)) {
        config.headers.Authorization = "JWT " + token;
      }
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
