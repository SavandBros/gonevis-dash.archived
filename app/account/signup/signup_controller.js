"use strict";

/**
 * @class SignupController
 *
 * @param $scope
 * @param $state
 * @param $stateParams
 * @param $mdToast
 * @param AuthService
 * @param API
 */
function SignupController($scope, $state, $stateParams, $mdToast, AuthService, API) {

  /**
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    // Get collaborating token
    $scope.inviteId = $stateParams.token;
  }

  /**
   * @method signup
   * @desc Submit signup form
   * 
   * @param form {Object}
   */
  $scope.signup = function register(form) {
    form.loading = true;

    var payload = form.data;
    if ($scope.inviteId) {
      payload.invite_id = $scope.inviteId;
    }

    API.Signup.post(payload,
      function (data) {
        form.errors = [];
        $scope.registeredEmail = data.email;
        $scope.success = true;
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
        $mdToast.showSimple("We've send a confirmation link to your email.");
      }
    );
  };

  constructor();
}

app.controller("SignupController", SignupController);
SignupController.$inject = [
  "$scope",
  "$state",
  "$stateParams",
  "$mdToast",
  "AuthService",
  "API"
];
