"use strict";

/**
 * @class ChangePassController
 *
 * @param $scope
 * @param $state
 * @param toaster
 * @param API
 * @param ModalsService
 */
function ChangePassController($scope, $state, toaster, API, ModalsService) {

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
        toaster.info("Done", "Password changed");
        $state.go("dash.user");
      },
      function (data) {
        form.loading = false;
        form.errors = data.data;
      }
    );
  };

  /**
   * @method forgotPassword
   * @desc Opens modal
   */
  $scope.forgotPassword = function () {
    ModalsService.open("forgotPassword", "ForgotModalController");
  };
}

app.controller("ChangePassController", ChangePassController);
ChangePassController.$inject = [
  "$scope",
  "$state",
  "toaster",
  "API",
  "ModalsService"
];
