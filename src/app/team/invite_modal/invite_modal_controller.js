"use strict";

import app from "../../app";

function TeamInviteModalController($scope, $rootScope, toaster, API, AuthService, Codekit, ModalsService, $translate) {

  function constructor() {
    $scope.form = {
      data: {}
    };

    $scope.teamRoles = angular.copy(Codekit.teamRoles);
    $scope.teamRoles.splice(0, 1);
    $scope.form.data.role = $scope.teamRoles[1].id;
  }

  /**
   * @desc Invite people into the team
   *
   * @param {object} form
   */
  $scope.invite = function(form) {
    form.loading = true;

    API.TeamPromote.put({
        siteId: AuthService.getCurrentSite()
      }, form.data,
      function(data) {
        $rootScope.$broadcast("gonevisDash.TeamService.invite", data);
        ModalsService.close("invite");
        $translate(
          ["INVITED", "TEAM_INVITED_MEMBER"],
          {"email": form.data.email, "role": $scope.teamRoles[form.data.role - 1].label.toLowerCase()}
        ).then(function(translations) {
          toaster.success(translations.INVITED, translations.TEAM_INVITED_MEMBER);
        });
      },
      function(data) {
        // Check if blog has reached maximum number of team members.
        if (data.data.non_field_errors[0]) {
          $translate("REACHED_MAX_TEAM_MEMBER").then(function(translations) {
            toaster.error(translations);
          });
          // Close modal
          ModalsService.close("invite");
        }
        form.errors = data.data;
        form.loading = false;
      }
    );
  };

  constructor();
}

app.controller("TeamInviteModalController", TeamInviteModalController);
