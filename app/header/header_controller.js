"use strict";

/**
 * @class HeaderController
 *
 * @param $scope
 * @param $state
 * @param $stateParams
 * @param $mdToast
 * @param AuthService
 */
function HeaderController($scope, $rootScope, $state, $stateParams, $mdToast, AuthService) {

  /**
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    // Get user
    $scope.auth = AuthService;
    $scope.user = AuthService.getAuthenticatedUser();

    $scope.state = $state;
    $scope.param = $stateParams;
  }

  $rootScope.$on("gonevisDash.AuthService:Authenticated", function () {
    constructor();
    if (!$scope.user.sites.length) {
      $state.go("site-new");
    } else {
      $state.go("dash.main", { s: 0 });
    }
  });

  $scope.$on("gonevisDash.SiteNewController:Create", function () {
    constructor();
  });

  $scope.$on("gonevisDash.AuthService:SignedOut", function (event, sessionExpired) {
    if (sessionExpired) {
      $mdToast.showSimple("Looks like your session has expired, login again.");
    }
    AuthService.unAuthenticate();
    $state.go("signin");
  });

  $scope.$on("gonevisDash.SiteSettingsController:remove", function () {
    constructor();
  });

  $scope.$on("gonevisDash.SiteController:update", function () {
    constructor();
  });

  $scope.$on("gonevisDash.UserController:update", function () {
    constructor();
  });


  constructor();
}

app.controller("HeaderController", HeaderController);
HeaderController.$inject = [
  "$scope",
  "$rootScope",
  "$state",
  "$stateParams",
  "$mdToast",
  "AuthService"
];
