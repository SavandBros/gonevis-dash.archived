"use strict";

function AuthInterceptorService($rootScope, $cookies, $q, ENV) {

  /**
   * @desc Automatically attach Authorization header
   *
   * @param {object} config
   *
   * @returns {object}
   */
  function request(config) {
    var token = $cookies.get("JWT");

    if (config.url.indexOf(ENV.apiEndpoint) === 0 && token) {
      config.headers.Authorization = "JWT " + token;
    }

    return config;
  }

  /**
   * @desc Handler for http response
   *
   * @param {object} response
   *
   * @return {object}
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
