"use strict";

/**
 * @class SiteController
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $stateParams
 * @param $mdToast
 * @param API
 * @param ModalsService
 * @param AuthService
 * @param DolphinService
 */
function SiteController($scope, $rootScope, $state, $stateParams, $mdToast,
  API, ModalsService, AuthService, DolphinService) {

  var site = AuthService.getCurrentSite();

  /**
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.user = AuthService.getAuthenticatedUser();
    $scope.site = $scope.user.sites[$stateParams.s];
    $scope.dolphinService = DolphinService;

    API.Site.get({ site_id: site },
      function (data) {
        $scope.site = data;
      }
    );

    API.SiteTemplateConfig.get({ site_id: site },
      function (data) {
        $scope.siteTemplate = data.template_config;
      }
    );
  }

  /**
   * @method updateSite
   * @desc update site via api call
   *
   * @param key {String}
   * @param value {String}
   */
  $scope.updateSite = function (key, value) {

    var keyString = key.replace("_", " ");

    $mdToast.showSimple("Updating " + keyString + "...");

    var payload = {};
    payload[key] = value;

    API.SiteUpdate.put({ site_id: site }, payload,
      function (data) {
        $scope.site[key] = data[key];
        $mdToast.showSimple("Site" + keyString + " updated");
      },
      function () {
        $mdToast.showSimple("Oh... Couldn't update " + keyString);
      }
    );
  };

}

app.controller("SiteController", SiteController);
SiteController.$inject = [
  "$scope",
  "$rootScope",
  "$state",
  "$stateParams",
  "$mdToast",
  "API",
  "ModalsService",
  "AuthService",
  "DolphinService"
];
