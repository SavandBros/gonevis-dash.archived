"use strict";

import app from "../../app";

function SignupController($scope, $stateParams, $window, AuthService, API, Password, toaster, $translate) {

  function constructor() {
    // Form with username (param)
    $scope.form = {
      data: {
        username: $stateParams.username
      }
    };

    // Get collaborating token
    $scope.inviteId = $stateParams.token;

    // Toggle password visibility
    $scope.showPassword = false;

    // Password class to check strength
    $scope.password = new Password();
  }

  /**
   * @desc Submit signup form
   *
   * @param {object} form
   */
  $scope.signup = function(form) {
    form.loading = true;

    var payload = {
      password: $scope.password.password,
      email: form.data.email,
      username: form.data.username
    };

    if ($scope.inviteId) {
      payload.invite_id = $scope.inviteId;
    }

    API.SignupAccount.post(payload,
      function() {
        form.errors = [];
        // Send to Google
        $window.gtag('event', 'conversion', {'send_to': 'AW-830696480/6qhhCL6HnJEBEKDYjYwD'});
        // Sign user in
        AuthService.signIn(
          form.data.username,
          $scope.password.password,
          function() {
            $translate(["REGISTER_WELCOME", "REGISTER_VERIFICATION"], {"username": form.data.username}).then(
              function(translations) {
                toaster.success(translations.REGISTER_WELCOME, translations.REGISTER_VERIFICATION);
              }
            );
          }
        );
      },
      function(data) {
        form.loading = false;
        form.errors = data.data;
      }
    );
  };

  /**
   * @desc Resend email confirmation
   *
   * @param {string} email
   */
  $scope.resend = function(email) {
    API.EmailConfirmationResend.save({
        email: email
      },
      function() {
        $translate(["DONE", "SEND_CONFIRMATION_LINK"]).then(function(translations) {
          toaster.success(translations.DONE, translations.SEND_CONFIRMATION_LINK, 30000);
        });
      }
    );
  };

  constructor();
}

app.controller("SignupController", SignupController);
