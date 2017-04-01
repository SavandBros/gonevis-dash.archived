"use strict";

/**
 * @class HeaderController
 *
 * @param $scope
 * @param $state
 * @param $stateParams
 * @param AuthService
 * @param DolphinService
 * @param Codekit
 * @param Entry
 * @param API
 * @param toaster
 */
function HeaderController($scope, $rootScope, $state, $stateParams,
  AuthService, DolphinService, Codekit, Entry, API, toaster) {

  /**
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    // User
    $scope.auth = AuthService;
    $scope.user = AuthService.getAuthenticatedUser();

    // State
    $scope.state = $state;
    $scope.param = $stateParams;
  }

  /**
   * @method nevis
   * @desc Entry with different format
   *
   * @param format {String}
   */
  $scope.nevis = function (format) {
    $scope.nevisFormat = format;
    if (format === "image") {
      DolphinService.viewSelection("headerNevis");
    }
  };
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
    // Session expired message
    if (sessionExpired) {
      toaster.clear($scope.signOutToast);
      $scope.signOutToast = toaster.info("Logged out", "Looks like your session has expired, login again.");
    }
    // Sign out completely
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
  "AuthService",
  "DolphinService",
  "Codekit",
  "Entry",
  "API",
  "toaster"
];
