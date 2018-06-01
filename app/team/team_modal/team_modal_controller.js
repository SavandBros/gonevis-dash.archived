"use strict";

var app = require("../../app_module");
function TeamModalController($scope, toaster, API, team, Codekit, AuthService, ModalsService) {

  var site = AuthService.getCurrentSite();

  function constructor() {
    $scope.user = AuthService.getAuthenticatedUser(true);
    $scope.team = team;
    $scope.teamRoles = Codekit.teamRoles;
  }

  /**
   * @desc Remove a user from team
   *
   * @param {object} team
   */
  $scope.remove = function(team) {
    team.title = team.user.get.email ? team.user.get.email : team.user.get.name;

    if (team.isPending) {
      team.title = team.email;
    }

    if (!confirm("Remove from team?\n\nAre you sure you want to remove '" + team.title + "' from team?")) {
      return;
    }

    var api = API.RemoveTeamPending;
    var payload = {
      email: team.email
    };

    if (!team.isPending) {
      api = API.RemoveTeam;
      payload = {
        team_member_id: team.user.get.id
      };
    }

    api.put({
        siteId: site
      }, payload,
      function() {
        team.isRemoved = true;
        ModalsService.close("team");
        toaster.success(
          "Removed",
          team.title + " (" + $scope.teamRoles[team.role].label.toLowerCase() + ") from team."
        );
      },
      function() {
        toaster.error("Error", "Something went wrong, couldn't remove team.");
      }
    );
  };

  /**
   * @desc Change team member role
   * 
   * @param {string} email
   * @param {object} role
   */
  $scope.setRole = function(email, role) {
    var payload = {
      email: email,
      role: role.id
    };

    API.TeamPromote.put({
        siteId: site
      }, payload,
      function(data) {
        team.role = data.role;
        toaster.info(
          "Done",
          "Changed role to " + role.label
        );
      }
    )
  }

  constructor();
}

app.controller("TeamModalController", TeamModalController);
TeamModalController.$inject = [
  "$scope",
  "toaster",
  "API",
  "team",
  "Codekit",
  "AuthService",
  "ModalsService"
];

module.exports = TeamModalController;
