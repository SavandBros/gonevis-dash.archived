"use strict";

/**
 * @class SignupController
 *
 * @param $scope
 * @param $stateParams
 * @param AuthService
 * @param API
 * @param Password
 * @param toaster
 */
function SignupController($scope, $stateParams, AuthService, API, Password, toaster) {

  /**
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    // Forn with username (param)
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
   * @method signup
   * @desc Submit signup form
   * 
   * @param form {Object}
   */
  $scope.signup = function (form) {
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
      function () {
        form.errors = [];
        // Sign user in
        AuthService.signIn(
          form.data.username,
          $scope.password.password,
          function () {
            toaster.success(
              "Welcome " + form.data.username,
              "Thanks for registering at GoNevis, a link has been sent to your email for account verification."
            );
          }
        );
      },
      function (data) {
        form.loading = false;
        form.errors = data.data;
      }
    );
  };

  /**
   * @method resend
   * @desc Resend email confirmation
   *
   * @param email {String}
   */
  $scope.resend = function (email) {
    API.EmailConfirmationResend.save({ email: email },
      function () {
        toaster.success("Done", "We've send a confirmation link to your email.", 30000);
      }
    );
  };

  constructor();
}

app.controller("SignupController", SignupController);
SignupController.$inject = [
  "$scope",
  "$stateParams",
  "AuthService",
  "API",
  "Password",
  "toaster"
];
