"use strict";

function RunForestRun($rootScope, $mdToast, $state, editableOptions, ModalsService, AuthService) {
  editableOptions.theme = "bs3";

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

  $rootScope.$on("$viewContentLoaded",
    function () {
      if (!$state.current.name) {
        if (AuthService.isAuthenticated()) {
          $state.go("dash.main", { s: 0 });
        } else {
          $state.go("signin");
        }
      }
    }
  );
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
