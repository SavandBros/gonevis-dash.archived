'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:SiteController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $mdToast
 * @param API
 * @param ModalsService
 * @param AuthService
 */
function SiteController($scope, $rootScope, $state, $mdToast, API, ModalsService, AuthService) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.sites = AuthService.getAuthenticatedUser().sites;
  };

  constructor();
}

app.controller("SiteController", SiteController);
SiteController.$inject = [
  '$scope',
  '$rootScope',
  '$state',
  '$mdToast',
  'API',
  'ModalsService',
  'AuthService'
];
