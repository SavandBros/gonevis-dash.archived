"use strict";

function TeamController($scope, API, AuthService, Codekit, ModalsService) {

  var site = AuthService.getCurrentSite();

  function constructor() {
    $scope.user = AuthService.getAuthenticatedUser();
    $scope.teamRoles = Codekit.teamRoles;

    API.Team.get({ siteId: site },
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
  "ModalsService"
];
