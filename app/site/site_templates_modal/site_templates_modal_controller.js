"use strict";

function SiteTemplatesModalController($scope, $rootScope, API, AuthService, currentTemplate, site) {

  function constructor() {
    $scope.site = site;
    $scope.current = currentTemplate;

    API.SiteTemplates.get({
        siteId: AuthService.getCurrentSite()
      },
      function(data) {
        $scope.siteTemplates = data.templates;
      }
    );
  }

  /**
   * @desc Sets site template
   *
   * @param {object} template
   */
  $scope.setTemplate = function(template) {
    $rootScope.$broadcast("gonevisDash.SiteTemplatesModalController:setTemplate", {
      template: template
    });
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
