"use strict";

/**
 * @class RunForestRun
 *
 * @param $rootScope
 * @param $mdToast
 * @param $state
 * @param editableOptions
 * @param ModalsService
 * @param AuthService
 */
function RunForestRun($rootScope, $mdToast, $state, editableOptions, ModalsService, AuthService) {

  /**
   * @desc Editable texts config
   */
  editableOptions.theme = "bs3";

  /**
   * @event $stateChangeStart
   * @desc Starting to change state callback
   *
   * @param event {Event}
   * @param toState {Object}
   * @param toParams {Object}
   */
  $rootScope.$on("$stateChangeStart", function (event, toState, toParams) {
    // Check authentication
    if (toState.auth === true && !AuthService.isAuthenticated() ||
      toState.auth === false && AuthService.isAuthenticated()) {
      event.preventDefault();
    }

    // Check current site
    if (!toParams.s) {
      ModalsService.open("sites");
    }
  });

  /**
   * @event $viewContentLoaded
   * @desc Load view content of state callback
   */
  $rootScope.$on("$viewContentLoaded", function () {
    // Invalid state
    if (!$state.current.name) {
      if (AuthService.isAuthenticated()) {
        $state.go("dash.main", { s: 0 });
      } else {
        $state.go("signin");
      }
    }
  });
}

app.run(RunForestRun);
RunForestRun.$inject = [
  "$rootScope",
  "$mdToast",
  "$state",
  "editableOptions",
  "ModalsService",
  "AuthService"
];
