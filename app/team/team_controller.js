"use strict";

/**
 * @ngdoc function
 * @name gonevisDash.controller:TeamController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $mdToast
 * @param AuthService
 */
function TeamController($scope, $rootScope, $state, $mdToast, API, AuthService) {

  var site = AuthService.getCurrentSite();
  $scope.role = {
    0: "Owner",
    1: "Administrator",
    2: "Editor"
  };

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.team = [];
    $scope.currentTab = "team";

    API.Team.get({ site_id: site },
      function (data) {
        $scope.team = data;
      }
    );
  }

  constructor();
}

app.controller("TeamController", TeamController);
TeamController.$inject = [
  "$scope",
  "$rootScope",
  "$state",
  "$mdToast",
  "API",
  "AuthService"
];
