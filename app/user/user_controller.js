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
        // Get user
        $scope.auth = AuthenticationService;
        $scope.user = AuthenticationService.getAuthenticatedUser();

        $scope.state = $state;
    };

    function newUser() {
        UserService.get($scope.user.id).then(
            function(data, status, headers, config) {
                // Update user at AuthenticationService
                AuthenticationService.updateAuthentication(data.data);
            },
            function(data, status, headers, config) {
                console.log("Sorry");
            }
        );
    }

    $scope.updateProfile = function(key, value) {
        // Loading message
        $mdToast.showSimple('Updating ' + key + '...');
        // Set payload
        var payload = {};
        payload[key] = value;
        // Send put request
        UserService.update(payload).then(
            function(data, status, headers, config) {
                // Success message
                $mdToast.showSimple("Profile successfully update.");
                newUser();
            },
            function(data, status, headers, config) {
                // Fail message
                $mdToast.showSimple("Sorry, error has occured while updating profile, try again later.");
            }
        );
    }

    constructor();
}

app.controller("UserController", UserController);
UserController.$inject = ['$scope', '$state', '$mdToast', 'AuthenticationService', 'UserService'];
