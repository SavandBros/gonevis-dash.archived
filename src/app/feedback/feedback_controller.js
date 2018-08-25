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
function FeedbackController($scope, toaster, API, $translate) {

  function constructor() {
    /**
     * @desc Feedback form.
     * @type object
     */
    $scope.form = {
      data: {
        message: "",
      },
      sending: false
    }
  }

  /**
   * @desc Send feedback.
   * 
   * @param {object} form
   */
  $scope.send = (form) => {
    form.sending = true;

    API.Feedback.save(form.data,
      function (data) {
        console.log(data);
        form.sending = false;
        $translate(["SENT", "FEEDBACK_SENT"]).then(function (translations) {
          toaster.info(translations.SENT, translations.FEEDBACK_SENT);
        });
      },
      function (data) {
        console.log(data);
        form.sending = false;
      }
    );
  };

  constructor();
}

app.controller("FeedbackController", FeedbackController);
