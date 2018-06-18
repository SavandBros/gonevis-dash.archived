"use strict";

import app from "../../app";

function EmailConfirmationController($scope, $rootScope, $state, toaster, API, AuthService, ModalsService, $translate) {

  function constructor() {
    // Verify email with given token
    if ($state.params.token) {
      $scope.loading = true;

      API.EmailConfirmation.save({}, {
          token: $state.params.token
        },
        function(data) {
          AuthService.setToken(data.token);
          AuthService.setAuthenticatedUser(data.user);
          $rootScope.$broadcast("gonevisDash.AuthService:Authenticated");

          $scope.loading = false;
          $translate(["DONE", "VERIFICATION_DONE"]).then(function(translations) {
            toaster.success(translations.DONE, translations.VERIFICATION_DONE);
          });
        },
        function() {
          $scope.loading = false;
          $scope.error = true;
        }
      );
    }
    // No token, it's the resend modal
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
  $scope.resend = function(form) {
    API.EmailConfirmationResend.save({
        email: form.email
      },
      function() {
        ModalsService.close("forgotPassword");
        $translate(["SENT", "EMAIL_VERIFICATION_SENT_TO"]).then(function(translations) {
          toaster.success(translations.SENT, translations.EMAIL_VERIFICATION_SENT_TO + form.email);
        });
        $state.go("signin");
      },
      function(data) {
        form.errors = data.data;
      }
    );
  };

  constructor();
}

app.controller("EmailConfirmationController", EmailConfirmationController)
