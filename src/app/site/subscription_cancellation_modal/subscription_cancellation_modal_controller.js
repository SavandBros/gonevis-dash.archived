"use strict";

import app from "../../app";

function SubscriptionCancellationModalController($scope, $translate, toaster, ModalsService, API, AuthService, subscription) {

  let site = AuthService.getCurrentSite();

  function constructor() {
    $scope.subscription = subscription;
    $scope.loading = false;
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
    $scope.loading = true;
    let planName = $scope.subscription.plan.name;

    API.CancelSubscription.save({ planId: $scope.subscription.id }, { site_id: site },
      () => {
        // Show message
        showMessage("CANCELLATION_COMPLETED", "CANCELLATION_COMPLETED_MESSAGE", { planName: planName }, "info", 10000);
        $scope.loading = false;
      }, () => {
        // Show message
        showMessage("OOPS", "CANCELLATION_FAILED_MESSAGE", null, "error");
        $scope.loading = false;
      });
  };

  /**
   * @desc Close modal
   */
  $scope.closeModal = () => {
    showMessage("AWESOME", "CANCELED_CANCELLATION", null, "success");
  }

  constructor();
}

app.controller("SubscriptionCancellationModalController", SubscriptionCancellationModalController);
