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
function SigninController($scope, $rootScope, $state, $mdToast, AuthService) {

  // Signin form
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
      $state.go('dash.main');
    }
  };

  /**
   * signin
   *
   * @method signin
   * @desc Submit signin form to authenticate
   *
   * @param form {object}
   */
  $scope.signin = function (form) {
    form.loading = true;

    AuthService.login(form.username, form.password).then(
      function (data, status, headers, config) {
        form.loading = false;
        form.errors = null;

        AuthService.setAuthenticatedUser(data.data.user);
        AuthService.setToken(data.data.token);

        $rootScope.$broadcast('gonevisDash.AuthService:Authenticated');
        $mdToast.showSimple('Welcome ' + data.data.user.username);
      },
      function (data, status, headers, config) {
        form.loading = false;
        form.errors = data.data;
      }
    );
  }

  constructor();
}

app.controller("SigninController", SigninController);
SigninController.$inject = ['$scope', '$rootScope', '$state', '$mdToast', 'AuthService'];