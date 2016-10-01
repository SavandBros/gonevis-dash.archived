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
 * @param DolphinService
 */
function UserController($scope, $state, $mdToast, AuthService, API, DolphinService) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {

    $scope.user = AuthService.getAuthenticatedUser();
    $scope.state = $state;
    $scope.dolphinService = DolphinService;

    API.User.get({ user_id: $scope.user.id },
      function (data, status, headers, config) {
        $scope.user = data;
      }
    );
  };

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

  $scope.$on("gonevisDash.DolphinService:select", function (data, dolphin) {
    $scope.user.picture = dolphin.id;
    $scope.updateProfile("picture", dolphin.id);
  });

  constructor();
}

app.controller("UserController", UserController);
UserController.$inject = [
  "$scope",
  "$state",
  "$mdToast",
  "AuthService",
  "API",
  "DolphinService"
];
