"use strict";

function EmailConfirmationController($scope, $rootScope, $state, toaster, API, AuthService, ModalsService) {

  function constructor() {
    // If not logged in, attempt to confirm with given token
    if (!AuthService.isAuthenticated()) {
      $scope.loading = true;

      API.EmailConfirmation.save({}, { token: $state.params.token },
        function (data) {
          $scope.loading = false;
          toaster.success("Done", "Thanks for verifying your email.");

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

    // Logged in, wants to resend email confirmation link
    else {
      $scope.user = AuthService.getAuthenticatedUser(true);
      $scope.form = {
        email: $scope.user.get.email
      };
    }
  }

  /**
   * @desc Resend email confirmation link
   *
   * @param {object} form
   */
  $scope.resend = function (form) {
    API.EmailConfirmationResend.save({ email: form.email },
      function () {
        ModalsService.close("forgotPassword");
        toaster.success("Sent", "Email verification sent to " + form.email);
        $state.go("signin");
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
  "AuthService",
  "ModalsService"
];
