"use strict";

/**
 * @class SiteTemplatesModalController
 *
 * @param $scope
 * @param $rootScope
 * @param API
 * @param AuthService
 */
function SiteTemplatesModalController($scope, $rootScope, API, AuthService, currentTemplate) {

  /**
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.current = currentTemplate;

    API.SiteTemplates.get({ siteId: AuthService.getCurrentSite() },
      function (data) {
        $scope.siteTemplates = data.templates;
      }
    );
  }

  $scope.setTemplate = function (template) {
    $rootScope.$broadcast("gonevisDash.SiteTemplatesModalController:setTemplate", { template: template });
  };

  constructor();
}

app.controller("SiteTemplatesModalController", SiteTemplatesModalController);
SiteTemplatesModalController.$inject = [
  "$scope",
  "$rootScope",
  "API",
  "AuthService",
  "currentTemplate"
];
