"use strict";

/**
 * @class ChangePassController
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $stateParams
 * @param API
 * @param ModalsService
 * @param AuthService
 */
function ChangePassController($scope, $rootScope, $state, $stateParams, API, ModalsService, AuthService) {

  /**
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.user = AuthService.getAuthenticatedUser();
  }

  /**
   * @method changePassword
   * @desc for changing password
   * 
   * @param form {Object}
   */
  $scope.changePassword = function (form) {

    // Is a new password
    if (form.old_password === form.password) {
      form.errors = {
        non_field_errors: ["Please, choose a new password."]
      };
      return;
    }
    // Check if Confirm new password and new password were matched, if so raise an error
    if (form.password !== form.confirm_password) {
      form.errors = {
        non_field_errors: ["Confirm password does not match."]
      };
      return;
    }

    form.loading = true;
    form.errors = null;

    API.ChangePassword.save(form,
      function () {
        form.loading = false;
        // $mdToast.showSimple("Password changed.");
        form.errors = null;
        $state.go("dash.user");
      },
      function (data) {
        form.loading = false;
        form.errors = data.data;
      }
    );
  };

  $scope.forgotPassword = function () {
    ModalsService.open("forgotPassword", "ForgotModalController");
  }

  constructor();
}

app.controller("ChangePassController", ChangePassController);
ChangePassController.$inject = [
  "$scope",
  "$rootScope",
  "$state",
  "$stateParams",
  "API",
  "ModalsService",
  "AuthService"
];
