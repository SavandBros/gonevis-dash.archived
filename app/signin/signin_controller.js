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
function SigninController($scope, $rootScope, $state, $mdToast, AuthenticationService) {

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
        form.loading = true;

        AuthenticationService.login(form.username, form.password).then(
            function (data, status, headers, config) {
                AuthenticationService.setAuthenticatedUser(data.data.user);
                AuthenticationService.setToken(data.data.token);

                $rootScope.$broadcast('gonevisDash.account.service.AuthenticationService:Authenticated');
                $mdToast.showSimple('Welcome ' + data.data.user.username);
                $state.go('main');
            },
            function (data, status, headers, config) {
                form.loading = false;
                form.error = true;
                form.errors = data.data;
            }
        );
    }

    constructor();
}

app.controller("SigninController", SigninController);
SigninController.$inject = ['$scope', '$rootScope', '$state', '$mdToast', 'AuthenticationService'];
