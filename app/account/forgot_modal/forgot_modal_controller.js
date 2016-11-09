"use strict";

/**
 * @ngdoc function
 * @name gonevisDash.controller:ForgotModalController
 * Controller of the gonevisDash
 * 
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $mdToast
 * @param API
 */
function ForgotModalController($scope, $rootScope, $state, $mdToast, API) {

  /**
   * forgotPassword
   *
   * @method forgotPassword
   * @desc forgot password handler
   *
   * @param form {object}
   */
  $scope.forgotPassword = function (form) {
    form.loading = true;

    API.ForgotPassword.save(form,
      function (data) {
        form.loading = false;
        form.errors = null;
        $scope.success = true;

        $mdToast.showSimple("Validation link sended!");
      },
      function (data) {
        form.loading = false;
        form.errors = data.data;
      }
    );
  }

}

app.controller("ForgotModalController", ForgotModalController);
ForgotModalController.$inject = [
  "$scope",
  "$rootScope",
  "$state",
  "$mdToast",
  "API",
];
