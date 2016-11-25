"use strict";

/**
 * @ngdoc function
 * @name gonevisDash.controller:TeamController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $mdToast
 * @param AuthService
 * @param Codekit
 * @param ModalsService
 */
function TeamController($scope, $rootScope, $state, $mdToast, API, AuthService, Codekit, ModalsService) {

  var site = AuthService.getCurrentSite();

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.teamRoles = Codekit.teamRoles;

    API.Team.get({ site_id: site },
      function (data) {
        $scope.initialled = true;
        $scope.team = data;
        $scope.team.list = data.team;

        for (var i in data.team_pending) {
          data.team_pending[i].isPending = true;
          $scope.team.list.push(data.team_pending[i]);
        }
      }
    );
  }

  $scope.remove = function (team) {
    var api, payload = {};

    if (team.isPending) {
      api = API.RemoveTeamPending;
      payload = { email: team.email };

    } else if (!team.isPending) {
      api = API.RemoveTeam;
      payload = { team_member_id: team.user.id };
    }

    api.put({ site_id: site }, payload,
      function () {
        team.isRemoved = true;
        $mdToast.showSimple("user removed from team");
      },
      function () {
        $mdToast.showSimple("Something went wrong... We couldn't remove team");
      }
    );
  };

  $scope.invite = function () {
    ModalsService.open("invite", "TeamInviteModalController");
  };

  $scope.$on("gonevisDash.inviteService.invite", function () {
    constructor();
  });

  constructor();
}

app.controller("TeamController", TeamController);
TeamController.$inject = [
  "$scope",
  "$rootScope",
  "$state",
  "$mdToast",
  "API",
  "AuthService",
  "Codekit",
  "ModalsService"
];
