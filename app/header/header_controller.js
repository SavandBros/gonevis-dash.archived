"use strict";
/**
 * @ngdoc function
 * @name gonevisDash.controller:HeaderController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $state
 * @param $stateParams
 * @param AuthService
 */
function HeaderController($scope, $rootScope, $state, $stateParams, AuthService) {
  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   *
   * @memberOf HeaderController
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

  $scope.$on("gonevisDash.AuthService:SignedOut", function () {
    $state.go("signin");
  });

  $scope.$on("gonevisDash.SiteSettingsController:remove", function () {
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
  "AuthService"
];
