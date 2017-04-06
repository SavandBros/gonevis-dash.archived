"use strict";

/**
 * @class SigninController
 * 
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $stateParams
 * @param AuthService
 * @param API
 * @param ModalsService
 * @param toaster
 */
function SigninController($scope, $rootScope, $state, $stateParams, AuthService, API, ModalsService, toaster) {

  /**
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.form = {};

    if ($stateParams.action === "forgot") {
      $scope.forgotPassword();
    }

    $scope.showPassword = false;
  }

  /**
   * @method signin
   * @desc Submit signin form to authenticate
   *
   * @param form {object}
   */
  $scope.signin = function (form) {
    form.loading = true;

    API.Signin.post({
        username: form.username,
        password: form.password
      },
      function (data) {
        form.loading = false;
        form.errors = null;
        data.user.sites = [];
        AuthService.setAuthenticatedUser(data.user);
        AuthService.setToken(data.token);

        $rootScope.$broadcast("gonevisDash.AuthService:Authenticated");
        toaster.info("Logged in", "Welcome back " + data.user.username);
      },
      function (data) {
        form.loading = false;
        form.errors = data.data;
      }
    );
  };

  /**
   * @method forgotPassword
   * @desc Open up forgot password modal
   */
  $scope.forgotPassword = function () {
    ModalsService.open("forgotPassword", "ForgotModalController");
  };

  constructor();
}

app.controller("SigninController", SigninController);
SigninController.$inject = [
  "$scope",
  "$rootScope",
  "$state",
  "$stateParams",
  "AuthService",
  "API",
  "ModalsService",
  "toaster"
];
