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
   * @param {object} form
   */
  $scope.signin = function (form) {
    form.loading = true;

    AuthService.signIn(form.username, form.password,
      function (data) {
        form.loading = false;
        form.errors = null;
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
