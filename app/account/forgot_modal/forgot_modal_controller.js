"use strict";

/**
 * @class ForgotModalController
 *
 * @param $scope
 * @param API
 * @param ModalsService
 */
function ForgotModalController($scope, API, ModalsService) {

  // var toast = $mdToast.simple().content(
  //   "Please check your email, instruction to reset your password has been sent to the email address you provided."
  // ).hideDelay(10000);

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
        // $mdToast.show(toast);
      },
      function (data) {
        form.loading = false;
        form.errors = data.data;
      }
    );
  }

}

app.controller("ForgotModalController", ForgotModalController);
ForgotModalController.$inject = [
  "$scope",
  "API",
  "ModalsService"
];
