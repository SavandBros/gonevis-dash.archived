"use strict";

/**
 * @ngdoc function
 * @name gonevisDash.controller:TeamInviteController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $mdToast
 * @param AuthService
 */
function TeamInviteController($scope, $rootScope, $state, $mdToast, API, AuthService) {

  var site = AuthService.getCurrentSite();

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.roles = [
      { name: "Administrator", id: 1 },
      { name: "Editor", id: 2 }
    ];
  }

  $scope.invite = function (form) {
    form.loading = true;

    API.TeamInvite.save({ site_id: site }, form,
      function (data) {
        form.errors = null;
        form.loading = true;
        $mdToast.showSimple("Invite completed");
      },
      function (data) {
        form.errors = true;
        $mdToast.showSimple("Sorry, couldn't invite");

      }
    );
  }

  constructor();
}

app.controller("TeamInviteController", TeamInviteController);
TeamInviteController.$inject = [
  "$scope",
  "$rootScope",
  "$state",
  "$mdToast",
  "API",
  "AuthService"
];
