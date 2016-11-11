"use strict";

/**
 * @ngdoc function
 * @name gonevisDash.controller:ForgotModalController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $mdToast
 * @param API
 * @param ModalsService
 */
function ForgotModalController($scope, $mdToast, API, ModalsService) {

  /**
   * forgotPassword
   *
   * @method forgotPassword
   * @desc forgot password handler
   *
   * @param form {object}
   */
  $scope.forgotPassword = function (form) {
    form.loading = true;

    API.ForgotPassword.save(form.data,
      function (data) {
        ModalsService.close("forgotPassword");

        var toast = $mdToast.simple()
          .content(
            'Please check your email, instruction to reset your password has been sent to the email address you provided'
          )
          .action('OK')
          .highlightAction(true)
          .hideDelay(8000)

        $mdToast.show(toast).then(function () {
        });
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
  "$mdToast",
  "API",
  "ModalsService"
];
