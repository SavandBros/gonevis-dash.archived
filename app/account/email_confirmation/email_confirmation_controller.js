"use strict";

/**
 * @class EmailConfirmationController
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param toaster
 * @param API
 * @param AuthService
 */
function EmailConfirmationController($scope, $rootScope, $state, toaster, API, AuthService) {

  /**
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.loading = true;
    API.EmailConfirmation.save({ token: $state.params.token }, {},
      function (data) {
        $scope.loading = false;
        toaster.success("Done", "Thanks for confirming your email");

        AuthService.setAuthenticatedUser(data.user);
        AuthService.setToken(data.token);
        $rootScope.$broadcast("gonevisDash.AuthService:Authenticated");
      },
      function () {
        $scope.loading = false;
        $scope.error = true;
      }
    );
  }

  /**
   * @method resend
   * @desc Resend email confirmation
   *
   * @param form {Object}
   */
  $scope.resend = function (form) {
    API.EmailConfirmationResend.save({ email: form.email },
      function () {
        toaster.success("Sent", "Email confirmation sent to " + form.email);
        $state.go('signin');
      },
      function (data) {
        form.errors = data.data;
      }
    );
  };

  constructor();
}

app.controller("EmailConfirmationController", EmailConfirmationController);
EmailConfirmationController.$inject = [
  "$scope",
  "$rootScope",
  "$state",
  "toaster",
  "API",
  "AuthService"
];
