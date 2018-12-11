"use strict";

import app from "../../app";

function PaymentValidationModalController($state, $timeout, $interval, API, ModalsService, $translate, toaster,
  AuthService) {

  let interval;

  function constructor() {
    // Check if transaction is completed.
    interval = $interval(() => {
      API.Subscription.get({ siteId: AuthService.getCurrentSite() }, data => {
        if (data.subscription.active) {
          // Cancel interval
          $interval.cancel(interval);
          // Close modal
          ModalsService.close("paymentValidation");
          // Redirect to main page after 500 milliseconds
          $timeout(() => {
            $state.go("dash.main");
          }, 500);
          // Show a toaster
          $translate(["DONE", "ACCOUNT_UPGRADED"]).then(translation => {
            toaster.success(translation.DONE, translation.ACCOUNT_UPGRADED, 10000);
          });
        }
      });
    }, 2000);
  }

  constructor();
}

app.controller("PaymentValidationModalController", PaymentValidationModalController);
