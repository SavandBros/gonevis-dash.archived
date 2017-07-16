"use strict";

function TeamModalController($scope, toaster, API, team, Codekit, AuthService, ModalsService) {

<<<<<<< HEAD
  var site = AuthService.getCurrentSite();

=======
  /**
   * @method constructor
   * @desc Init function for controller
   */
>>>>>>> d850cb100a90949f39ce90db90d478335bb5177b
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
  $scope.remove = function (team) {
    team.title = team.email ? team.email : team.user.name;

    if (!confirm("Remove from team?\n\nAre you sure you want to remove '" + team.title + "' from team?")) {
      return;
    }

    var api = API.RemoveTeamPending;
    var payload = { email: team.email };

    if (!team.isPending) {
      api = API.RemoveTeam;
      payload = { team_member_id: team.user.id };
    }

    api.put({ siteId: AuthService.getCurrentSite() }, payload,
      function () {
        team.isRemoved = true;
        ModalsService.close("team");
        toaster.success(
          "Removed",
          "Removed " + team.title + " (" + $scope.teamRoles[team.role].label.toLowerCase() + ") from team."
        );
      },
      function () {
        toaster.error("Error", "Something went wrong, couldn't remove team.");
      }
    );
  };

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
