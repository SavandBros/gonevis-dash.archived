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
function MainController($scope, $state, $mdToast, AuthenticationService) {
    $scope.imAlive = true;
    /**
     * constructor
     *
     * @method constructor
     * @desc Init function for controller
     */
    function constructor() {

        // Check auth
        if (!AuthenticationService.isAuthenticated()) {
            $mdToast.showSimple('Please login to continue.');
            $state.go('signin');
        }
    };

    constructor();
}

app.controller("MainController", MainController);
MainController.$inject = ['$scope', '$state', '$mdToast', 'AuthenticationService'];
