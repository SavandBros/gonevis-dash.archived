'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:UserController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param $mdToast
 * @param AuthService
 * @param API
 * @param DolphinService
 */
function UserController($scope, $rootScope, $mdToast, AuthService, API, DolphinService) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.user = AuthService.getAuthenticatedUser();
    $scope.sites = $scope.user.sites;

    console.log($scope.sites);
    $scope.dolphinService = DolphinService;
    API.User.get({ user_id: $scope.user.id },
      function (data) {
        $scope.user = data;
        $scope.viewLoaded = true;
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

    var keyString = key.replace("_", " ");

    $mdToast.showSimple('Updating ' + keyString + '...');

    var payload = {};
    payload[key] = value;

    API.UserUpdate.put(payload,
      function (data) {
        $scope.user[key] = data[key]
        $scope.user.sites = $scope.sites;
        $scope.userAvatar = data.user;

        AuthService.setAuthenticatedUser($scope.user);
        $rootScope.$broadcast("gonevisDash.UserController:update");

        $mdToast.showSimple("Profile " + keyString + " updated");
      },
      function () {
        $mdToast.showSimple("Sorry, error has occured while updating profile, try again later.");
      }
    );
  }

  $scope.$on("gonevisDash.DolphinService:select", function (data, dolphin) {
    $scope.updateProfile("picture", dolphin ? dolphin.id : null);
  });

  constructor();
}

app.controller("UserController", UserController);
UserController.$inject = [
  "$scope",
  "$rootScope",
  "$mdToast",
  "AuthService",
  "API",
  "DolphinService"
];
