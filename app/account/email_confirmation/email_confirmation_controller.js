"use strict";

function EmailConfirmationController($scope, $rootScope, $state, toaster, API, AuthService) {

  function constructor() {
    $scope.loading = true;
    API.EmailConfirmation.save({}, { token: $state.params.token },
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
   * @desc Resend email confirmation
   *
   * @param {object} form
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
