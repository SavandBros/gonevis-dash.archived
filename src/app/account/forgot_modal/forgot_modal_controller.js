"use strict";


import app from "../../app";

function ForgotModalController($scope, toaster, API, ModalsService, $translate) {

  /**
   * @desc Sends password link to provided email.
   *
   * @param {object} form
   */
  $scope.forgotPassword = function(form) {
    form.loading = true;

    API.ForgotPassword.save(form.data,
      function() {
        ModalsService.close("forgotPassword");
        $translate(["SENT", "FORGOT_PASSWORD_TOASTER"], {"email": form.data.email}).then(function(translations) {
          toaster.success(translations.SENT, translations.FORGOT_PASSWORD_TOASTER, 10000);
        });
      },
      function(data) {
        form.loading = false;
        form.errors = data.data;
      }
    );
  };

}

app.controller("ForgotModalController", ForgotModalController);
