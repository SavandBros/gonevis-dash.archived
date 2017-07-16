"use strict";

function TeamInviteModalController($scope, $rootScope, toaster, API, AuthService, Codekit, ModalsService) {

  function constructor() {
    $scope.form = {
      data: {}
    };

    $scope.teamRoles = angular.copy(Codekit.teamRoles);
    $scope.teamRoles.splice(0, 1);
    $scope.form.data.role = $scope.teamRoles[1].id;
  }

  /**
   * @desc Invite people into the team
   * 
   * @param {object} form
   */
  $scope.invite = function (form) {
    form.loading = true;

    API.TeamInvite.put({ siteId: AuthService.getCurrentSite() }, form.data,
      function (data) {
        $rootScope.$broadcast("gonevisDash.TeamService.invite", data);
        ModalsService.close("invite");
        toaster.success(
          "Invited",
          "Invited " + form.data.email + " as " + $scope.teamRoles[form.data.role - 1].label.toLowerCase() + " into the team."
        );
      },
      function (data) {
        form.errors = data.data;
        form.loading = false;
      }
    );
  };

  constructor();
}

app.controller("TeamInviteModalController", TeamInviteModalController);
TeamInviteModalController.$inject = [
  "$scope",
  "$rootScope",
  "toaster",
  "API",
  "AuthService",
  "Codekit",
  "ModalsService"
];
