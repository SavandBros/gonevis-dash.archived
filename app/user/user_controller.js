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

    $scope.updateProfile = function (key, value) {
        $scope.user[key] = value;
        
        $mdToast.showSimple('Updating ' + key + '...');
    }

    constructor();
}

app.controller("UserController", UserController);
UserController.$inject = ['$scope', '$state', '$mdToast', 'AuthenticationService', 'UserService'];
