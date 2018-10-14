'use strict';

import app from "../app";

/**
 * @name FeedbackController
 *
 * @description
 *
 * ## Purpose
 * It's purpose is to send user's text as feedback.
 */
function FeedbackController($scope, toaster, API, ModalsService, $translate) {

  let vm = this;

  function constructor() {
    /**
     * @desc Feedback form.
     * @type object
     */
    $scope.form = {
      data: {
        message: "",
      },
      sending: false,
      error: null
    };
  }

  /**
   * @desc Set form error.
   *
   * @param {string} error
   */
  vm.setError = function(error) {
    $translate(error).then(translated => {
      $scope.form.error = translated;
    });

    $scope.form.sending = false;
  };

  /**
   * @desc Send feedback.
   * 
   * @param {object} form
   */
  $scope.send = (form) => {
    form.error = null;
    form.sending = true;

    // Check if message is empty
    if (form.data.message === "" || form.data.message === null || form.data.message === undefined) {
      vm.setError("EMPTY_FIELD_ERROR");
      return false;
    }
    // Check message character length.
    if (form.data.message.length < 10) {
      vm.setError("FEEDBACK_LENGTH_ERROR");
      return false;
    }

    // API call
    API.Feedback.save(form.data,
      () => {
        ModalsService.close("feedback");
        $translate(["SENT", "FEEDBACK_SENT"]).then(function (translations) {
          toaster.success(translations.SENT, translations.FEEDBACK_SENT);
        });
      },
      error => {
        form.error = error.data.message[0];
        form.sending = false;
      }
    );
  };

  constructor();
}

app.controller("FeedbackController", FeedbackController);
