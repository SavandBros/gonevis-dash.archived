'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:SettingsController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $mdToast
 * @param AuthenticationService
 */
function SettingsController($scope, $state, $mdToast, AuthenticationService, UserService) {


    function constructor() {
        // Get user
        $scope.auth = AuthenticationService;
        $scope.user = AuthenticationService.getAuthenticatedUser();

        $scope.state = $state;

        if (!AuthenticationService.isAuthenticated()) {
            $state.go('signin');
        } else {
            UserService.get($scope.user.id).then(
                function(data, status, headers, config) {
                    /**
                     * Current user that is logged and is trying to update settings.
                     *
                     * @property {Object} user
                     */
                    $scope.user = data.data;

                    // Load current user data to settings data
                    $scope.setting = {
                        name: $scope.user.name,
                        location: $scope.user.location,
                        about: $scope.user.about,
                    }
                },
                function(data, status, headers, config) {
                    console.log(data.data);
                }
            );
        }
    };

    // check user auth
    $scope.$on('gonevisDash.AuthenticationService:Authenticated', function() {
        constructor();
        $state.go('main');
    });

    constructor();

    $scope.updateAccount = function(form, user) {
      form.isSubmitting = true;

        UserService.update(user).then(
            function(data, status, headers, config) {
              form.isSubmitting = false;
              $mdToast.showSimple('Your changes has been saved !');
            },
            function(data, status, headers, config) {
                var msgs = [];
                angular.forEach(data.data, function(value, key) {
                    this.push(key + ': ' + value);
                }, msgs);
            }
        );
    };
}

app.controller("SettingsController", SettingsController);
SettingsController.$inject = ['$scope', '$state', '$mdToast', 'AuthenticationService', 'UserService'];
