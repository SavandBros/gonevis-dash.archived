"use strict";

import app from "../../app";

function SigninController($scope, $stateParams, AuthService, ModalsService, toaster, $translate) {

  function constructor() {
    $scope.form = {};

    if ($stateParams.action === "forgot") {
      $scope.forgotPassword();
    }

    $scope.showPassword = false;
  }

  /**
   * @desc Submit signin form to authenticate
   *
   * @param {object} form
   */
  $scope.signin = function(form) {
    form.loading = true;

    AuthService.signIn(form.username, form.password,
      function(data) {
        form.loading = false;
        form.errors = null;
        $translate(["LOGGED_IN", "WELCOME_BACK"], {"username": data.user.username}).then(function(translations) {
          toaster.info(translations.LOGGED_IN, translations.WELCOME_BACK);
        });
      },
      function(data) {
        form.loading = false;
        form.errors = data.data;
      }
    );
  };

  /**
   * @desc Open up forgot password modal
   */
  $scope.forgotPassword = function() {
    ModalsService.open("forgotPassword", "ForgotModalController");
  };

  constructor();
}

app.controller("SigninController", SigninController);
