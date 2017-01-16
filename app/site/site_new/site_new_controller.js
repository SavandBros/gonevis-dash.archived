"use strict";

/**
 * @class SiteNewController
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $mdToast
 * @param API
 * @param AuthService
 */
function SiteNewController($scope, $rootScope, $state, $mdToast, API, AuthService) {

  /**
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.user = AuthService.getAuthenticatedUser();
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
        AuthService.updateAuth($scope.user);
        $mdToast.showSimple('Site ' + data.title + ' created');
        $state.go('dash.entry-new', { s: index - 1 });
        $rootScope.$broadcast("gonevisDash.SiteNewController:Create");
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
  "$mdToast",
  "API",
  "AuthService"
];
