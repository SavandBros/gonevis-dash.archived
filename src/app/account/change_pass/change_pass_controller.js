"use strict";

import app from "../../app";

function ChangePassController($scope, $state, toaster, API, ModalsService, $translate) {

  /**
   * @desc for changing password
   *
   * @param {object} form
   */
  $scope.changePassword = function(form) {
    // Is a new password
    if (form.old_password === form.password) {
      $translate("CHANGE_PASSWORD_ERROR_SAME").then(function(error) {
        form.errors = {
          non_field_errors: [error]
        };
      });
      return;
    }

    // Check if Confirm new password and new password were matched, if so raise an error
    if (form.password !== form.confirm_password) {
      $translate("CHANGE_PASSWORD_ERROR_MATCH").then(function(error) {
        form.errors = {
          non_field_errors: [error]
        };
      });
      return;
    }

    form.loading = true;
    form.errors = null;

    API.ChangePassword.put(form,
      function() {
        $translate(["DONE", "PASSWORD_CHANGED"]).then(function(translations) {
          toaster.info(translations.DONE, translations.PASSWORD_CHANGED);
        });
        $state.go("user");
      },
      function(data) {
        form.loading = false;
        form.errors = data.data;
      }
    );
  };

  /**
   * @desc Opens modal
   */
  $scope.forgotPassword = function() {
    ModalsService.open("forgotPassword", "ForgotModalController");
  };
}

app.controller("ChangePassController", ChangePassController);
