"use strict";

import app from "../../app";

require("../../basement/directives/disable_on_request_directive");

function SubscriptionCancellationModalController($scope, $state, $timeout, $translate, toaster, ModalsService, API,
  AuthService, subscription) {

  let site = AuthService.getCurrentSite();

  function constructor() {
    $scope.cancelling = false;
    $scope.subscription = subscription;
  }

  /**
   * @desc Show message and close modal
   * 
   * @param {string} title
   * @param {string} body
   * @param {object} param
   * @param {string} toasterType
   * @param {number} toasterTime
   */
  function showMessage(title, body, param, toasterType, toasterTime) {
    // Translation
    $translate([title, body], param).then(translations => {
      // Toaster
      toaster[toasterType](translations[title], translations[body], toasterTime);
    });

    // Close modal
    ModalsService.close("subscriptionCancellation");
  }

  /**
   * @desc Cancel subscription
   */
  $scope.cancel = () => {
    $scope.cancelling = true;
    let planName = $scope.subscription.plan.name;

    return API.CancelSubscription.save({ planId: $scope.subscription.id }, { site_id: site },
      () => {
        // Show message
        showMessage("CANCELLATION_COMPLETED", "CANCELLATION_COMPLETED_MESSAGE", { planName: planName }, "info", 10000);
        // Redirect user to main page after 500 milliseconds
        $timeout(() => {
          $state.go("dash.main");
        }, 500);
      }, () => {
        $scope.cancelling = false;
        // Show message
        showMessage("OOPS", "CANCELLATION_FAILED_MESSAGE", null, "error");
      });
  };

  /**
   * @desc Close modal and show a message
   */
  $scope.closeModal = () => {
    showMessage("AWESOME", "CANCELED_CANCELLATION", null, "success");
  };

  constructor();
}

app.controller("SubscriptionCancellationModalController", SubscriptionCancellationModalController);
