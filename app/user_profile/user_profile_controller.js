'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:UserProfileController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $mdToast
 * @param AuthenticationService
 */
function UserProfileController($scope, $rootScope, $state, $mdToast, UserService, AuthenticationService) {

    $scope.auth = AuthenticationService;
    $scope.user = AuthenticationService.getAuthenticatedUser();

    function constructor() {

        UserService.get($scope.user.id).then(
            function(data, status, headers, config) {
                /**
                 *
                 * @property {Object} user
                 */
                $scope.details = [{
                    name: $scope.user.name,
                    location: $scope.user.location,
                    about: $scope.user.about
                }]
            },
            function(data, status, headers, config) {
                console.log(data.data);
            }
        );
    };
    constructor();
}

app.controller("UserProfileController", UserProfileController);
UserProfileController.$inject = ['$scope', '$rootScope', '$state', '$mdToast', 'UserService', 'AuthenticationService'];
