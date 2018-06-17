"use strict";

import app from "../app";

function NavigationController($scope, toaster, $stateParams, API, AuthService, $translate) {

  var site = AuthService.getCurrentSite();

  function constructor() {
    $scope.navigations = [];

    API.Navigation.get({
        siteId: site
      },
      function(data) {
        $scope.initialled = true;
        $scope.navigations = data.navigation;

        // If adding a navigation
        if ($stateParams.add) {
          var navigation = $stateParams.add;

          $scope.navigations.push({
            label: navigation.label,
            url: navigation.url
          });
        }
      }
    );
  }

  /**
   * @desc function for updating navigations
   *
   * @param {object} form
   */
  $scope.update = function(form) {
    form.loading = true;

    for (var n in $scope.navigations) {
      $scope.navigations[n].sort_number = n;
    }

    API.UpdateNavigation.put({
        siteId: site
      }, {
        navigation: $scope.navigations
      },
      function(data) {
        $translate(["DONE", "NAVIGATION_UPDATED"]).then(function(translations) {
          toaster.info(translations.DONE, translations.NAVIGATION_UPDATED);
        });
        form.loading = false;
        $scope.navigations = data.navigation;
      },
      function() {
        form.loading = false;
        $translate(["ERROR", "NAVIGATION_UPDATE_ERROR"]).then(function(translations) {
          toaster.error(translations.ERROR, translations.NAVIGATION_UPDATE_ERROR);
        });
      }
    );
  };

  /**
   * @desc Nav creation function
   */
  $scope.create = function() {
    $translate('NEW_NAV').then(function (newNav) {
      $scope.navigations.push({
        label: newNav,
        url: "/",
        sort_number: $scope.navigations.length + 1
      });
    });
  };

  /**
   * @desc Nav deletion function
   *
   * @param {number} index
   */
  $scope.remove = function(index) {
    $scope.navigations.splice(index, 1);
  };

  constructor();
}

app.controller("NavigationController", NavigationController);
