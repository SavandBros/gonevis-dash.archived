'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:UserController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $mdToast
 * @param AuthService
 * @param API
 * @param DolphinService
 */
function UserController($scope, $mdToast, AuthService, API, DolphinService) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.user = AuthService.getAuthenticatedUser();
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
    $mdToast.showSimple('Updating ' + key + '...');

    var payload = {};
    payload[key] = value;

    API.UserUpdate.put(payload,
      function (data) {
        $scope.user = data;
        $scope.userAvatar = data.user;
        $mdToast.showSimple("Profile update.");
      },
      function () {
        $mdToast.showSimple("Sorry, error has occured while updating profile, try again later.");
      }
    );
  }

  $scope.$on("gonevisDash.DolphinService:select", function (data, dolphin) {
    $scope.updateProfile("picture", dolphin.id);
  });

  constructor();
}

app.controller("UserController", UserController);
UserController.$inject = [
  "$scope",
  "$mdToast",
  "AuthService",
  "API",
  "DolphinService"
];
