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
 * @param AuthService
 */
function SignupController($scope, $rootScope, $state, $mdToast, AuthService) {

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
    if (AuthService.isAuthenticated()) {
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

    AuthService.register(form.email, form.username, form.password).then(
      function (data, status, headers, config) {
        $rootScope.$broadcast('gonevisDash.AuthService:Registered');
        form.errors = null;
      },
      function (data, status, headers, config) {
        form.loading = false;
        form.errors = data.data;
      }
    );
  };

  $scope.$on('gonevisDash.AuthService:Registered', function () {
    AuthService.login($scope.form.username, $scope.form.password).then(
      function (data, status, headers, config) {
        AuthService.setAuthenticatedUser(data.data.user);
        AuthService.setToken(data.data.token);

        $rootScope.$broadcast('gonevisDash.AuthService:Authenticated');
        $mdToast.showSimple('Welcome ' + data.data.user.username);
      }
    );
  });

  constructor();
}

app.controller("SignupController", SignupController);
SignupController.$inject = ['$scope', '$rootScope', '$state', '$mdToast', 'AuthService'];
