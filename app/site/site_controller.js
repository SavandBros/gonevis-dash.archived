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
