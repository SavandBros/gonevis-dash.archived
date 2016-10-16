"use strict";

app.run(function ($rootScope, editableOptions, ModalsService) {
  editableOptions.theme = "bs3";

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    if (!toParams.s) {
      ModalsService.open("sites");
    };
  });
});
