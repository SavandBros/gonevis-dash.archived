"use strict";

var app = require("../../app_module");

function ActionsController($scope, $state, $stateParams, AuthService) {

  function constructor() {
    $scope.params = $stateParams;
    $scope.user = AuthService.getAuthenticatedUser(true);

    // We have action and param
    if ($scope.params.action && $scope.params.actionParam) {

      // Dashboard
      if ($scope.params.action === "dashboard") {

        // Find site by given id
        angular.forEach($scope.user.getSites(), function(site, index) {
          if ($scope.params.actionParam === site.id) {
            // Go to site dashboard
            $state.go("dash.main", { s: index });
          }
        });
      }
    }
  }

  constructor();
}

app.controller("ActionsController", ActionsController);
ActionsController.$inject = [
  "$scope",
  "$state",
  "$stateParams",
  "AuthService"
];
