"use strict";

import app from "../../app";

function PaymentValidationModalController($scope, $state, $timeout, $interval, API, ModalsService, $translate, toaster, AuthService) {

  let interval;

  function constructor() {
    // Check if transaction is completed.
    interval = $interval(() => {
      API.Subscription.get({ siteId: AuthService.getCurrentSite() },
        data => {
          if (data.subscription.active) {
            $scope.done = true;
            // Cancel interval
            $interval.cancel(interval);
            // Close modal
            ModalsService.close("paymentValidation");
            // Show a toaster
            $translate(["DONE", "ACCOUNT_UPGRADED"]).then(translation => {
              toaster.success(translation.DONE, translation.ACCOUNT_UPGRADED, 10000);
            });
          }
				});
    }, 2000);
  }

  $scope.$watch("done", (value) => {
    // Redirect user to main page
    if (value) {
      $state.go("dash.main");
    }
  });


  constructor();
}

app.controller("PaymentValidationModalController", PaymentValidationModalController);
