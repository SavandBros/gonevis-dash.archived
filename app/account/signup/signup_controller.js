"use strict";

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
 * @param API
 */
function SignupController($scope, $rootScope, $state, $mdToast, AuthService, API) {

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
      $state.go("main");
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

    API.Signup.post({
        email: form.email,
        username: form.username,
        password: form.password
      },
      function () {
        $rootScope.$broadcast("gonevisDash.AuthService:Registered");
        form.errors = [];
      },
      function (data) {
        form.loading = false;
        form.errors = data.data;
      }
    );
  };

  $scope.$on("gonevisDash.AuthService:Registered", function () {
    API.Signin.post({
        username: $scope.form.username,
        password: $scope.form.password
      },
      function (data) {
        AuthService.setAuthenticatedUser(data.user);
        AuthService.setToken(data.token);

        $rootScope.$broadcast("gonevisDash.AuthService:Authenticated");
        $mdToast.showSimple("Welcome " + data.user.username);
        $state.go("dash.site-new");
      }
    );
  });

  constructor();
}

app.controller("SignupController", SignupController);
SignupController.$inject = [
  "$scope",
  "$rootScope",
  "$state",
  "$mdToast",
  "AuthService",
  "API"
];
