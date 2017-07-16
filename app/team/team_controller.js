"use strict";

/**
 * @class TeamController
 *
 * @param $scope
 * @param API
 * @param AuthService
 * @param Codekit
 * @param ModalsService
 */
function TeamController($scope, API, AuthService, Codekit, ModalsService, Account) {

  /**
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.teamRoles = Codekit.teamRoles;

    API.Team.get({ siteId: AuthService.getCurrentSite() },
      function (data) {
        $scope.initialled = true;
        $scope.team = data;
        $scope.team.list = data.team;

        for (var i in data.team_pending) {
          data.team_pending[i].isPending = true;
          $scope.team.list.push(data.team_pending[i]);
        }

        angular.forEach($scope.team.list, function (team) {
          team.user = new Account(team.user);
        });
      }
    );
  }

  /**
   * @method invite
   * @desc Open up invite modal
   */
  $scope.invite = function () {
    ModalsService.open("invite", "TeamInviteModalController");
  };

  /**
   * view
   *
   * @method view
   * @desc Team view via modal
   *
   * @param team {Object}
   */
  $scope.view = function (team) {
    ModalsService.open("team", "TeamModalController", { team: team });
  };

  /**
   * @event gonevisDash.TeamService.invite
   * @desc Team invite callback
   */
  $scope.$on("gonevisDash.TeamService.invite", function () {
    constructor();
  });

  constructor();
}

app.controller("TeamController", TeamController);
TeamController.$inject = [
  "$scope",
  "API",
  "AuthService",
  "Codekit",
  "ModalsService",
  "Account"
];
