"use strict";

/**
 * @class ResetPassController
 *
 * @param $scope
 * @param $state
 * @param AuthService
 * @param API
 */
function ResetPassController($scope, $state, AuthService, API) {
  $scope.resetPassword = function (form) {
    // Save token to reset password
    AuthService.setToken($state.params.token);
    form.loading = true;

    API.ResetPassword.save({password: form.password},
      function () {
        AuthService.logout();
      },
      function (data) {
        form.loading = false;
        form.errors = data.data;
      }
    );
  };
}

app.controller("ResetPassController", ResetPassController);
ResetPassController.$inject = [
  "$scope",
  "$state",
  "AuthService",
  "API"
];