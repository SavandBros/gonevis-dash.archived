'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:SiteModalController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $state
 * @param API
 * @param ModalsService
 * @param AuthService
 */
function SiteModalController($scope, $state, API, ModalsService, AuthService) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.sites = AuthService.getAuthenticatedUser().sites;
  };

  /**
   * select
   *
   * @method select
   * @desc Site selection handler
   *
   * @param index {Number} Index of site
   */
  $scope.select = function (index) {
    $state.go("dash.main", { s: index });
    ModalsService.close("sites");
  };

  constructor();
}

app.controller("SiteModalController", SiteModalController);
SiteModalController.$inject = [
  '$scope',
  '$state',
  'API',
  'ModalsService',
  'AuthService'
];
