"use strict";

/**
 * @class SiteTemplatesModalController
 *
 * @param $scope
 * @param $rootScope
 * @param API
 * @param AuthService
 */
function SiteTemplatesModalController($scope, $rootScope, API, AuthService) {

  var site = AuthService.getCurrentSite();

  /**
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {

    API.SiteTemplates.get({siteId: site},
      function (data) {
        $scope.siteTemplates = data.templates;
      }
    );
  }

  $scope.setTemplate = function(template) {
    $rootScope.$broadcast("gonevisDash.SiteTemplatesModalController:setTemplate", {
      data: template
    });
  };

  constructor();
}

app.controller("SiteTemplatesModalController", SiteTemplatesModalController);
SiteTemplatesModalController.$inject = [
  "$scope",
  "$rootScope",
  "API",
  "AuthService"
];
