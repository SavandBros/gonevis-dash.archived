"use strict";

/**
 * @class AuthInterceptorService
 *
 * @param $rootScope
 * @param $cookies
 * @param $q
 * @param ENV
 */
function AuthInterceptorService($rootScope, $cookies, $q, ENV) {

  /**
   * @method request
   * @desc Automatically attach Authorization header
   *
   * @param config {Object}
   *
   * @returns {Object}
   */
  function request(config) {
    var token = $cookies.get("JWT");

    if (config.url.indexOf(ENV.apiEndpoint) === 0 && token) {
      config.headers.Authorization = "JWT " + token;
    }

    return config;
  }

  /**
   * @method responseError
   * @desc Handler for http response
   *
   * @param response {Object}
   *
   * @return {Object}
   */
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
  "$cookies",
  "$q",
  "ENV"
];
