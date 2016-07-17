'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:SigninController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $mdToast
 * @param AuthenticationService
 */
function SignupController($scope, $rootScope, $state, $mdToast, AuthenticationService) {

    // Signup form
    $scope.form = {};

    /**
     * constructor
     *
     * @method constructor
     * @desc Init function for controller
     *
     * @memberOf RegisterController
     */
    function constructor() {

        // Check auth
        if (AuthenticationService.isAuthenticated()) {
            $state.go('main');
        }
    };

    /**
     * signup
     *
     * @method signup
     * @desc Submit signup form to authenticate
     *
     */
     $scope.signup = function register(form) {

         AuthenticationService.register(form.email, form.username, form.password).then(
             function(data, status, headers, config) {
                 $rootScope.$broadcast('gonevisDash.account.service.AuthenticationService:Registered');

             },
             function(data, status, headers, config) {
                 console.log(data.data);
                 form.errors = data.data;
             }
         );;
     };

    constructor();
}

app.controller("SignupController", SignupController);
SignupController.$inject = ['$scope', '$rootScope', '$state', '$mdToast', 'AuthenticationService'];
