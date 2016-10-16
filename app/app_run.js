"use strict";

app.run(function ($rootScope, $mdToast, editableOptions, ModalsService, AuthService) {
  editableOptions.theme = "bs3";

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    // Check authentication
    if (toState.auth === true && !AuthService.isAuthenticated() ||
      toState.auth === false && AuthService.isAuthenticated()) {
      event.preventDefault();
    };

    // Check current site
    if (!toParams.s) {
      ModalsService.open("sites");
    };
  });
});
