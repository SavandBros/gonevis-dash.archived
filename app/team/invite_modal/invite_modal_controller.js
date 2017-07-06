"use strict";

/**
 * @name TeamInviteModalController
 *
 * @param $scope
 * @param $rootScope
 * @param toaster
 * @param API
 * @param AuthService
 * @param Codekit
 * @param ModalsService
 */
function TeamInviteModalController($scope, $rootScope, toaster, API, AuthService, Codekit, ModalsService) {

  var site = AuthService.getCurrentSite();

  /**
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.form = {
      data: {}
    };

    $scope.teamRoles = angular.copy(Codekit.teamRoles);
    $scope.teamRoles.splice(0, 1);
    $scope.form.data.role = $scope.teamRoles[1].id;
  }

  /**
   * @method invite
   * @desc Invite people into the team
   * 
   * @param form {Object}
   */
  $scope.invite = function (form) {
    form.loading = true;

    API.TeamInvite.put({ siteId: site }, form.data,
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
