'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:DashController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $state
 * @param $mdToast
 * @param AuthenticationService
 */
function DashController($scope, $state, $mdToast, AuthenticationService) {
  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controlleru
   */
  function constructor() {
    // Check auth
    if (!AuthenticationService.isAuthenticated()) {
      $mdToast.showSimple('Please login to continue.');
      $state.go('signin');
    }
  }

  constructor();
}

app.controller("DashController", DashController);
DashController.$inject = ['$scope', '$state', '$mdToast', 'AuthenticationService'];
