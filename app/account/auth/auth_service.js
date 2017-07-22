"use strict";

function AuthService($state, $rootScope, $cookies, $window, $stateParams, API, Account) {

  /**
   * @private
   */
  var self = this;

  /**
   * @desc Return the currently authenticated user
   *
   * @param {boolean} useInstance Return account instance or raw user data
   *
   * @returns {Account|boolean}
   */
  this.getAuthenticatedUser = function (useInstance) {
    if (!this.isAuthenticated()) {
      return false;
    }

    useInstance = useInstance || false;
    var userData = JSON.parse($cookies.get("user"));

    if (useInstance) {
      return new Account(userData);
    }

    return userData;
  };

  /**
   * @desc Parse JWT from token
   *
   * @param {string} token
   *
   * @returns {object}
   */
  this.parseJwt = function (token) {
    var base64Url = token.split(".")[1];

    if (typeof base64Url === "undefined") {
      $rootScope.$broadcast("gonevisDash.AuthService:SignedOut", true);
      return false;
    }

    var base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse($window.atob(base64));
  };

  /**
   * @desc Set token to localStorage
   *       Note: should be called before this.setAuthenticatedUser()
   *
   * @param {string} token
   */
  this.setToken = function (token) {
    $cookies.put("JWT", token);
  };

  /**
   * @desc Return token from localStorage
   *
   * @returns {string}
   */
  this.getToken = function () {
    return $cookies.get("JWT");
  };

  /**
   * @desc Set/update authenticated user data
   *       Note: should be called after this.setAuthenticatedUser
   *
   * @param {object} userData
   * @param {boolean} separateSites Set user data without effecting sites
   */
  this.setAuthenticatedUser = function (userData, separateSites) {
    // Separated sites
    if (separateSites) {
      userData.sites = self.getAuthenticatedUser(true).get.sites;
    }
    // Reverse sites so older comes first
    if (!$cookies.get("user")) {
      userData.sites = userData.sites.slice().reverse();
    }
    // Store authentication
    $cookies.put("user", JSON.stringify(userData));
    // Update tracking info
    self.setTrackingInfo();
    // Return account instance
    return self.getAuthenticatedUser(true);
  };

  /**
   * @desc Delete the cookie where the account object is stored
   */
  this.unAuthenticate = function () {
    $cookies.remove("JWT");
    $cookies.remove("user");
    $cookies.remove("sessionid");
    // Remove tracking info
    self.setTrackingInfo();
  };

  /**
   * @desc Check if the current user is authenticated
   * @returns {boolean}
   */
  this.isAuthenticated = function () {
    if ($state.current.auth === -1) {
      if (!$cookies.get("user")) {
        self.unAuthenticate();
      }
      return false;
    }

    var token = self.getToken();
    var isValid;

    if (token) {
      isValid = Math.round(new Date().getTime() / 1000) <= self.parseJwt(token).exp;
    } else {
      isValid = false;
    }

    if (!isValid) {
      self.unAuthenticate();
    }

    return isValid;
  };

  /**
   * @desc Main sign in function
   *
   * @param {string} username
   * @param {object|boolean} password
   * @param {function} success
   * @param {function} fail
   */
  this.signIn = function (username, password, success, fail) {
    API.Signin.post({
        username: username,
        password: password
      },
      function (data) {
        self.setToken(data.token);
        self.setAuthenticatedUser(data.user);
        $rootScope.$broadcast("gonevisDash.AuthService:Authenticated");
        success(data);
      },
      function (data) {
        fail(data);
      }
    );
  };

  /**
   * @desc Clear credentials (sign user out)
   */
  this.signOut = function () {
    self.unAuthenticate();
    $rootScope.$broadcast("gonevisDash.AuthService:SignedOut");
  };

  /**
   * @desc Check and return the ID of the current site
   *
   * @returns {string} Site UUID
   */
  this.getCurrentSite = function () {
    var sites = self.getAuthenticatedUser().sites;
    var siteIndex = $stateParams.s || 0;

    return sites[siteIndex] ? sites[siteIndex].id : false;
  };
}

app.service("AuthService", AuthService);
AuthService.$inject = [
  "$state",
  "$rootScope",
  "$cookies",
  "$window",
  "$stateParams",
  "API",
  "Account"
];
