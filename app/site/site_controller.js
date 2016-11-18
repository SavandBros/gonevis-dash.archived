"use strict";

/**
 * @class SiteController
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $stateParams
 * @param $mdToast
 * @param API
 * @param ModalsService
 * @param AuthService
 * @param DolphinService
 */
function SiteController($scope, $rootScope, $state, $stateParams, $mdToast,
  API, ModalsService, AuthService, DolphinService) {
}

app.controller("SiteController", SiteController);
SiteController.$inject = [
  "$scope",
  "$rootScope",
  "$state",
  "$stateParams",
  "$mdToast",
  "API",
  "ModalsService",
  "AuthService",
  "DolphinService"
];
