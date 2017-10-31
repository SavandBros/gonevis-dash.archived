"use strict";

function ActionsController($scope, $state, $stateParams, AuthService) {

  function constructor() {
    $scope.params = $stateParams;
    $scope.user = AuthService.getAuthenticatedUser(true);

    if ($scope.params.action && $scope.params.actionParam) {
      if ($scope.params.action == "dashboard") {
        angular.forEach($scope.user.getSites(), function(site, index) {
          if ($scope.params.actionParam == site.id) {
            $state.go("dash.main", {
              s: index
            })
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
