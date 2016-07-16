'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:SigninController
 * Controller of the gonevisDash
 * 
 * @param $scope
 * @param $state
 * @param $mdToast
 * @param AuthenticationService
 */
function SigninController($scope, $state, $mdToast, AuthenticationService) {

    // Signin form
    $scope.form = {};

    /**
     * constructor
     *
     * @method constructor
     * @desc Init function for controller
     *
     * @memberOf SigninController
     */
    function constructor() {
        
        // Check auth
        if (AuthenticationService.isAuthenticated()) {
            $state.go('main');
        }
    };
    
    /**
     * signin
     *
     * @method signin
     * @desc Submit signin form to authenticate
     *
     */
    $scope.signin = function (form) {
        AuthenticationService.login(form.email, form.password);
    }

    constructor();
}

app.controller("SigninController", SigninController);
SigninController.$inject = ['$scope', '$state', '$mdToast', 'AuthenticationService'];
