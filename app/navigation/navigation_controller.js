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
 */
function NavigationController($scope, $rootScope, $state, $mdToast, API, AuthService) {
  var site = AuthService.getCurrentSite();
  $scope.navigations = [];

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    API.Navigation.get({ site_id: site },
      function (data) {
        $scope.navigations = data.navigation;
        console.log(data);
      }
    );
    $scope.nothing = {
      text: "It's lonely here... Try adding some navigations!"
    };
  }

  /**
   * updateNavigation
   *
   * @method updateNavigation
   * @desc function for updating navigations
   * 
   */
  $scope.updateNavigation = function () {
    $scope.loading = true;

    for (var i = 0; i < $scope.navigations.length; i++) {
      if (!$scope.navigations[i].url.startsWith("/")) {
        $scope.navigations.splice(i, 1);
      }
    }

    API.UpdateNavigation.put({ site_id: site }, { navigation: $scope.navigations },
      function (data) {
        $scope.loading = false;
        $mdToast.showSimple("Navigation updated.");
        console.log(data);
      },
      function (data) {
        $scope.loading = false;
        $mdToast.showSimple("Sorry, we couldn't update navigation, please try again later");
        console.log(data);
      }
    );
  };

  /**
   * addNav
   *
   * @method addNav
   * @desc function for adding a new navigation
   * 
   */
  $scope.addNav = function () {
    $scope.navigations.push({ "url": "/", "label": "", "sort_number": $scope.navigations.length + 1 });
  };

  /**
   * deleteNav
   *
   * @method deleteNav
   * @desc function for deleting a navigation
   * 
   * @param num {integer}
   */
  $scope.deleteNav = function (num) {
    for (var i = 0; i < $scope.navigations.length; i++) {
      if ($scope.navigations[i].sort_number === num) {
        $scope.navigations.splice(i, 1);
      }
    }
  };

  constructor();
}

app.controller("NavigationController", NavigationController);
NavigationController.$inject = ["$scope", "$rootScope", "$state", "$mdToast", "API", "AuthService"];
