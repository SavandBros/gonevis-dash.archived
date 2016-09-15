'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:DashController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $state
 * @param $mdToast
 * @param AuthService
 */
function DashController($scope, $state, $mdToast, AuthService) {
  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controlleru
   */
  function constructor() {
    // Check auth
    if (!AuthService.isAuthenticated()) {
      $mdToast.showSimple('Please login to continue.');
      $state.go('signin');
    }
  }

  constructor();
}

app.controller("DashController", DashController);
DashController.$inject = ['$scope', '$state', '$mdToast', 'AuthService'];
