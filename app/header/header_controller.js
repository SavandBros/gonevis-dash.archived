"use strict";

/**
 * @class HeaderController
 *
 * @param $scope
 * @param $state
 * @param $stateParams
 * @param toaster
 * @param AuthService
 */
function HeaderController($scope, $rootScope, $state, $stateParams, toaster, AuthService) {

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
  /**
   * @event gonevisDash.AuthService:Authenticated
   * @desc Authentication loads
   */
  $scope.$on("gonevisDash.AuthService:Authenticated", function () {
    constructor();
    if (!$scope.user.sites.length) {
      $state.go("site-new");
    } else {
      $state.go("dash.main", { s: 0 });
    }
  });

  /**
   * @event gonevisDash.AuthService:SignedOut
   * @desc Un-authentication redirect
   *
   * @param event {Event}
   * @param sessionExpired {Boolean}
   */
  $scope.$on("gonevisDash.AuthService:SignedOut", function (event, sessionExpired) {
    if (sessionExpired) {
      toaster.info("Logged out", "Looks like your session has expired, login again.");
    }
    AuthService.unAuthenticate();
    $state.go("signin");
  });

  /**
   * @event gonevisDash.SiteNewController:Create
   * @desc Site creation load
   */
  $scope.$on("gonevisDash.SiteNewController:Create", constructor);

  /**
   * @event gonevisDash.SiteController:remove
   * @desc Site removal
   */
  $scope.$on("gonevisDash.SiteController:remove", constructor);

  /**
   * @event gonevisDash.SiteController:update
   * @desc Site update
   */
  $scope.$on("gonevisDash.SiteController:update", constructor);

  /**
   * @event gonevisDash.UserController:update
   * @desc User update
   */
  $scope.$on("gonevisDash.UserController:update", constructor);

  constructor();
}

app.controller("HeaderController", HeaderController);
HeaderController.$inject = [
  "$scope",
  "$rootScope",
  "$state",
  "$stateParams",
  "toaster",
  "AuthService"
];
