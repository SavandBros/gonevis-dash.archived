"use strict";

/**
 * @class TeamController
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $mdToast
 * @param API
 * @param AuthService
 * @param Codekit
 * @param ModalsService
 */
function TeamController($scope, $rootScope, $state, $mdToast, API, AuthService, Codekit, ModalsService) {

  var site = AuthService.getCurrentSite();

  /**
   * @method constructor
   * @desc Init function for controller
   */
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

  $scope.$on("gonevisDash.TeamService.invite", function () {
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
