"use strict";

/**
 * @class AuthService
 * @namespace gonevisDash.AuthService
 *
 * @param $state
 * @param $rootScope
 * @param $http
 * @param $window
 * @param $stateParams
 *
 * @returns [Factory]
 */
function AuthService($state, $rootScope, $http, $window, $stateParams) {
  /**
   * @method getAuthenticatedUser
   * @desc Return the currently authenticated user
   *
   * @returns {object|undefined}
   */
  function getAuthenticatedUser() {
    if ($window.localStorage.getItem("authenticatedUser")) {
      return JSON.parse($window.localStorage.getItem("authenticatedUser"));
    }
  }

  /**
   * @method parseJwt
   * @desc Parse JWT from token
   *
   * @param {String} token
   *
   * @returns {Object}
   */
  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace("-", "+").replace("_", "/");

    return JSON.parse($window.atob(base64));
  }

  /**
   * @method setToken
   * @desc Set token to localStorage
   *
   * @param {String} token
   */
  function setToken(token) {
    $window.localStorage.setItem("jwtToken", token);
  }

  /**
   * @method getToken
   * @desc Return token from localStorage
   *
   * @returns {String}
   */
  function getToken() {
    return $window.localStorage.getItem("jwtToken");
  }

  /**
   * @method setAuthenticatedUser
   * @desc Stringify the account object and store it in a cookie
   *
   * @param {Object} authenticatedUser
   */
  function setAuthenticatedUser(authenticatedUser) {
    $window.localStorage.setItem("authenticatedUser", JSON.stringify(authenticatedUser));
  }

  /**
   * Delete the cookie where the account object is stored
   *
   * @method unAuthenticate
   * @returns {undefined}
   * @memberOf gonevisDash.AuthService
   */
  function unAuthenticate() {
    $window.localStorage.removeItem("jwtToken");
    $window.localStorage.removeItem("authenticatedUser");
  }

  /**
   * @method isAuthenticated
   * @desc Check if the current user is authenticated
   *
   * @returns {boolean}
   */
  function isAuthenticated() {
    if ($state.current.auth === -1) {
      return false;
    }

    var token = getToken();
    var isValid;

    if (token) {
      isValid = Math.round(new Date().getTime() / 1000) <= parseJwt(token).exp;
    } else {
      isValid = false;
    }

    if (!isValid) {
      unAuthenticate();
    }

    return isValid;
  }

  /**
   * @method logout
   * @desc Clear credentials (log user out)
   */
  function logout() {
    unAuthenticate();
    $rootScope.$broadcast("gonevisDash.AuthService:SignedOut");
  }

  /**
   * @method updateAuth
   * @desc Update authentication data instantly
   *
   * @param {Object} updatedUser
   */
  function updateAuth(updatedUser) {
    $window.localStorage.setItem("authenticatedUser", JSON.stringify(updatedUser));
  }

  /**
   * @method getCurrentSite
   * @desc Check and return the ID of the current site
   *
   * @returns {String} Site id (uuid)
   */
  function getCurrentSite() {
    var sites = getAuthenticatedUser().sites;
    var siteIndex = $stateParams.s || 0;

    return sites[siteIndex] ? sites[siteIndex].id : false;
  }

  /**
   * @name AuthService
   * @desc The Factory to be returned
   */
  return {
    parseJwt: parseJwt,
    setToken: setToken,
    getToken: getToken,
    getAuthenticatedUser: getAuthenticatedUser,
    setAuthenticatedUser: setAuthenticatedUser,
    unAuthenticate: unAuthenticate,
    isAuthenticated: isAuthenticated,
    logout: logout,
    updateAuth: updateAuth,
    getCurrentSite: getCurrentSite
  };
}

app.factory("AuthService", AuthService);
AuthService.$inject = [
  "$state",
  "$rootScope",
  "$http",
  "$window",
  "$stateParams"
];