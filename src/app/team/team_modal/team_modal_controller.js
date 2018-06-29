"use strict";

import app from "../../app";

function TeamModalController($scope, toaster, API, team, Codekit, AuthService, ModalsService, $translate) {

  var site = AuthService.getCurrentSite();

  function constructor() {
    $scope.user = AuthService.getAuthenticatedUser(true);
    $scope.team = team;
    $scope.teamRoles = Codekit.teamRoles;
    $scope.codekit = Codekit;
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

    if (!confirm($translate.instant("REMOVE_TEAM_MEMBER_PROMPT", {"title": team.title}))) {
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
        $translate(
          ["REMOVED", "REMOVED_TEAM_MEMBER"],
          {"title":team.title, "role": $scope.teamRoles[team.role].label.toLowerCase()}
        ).then(function(translations) {
          toaster.success(translations.REMOVED, translations.REMOVED_TEAM_MEMBER);
        });
      },
      function() {
        $translate(["ERROR", "REMOVE_TEAM_MEMBER_ERROR"]).then(function(translations) {
          toaster.error(translations.ERROR, translations.REMOVE_TEAM_MEMBER_ERROR);
        });
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
      function() {
        team.role = payload.role;
        $translate(["DONE", "TEAM_CHANGED_ROLE"], {"role": role.label}).then(function(translations) {
          toaster.info(translations.DONE, translations.TEAM_CHANGED_ROLE);
        });
      }
    );
  };

  constructor();
}

app.controller("TeamModalController", TeamModalController);
