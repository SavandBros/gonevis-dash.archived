"use strict";

function SiteNewController($scope, $rootScope, $state, $stateParams, API, AuthService, toaster) {

  function constructor() {
    $scope.user = AuthService.getAuthenticatedUser(false);

    // Get site from param
    if ($stateParams.site) {
      var name = $stateParams.site.split(".")[0];
      if (name.length >= 3) {
        $scope.form = { url: name };
      }
    }
  }

  /**
   * @desc create site via api call
   *
   * @param {object} form
   */
  $scope.createSite = function (form) {
    form.loading = true;

    API.SiteNew.save(form,
      function (data) {
        form.loading = false;
        var index = $scope.user.sites.push(data);
        AuthService.setAuthenticatedUser($scope.user);
        $rootScope.$broadcast("gonevisDash.SiteNewController:Create");

        toaster.success("Awesome", "Created " + data.title + ".");
        $state.go("dash.main", { s: index - 1 });
      },
      function (data) {
        form.errors = data.data;
        form.loading = false;
      }
    );
  };

  constructor();
}

app.controller("SiteNewController", SiteNewController);
SiteNewController.$inject = [
  "$scope",
  "$rootScope",
  "$state",
  "$stateParams",
  "API",
  "AuthService",
  "toaster"
];
