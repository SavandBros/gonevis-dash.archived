"use strict";

import app from "../app";

function PlansController($scope, API, $state, $translate, AuthService) {

  let site = AuthService.getCurrentSite();
  let user = AuthService.getAuthenticatedUser(true);

  function constructor() {
    API.Eskenas.get({},
      function (data) {
        $scope.plans = data.results;
      });
  }

  /**
   * @desc Payment
   */
  $scope.pay = function (plan) {
    let payments = new cp.CloudPayments({ language: "en-US" });
    payments.charge({ // options
        publicId: 'pk_b2b11892e0e39d3d22a3f303e2690',
        description: plan.description,
        amount: Number(plan.price),
        currency: 'USD',
        invoiceId: '1234567',
        accountId: user.get.email,
        data: {
          plan_id: plan.id,
          site_id: site,
          user_id: user.get.id
        }
      },
      function (options, aa) { // success
        console.log(options, aa)
        $('#checkout-result').text('Payment was successful');
      },
      function (reason, options) { // fail
        $('#checkout-result').text('Payment failed');
      });
  };


  constructor();
}

app.controller("PlansController", PlansController);
