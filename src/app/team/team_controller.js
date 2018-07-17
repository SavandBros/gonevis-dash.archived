"use strict";

import app from "../app";

function TeamController($scope, $rootScope, API, AuthService, Codekit, ModalsService, Account) {

  let site = AuthService.getCurrentSite();

  function constructor() {
    // Check permission
    if ($rootScope.isRestrict) {
      return false;
    }

    $scope.codekit = Codekit;
    $scope.teamRoles = Codekit.teamRoles;

    API.Team.get({
        siteId: site
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
