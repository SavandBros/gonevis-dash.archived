'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:MainController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $state
 * @param $mdToast
 * @param AuthenticationService
 */
function MainController($scope, $state, $mdToast, $stateParams, AuthenticationService) {
  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   *
   * @memberOf MainController
   */
  function constructor() {
    // Check auth
    if (!AuthenticationService.isAuthenticated()) {
      $mdToast.showSimple('Please login to continue.');
      $state.go('signin');
    }
    $scope.auth = AuthenticationService;
    $scope.user = AuthenticationService.getAuthenticatedUser();

    $scope.state = $state;
    $scope.param = $stateParams
  };

  constructor();
}

app.controller("MainController", MainController);
MainController.$inject = ['$scope', '$state', '$mdToast', '$stateParams', 'AuthenticationService'];