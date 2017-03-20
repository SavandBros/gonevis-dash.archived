"use strict";

/**
 * @class ForgotModalController
 *
 * @param $scope
 * @param toaster
 * @param API
 * @param ModalsService
 */
function ForgotModalController($scope, toaster, API, ModalsService) {

  /**
   * @method forgotPassword
   * @desc Sends password link to provided email.
   *
   * @param form {object}
   */
  $scope.forgotPassword = function (form) {
    form.loading = true;

    API.ForgotPassword.save(form.data,
      function () {
        ModalsService.close("forgotPassword");
        toaster.success(
          "Sent", "Please check your email, instruction to reset your password sent to " + form.data.email, 10000
        );
      },
      function (data) {
        form.loading = false;
        form.errors = data.data;
      }
    );
  };

}

app.controller("ForgotModalController", ForgotModalController);
ForgotModalController.$inject = [
  "$scope",
  "toaster",
  "API",
  "ModalsService"
];
