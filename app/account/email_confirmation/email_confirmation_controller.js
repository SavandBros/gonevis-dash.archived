"use strict";

/**
 * @class EmailConfirmationController
 *
 * @param $scope
 * @param $state
 * @param API
 */
function EmailConfirmationController($scope, $state, API) {

  /**
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.loading = true;
    API.EmailConfirmation.save({token: $state.params.token}, {},
      function () {
        $scope.loading = false;
        $state.go("signin");
      }, function () {
        $scope.loading = false;
        $scope.error = true;
      }
    );
  }

  constructor();
}

app.controller("EmailConfirmationController", EmailConfirmationController);
EmailConfirmationController.$inject = [
  "$scope",
  "$state",
  "API"
];
