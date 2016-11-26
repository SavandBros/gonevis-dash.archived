"use strict";

/**
 * @name TeamInviteModalController
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $mdToast
 * @param AuthService
 * @param Codekit
 * @param ModalsService
 */
function TeamInviteModalController($scope, $rootScope, $state, $mdToast, API, AuthService, Codekit, ModalsService) {

  var site = AuthService.getCurrentSite();

  /**
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.teamRoles = Codekit.teamRoles;
    $scope.teamRoles.splice(0, 1);
    $scope.form.role = $scope.teamRoles[1].id;
  }

  /**
   * @method invite
   * @desc Invite people into the team
   * 
   * @param form {Object}
   */
  $scope.invite = function (form) {
    form.loading = true;

    API.TeamInvite.put({ site_id: site }, form,
      function (data) {
        form.errors = null;
        form.loading = true;
        $mdToast.showSimple("Invite completed");
        $rootScope.$broadcast('gonevisDash.inviteService.invite', data);
      },
      function (data) {
        form.errors = true;
        $mdToast.showSimple("Sorry, couldn't invite");
        console.log(data);
      }
    );
  };

  constructor();
}

app.controller("TeamInviteModalController", TeamInviteModalController);
TeamInviteModalController.$inject = [
  "$scope",
  "$rootScope",
  "$state",
  "$mdToast",
  "API",
  "AuthService",
  "Codekit",
  "ModalsService"
];
