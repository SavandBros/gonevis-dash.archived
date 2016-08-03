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
 */
function UserController($scope, $state, $mdToast, AuthenticationService, UserService) {

    function constructor() {

        $scope.user = AuthenticationService.getAuthenticatedUser();
        $scope.state = $state;

        getUser();
    };

    function getUser() {

        UserService.get($scope.user.id).then(
            function (data, status, headers, config) {
                $scope.user = data.data;
            }
        );
    }

    $scope.updateProfile = function (key, value) {

        $mdToast.showSimple('Updating ' + key + '...');

        var payload = {};
        payload[key] = value;

        UserService.update(payload).then(
            function (data, status, headers, config) {
                $scope.user = data.data;
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
