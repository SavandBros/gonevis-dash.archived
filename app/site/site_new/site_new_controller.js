"use strict";

/**
 * @class SiteNewController
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $stateParams
 * @param API
 * @param AuthService
 * @param toaster
 */
function SiteNewController($scope, $rootScope, $state, $stateParams, API, AuthService, toaster) {

  /**
   * @method constructor
   * @desc Init function for controller
   */
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
   * @method createSite
   * @desc create site via api call
   *
   * @param form {Object}
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
