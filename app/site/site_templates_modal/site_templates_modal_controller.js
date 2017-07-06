"use strict";

/**
 * @class SiteTemplatesModalController
 *
 * @param $scope
 * @param $rootScope
 * @param API
 * @param AuthService
 * @param currentTemplate
 * @param site
 */
function SiteTemplatesModalController($scope, $rootScope, API, AuthService, currentTemplate, site) {

  /**
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.site = site;
    $scope.current = currentTemplate;

    API.SiteTemplates.get({ siteId: AuthService.getCurrentSite() },
      function (data) {
        $scope.siteTemplates = data.templates;
      }
    );
  }

  /**
   * @method setTemplate
   * @desc Sets site template
   *
   * @param template {Object}
   */
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
  "currentTemplate",
  "site"
];
