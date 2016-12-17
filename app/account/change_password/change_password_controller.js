'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller ChangePasswordController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $mdToast
 * @param $stateParams
 * @param API
 * @param ModalsService
 * @param AuthService
 */
function ChangePasswordController($scope, $rootScope, $state, $mdToast, $stateParams, API, ModalsService, AuthService) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.user = AuthService.getAuthenticatedUser();
  };

  /**
   * changePassword
   *
   * @method changePassword
   * @desc for changing password
   * 
   * @param form {Object}
   */
  $scope.changePassword = function (form) {

    // Is a new password
    if (form.old_password == form.password) {
      return form.errors = {
        non_field_errors: ["Please, choose a new password."]
      };
    }
    // Check if Confirm new password and new password were matched, if so raise an error
    if (form.password !== form.confirm_password) {
      return form.errors = {
        non_field_errors: ["Confirm password does not match."]
      };
    }

    form.loading = true;
    form.errors = null;

    API.ChangePassword.save(form,
      function (data, status, headers, config) {
        form.loading = false;
        $mdToast.showSimple('Password Changed !');
        form.errors = null;
        $state.go('dash.user');
      },
      function (data, status, headers, config) {
        form.loading = false;
        form.errors = data.data;
      }
    );
  }

  $scope.forgotPassword = function () {
    ModalsService.open("forgotPassword", "ForgotModalController");
  }

  constructor();
}

app.controller('ChangePasswordController', ChangePasswordController);
ChangePasswordController.$inject = [
  '$scope',
  '$rootScope',
  '$state',
  '$mdToast',
  '$stateParams',
  'API',
  'ModalsService',
  'AuthService'
];
