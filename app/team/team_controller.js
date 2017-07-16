"use strict";

<<<<<<< HEAD
function TeamController($scope, API, AuthService, Codekit, ModalsService) {

  var site = AuthService.getCurrentSite();
=======
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
>>>>>>> d850cb100a90949f39ce90db90d478335bb5177b

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
   * @desc Open up invite modal
   */
  $scope.invite = function () {
    ModalsService.open("invite", "TeamInviteModalController");
  };

  /**
   * @desc Team view via modal
   *
   * @param {object} team
   */
  $scope.view = function (team) {
    ModalsService.open("team", "TeamModalController", { team: team });
  };

  /**
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
