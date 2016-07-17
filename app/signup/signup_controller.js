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
     * @desc Submit signup form
     * 
     * @param form {object}
     */
    $scope.signup = function register(form) {
        form.loading = true;

        AuthenticationService.register(form.email, form.username, form.password).then(
            function (data, status, headers, config) {
                $rootScope.$broadcast('gonevisDash.AuthenticationService:Registered');
                form.errors = null;
            },
            function (data, status, headers, config) {
                form.loading = false;
                form.errors = data.data;
            }
        );
    };

    $scope.$on('gonevisDash.AuthenticationService:Registered', function () {
        AuthenticationService.login($scope.form.username, $scope.form.password).then(
            function (data, status, headers, config) {
                AuthenticationService.setAuthenticatedUser(data.data.user);
                AuthenticationService.setToken(data.data.token);

                $rootScope.$broadcast('gonevisDash.AuthenticationService:Authenticated');
                $mdToast.showSimple('Welcome ' + data.data.user.username);
            }
        );
    });

    constructor();
}

app.controller("SignupController", SignupController);
SignupController.$inject = ['$scope', '$rootScope', '$state', '$mdToast', 'AuthenticationService'];
