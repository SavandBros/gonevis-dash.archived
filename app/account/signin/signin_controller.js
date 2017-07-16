"use strict";

function SigninController($scope, $stateParams, AuthService, ModalsService, toaster) {

  function constructor() {
    $scope.form = {};

    if ($stateParams.action === "forgot") {
      $scope.forgotPassword();
    }

    $scope.showPassword = false;
  }

  /**
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
  "$stateParams",
  "AuthService",
  "ModalsService",
  "toaster"
];
