'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:UserController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $mdToast
 * @param AuthenticationService
 * @param UserService
 */
function UserController($scope, $state, $mdToast, AuthenticationService, UserService) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {

    $scope.user = AuthenticationService.getAuthenticatedUser();
    $scope.state = $state;

    getUser();
  };

  /**
   * getUser
   *
   * @method getUser
   * @desc get user data via api call
   * 
   * @param $scope.user.id {string}
   */
  function getUser() {

    UserService.get($scope.user.id).then(
      function (data, status, headers, config) {
        $scope.user = data.data;
        AuthenticationService.updateAuthentication(data.data);
      }
    );
  }

  /**
   * updateProfile
   *
   * @method updateProfile
   * @desc update user profile via api call
   * 
   * @param key {string} value {string}
   */
  $scope.updateProfile = function (key, value) {
    $mdToast.showSimple('Updating ' + key + '...');

    var payload = {};
    payload[key] = value;

    UserService.update(payload).then(
      function (data, status, headers, config) {
        $scope.user = data.data;
        getUser();
        $mdToast.showSimple("Profile update.");
      },
      function (data, status, headers, config) {
        $mdToast.showSimple("Sorry, error has occured while updating profile, try again later.");
      }
    );
  }

  constructor();
}

app.controller("UserController", UserController);
UserController.$inject = ['$scope', '$state', '$mdToast', 'AuthenticationService', 'UserService'];
