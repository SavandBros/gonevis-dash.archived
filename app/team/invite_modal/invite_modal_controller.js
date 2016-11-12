"use strict";

/**
 * @ngdoc function
 * @name gonevisDash.controller:TeamInviteModalController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $mdToast
 * @param AuthService
 * @param Codekit
 */
function TeamInviteModalController($scope, $rootScope, $state, $mdToast, API, AuthService, Codekit) {

  var site = AuthService.getCurrentSite();

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.teamRoles = Codekit.teamRoles;
    $scope.teamRoles.splice(0, 1);
    $scope.form.role = $scope.teamRoles[1].id;
  }

  /**
   * invite
   *
   * @method invite
   * @desc for inviting users
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
  }

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
  "Codekit"
];
