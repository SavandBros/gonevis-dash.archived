/*global angular*/
'use strict'

/**
 * Authentication Interceptor Service
 *
 * @class AuthenticationInterceptorService
 * @namespace gonevisDash.AuthenticationInterceptorService
 * @param {Object} $window
 * @param {Object} ENV
 *
 */
function AuthenticationInterceptorService($window, ENV) {
  /**
   * request
   * Automatically attach Authorization header
   *
   * @method request
   * @param {Object} config
   * @memberOf gonevisDash.AuthenticationInterceptorService
   * @returns {Object}
   */
  function request(config) {
    var token = $window.localStorage['jwtToken']

    if (token) {
      if (config.url.indexOf(ENV.apiEndPoint === 0 && token)) {
        config.headers.Authorization = 'JWT ' + token
      }
    }

    return config
  }

  return {
    request: request
  }
}

app.factory('AuthenticationInterceptorService', AuthenticationInterceptorService)

AuthenticationInterceptorService.$inject = ['$window', 'ENV']
