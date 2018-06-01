"use strict";

var app = require("../../app_module");

function ResetPassController($scope, $state, AuthService, API, Password) {

  function constructor() {
    // Password strength
    $scope.password = new Password();

    // Password toggle
    $scope.showPassword = false;
  }

  /**
   * @desc Reset password handler
   *
   * @param {object} form
   */
  $scope.resetPassword = function(form) {
    // Save token to reset password
    AuthService.setToken($state.params.token);
    form.loading = true;

    API.ResetPassword.save({
        password: $scope.password.password
      },
      function() {
        AuthService.signOut();
      },
      function(data) {
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

module.exports = ResetPassController;