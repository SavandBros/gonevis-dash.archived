"use strict";

var app = require("../app_module");
function TeamController($scope, API, AuthService, Codekit, ModalsService, Account) {

  function constructor() {
    $scope.teamRoles = Codekit.teamRoles;

    API.Team.get({
        siteId: AuthService.getCurrentSite()
      },
      function(data) {
        $scope.initialled = true;
        $scope.team = data;
        $scope.team.list = data.team;

        for (var i in data.team_pending) {
          data.team_pending[i].isPending = true;
          $scope.team.list.push(data.team_pending[i]);
        }

        angular.forEach($scope.team.list, function(team) {
          team.user = new Account(team.user);
        });
      }
    );
  }

  /**
   * @desc Open up invite modal
   */
  $scope.invite = function() {
    ModalsService.open("invite", "TeamInviteModalController");
  };

  /**
   * @desc Team view via modal
   *
   * @param {object} team
   */
  $scope.view = function(team) {
    ModalsService.open("team", "TeamModalController", {
      team: team
    });
  };

  /**
   * @desc Team invite callback
   */
  $scope.$on("gonevisDash.TeamService.invite", function() {
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

module.exports = TeamController;
