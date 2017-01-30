"use strict";

/**
 * @class AuthInterceptorService
 *
 * @param $rootScope
 * @param $window
 * @param $q
 * @param ENV
 */
function AuthInterceptorService($rootScope, $window, $q, ENV) {

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

  function responseError(response) {
    if (response.status === 403) {
      $rootScope.$broadcast("gonevisDash.AuthService:SignedOut", true);
    }
    return $q.reject(response);
  }

  return {
    request: request,
    responseError: responseError
  };
}

app.factory("AuthInterceptorService", AuthInterceptorService);
AuthInterceptorService.$inject = [
  "$rootScope",
  "$window",
  "$q",
  "ENV"
];
