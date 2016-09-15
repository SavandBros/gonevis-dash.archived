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
 * @param AuthService
 * @param API
 */
function UserController($scope, $state, $mdToast, AuthService, API) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {

    $scope.user = AuthService.getAuthenticatedUser();
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

    API.User.get( { user_id: $scope.user.id },
      function (data, status, headers, config) {
        $scope.user = data;
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

    API.UserUpdate.put(payload,
      function (data, status, headers, config) {
        $scope.user = data;
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
UserController.$inject = ['$scope', '$state', '$mdToast', 'AuthService', 'API'];
