'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:PasswordResetController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $mdToast
 * @param $stateParams
 * @param API
 * @param AuthenticationService
 */
function PasswordResetController($scope, $rootScope, $state, $mdToast, $stateParams, API, AuthenticationService) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.user = AuthenticationService.getAuthenticatedUser();
  };

  /**
   * updateTag
   *
   * @method updateTag
   * @desc for updating tag details
   * 
   * @param form {object}
   */
  $scope.passwordReset = function (form) {
    form.loading = true;

    API.PasswordReset.save(form,
      function (data, status, headers, config) {
        form.loading = false;
        $mdToast.showSimple('Password has been reset');
        form.errors = null;
      },
      function (data, status, headers, config) {
        form.loading = false;
        form.errors = data.data;
      }
    );
  }

  constructor();
}

app.controller("PasswordResetController", PasswordResetController);
PasswordResetController.$inject = ['$scope', '$rootScope', '$state', '$mdToast', '$stateParams', 'API', 'AuthenticationService'];
