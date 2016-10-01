"use strict";

/**
 * @ngdoc function
 * @name gonevisDash.controller:NavigationController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $mdToast
 * @param AuthService
 * @param Codekit
 */
function NavigationController($scope, $rootScope, $state, $mdToast, API, AuthService, Codekit) {

  var site = AuthService.getCurrentSite();

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.navigations = [];

    API.Navigation.get({ site_id: site },
      function (data) {
        $scope.navigations = data.navigation;
      }
    );

    $scope.nothing = { text: "It's lonely here... Try adding some navigations!" };
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
    $scope.loading = true;

    for (var n in $scope.navigations) {
      $scope.navigations[n].sort_number = n;
    }

    API.UpdateNavigation.put({ site_id: site }, { navigation: $scope.navigations },
      function (data) {
        $scope.loading = false;
        $scope.navigations = data.navigation;
        $mdToast.showSimple("Navigation updated.");
      },
      function () {
        $scope.loading = false;
        $mdToast.showSimple("Couldn't update navigation, please try again later.");
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
  "$state",
  "$mdToast",
  "API",
  "AuthService",
  "Codekit"
];
