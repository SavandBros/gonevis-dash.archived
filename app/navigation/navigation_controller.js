"use strict";

/**
 * @ngdoc function
 * @name gonevisDash.controller:NavigationController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param toaster
 * @param $state
 * @param $stateParams
 * @param API
 * @param AuthService
 */
function NavigationController($scope, $rootScope, toaster, $state, $stateParams, API, AuthService) {

  var site = AuthService.getCurrentSite();

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.navigations = [];

    API.Navigation.get({ siteId: site },
      function (data) {
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
   * update
   *
   * @method update
   * @desc function for updating navigations
   *
   * @param form {Object}
   */
  $scope.update = function (form) {
    form.loading = true;

    for (var n in $scope.navigations) {
      $scope.navigations[n].sort_number = n;
    }

    API.UpdateNavigation.put({ siteId: site }, { navigation: $scope.navigations },
      function (data) {
        toaster.info("Done", "Navigation updated");
        form.loading = false;
        $scope.navigations = data.navigation;
      },
      function () {
        form.loading = false;
        toaster.error("Error", "Something went wrong, we couldn't update navigations.");
      }
    );
  };

  /**
   * create
   *
   * @method create
   * @desc Nav creation function
   */
  $scope.create = function () {
    $scope.navigations.push({
      label: "New Nav",
      url: "/",
      sort_number: $scope.navigations.length + 1
    });
  };

  /**
   * remove
   *
   * @method remove
   * @desc Nav deletion function
   *
   * @param index {Number}
   */
  $scope.remove = function (index) {
    $scope.navigations.splice(index, 1);
  };

  constructor();
}

app.controller("NavigationController", NavigationController);
NavigationController.$inject = [
  "$scope",
  "$rootScope",
  "toaster",
  "$state",
  "$stateParams",
  "API",
  "AuthService"
];
