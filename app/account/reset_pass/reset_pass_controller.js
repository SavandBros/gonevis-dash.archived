"use strict";

/**
 * @class ResetPassController
 *
 * @param $scope
 * @param $state
 * @param AuthService
 * @param API
 * @param Password
 */
function ResetPassController($scope, $state, AuthService, API, Password) {

  /**
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    // Password strength
    $scope.password = new Password();

    // Password toggle
    $scope.showPassword = false;
  }

  /**
   * @method resetPassword
   * @desc Reset password handler
   *
   * @param form {Object}
   */
  $scope.resetPassword = function (form) {
    // Save token to reset password
    AuthService.setToken($state.params.token);
    form.loading = true;

    API.ResetPassword.save({ password: $scope.password.password },
      function () {
        AuthService.signOut();
      },
      function (data) {
        form.loading = false;
        form.errors = data.data;
      }
    );
  };

  constructor();
}

app.controller("ResetPassController", ResetPassController);
ResetPassController.$inject = [
  "$scope",
  "$state",
  "AuthService",
  "API",
  "Password"
];
