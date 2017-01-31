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
  API, ModalsService, AuthService, DolphinService, Codekit) {

  var site = AuthService.getCurrentSite();

  /**
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.user = AuthService.getAuthenticatedUser();
    $scope.site = $scope.user.sites[$stateParams.s];
    $scope.dolphinService = DolphinService;

    API.Site.get({ siteId: site },
      function (data) {
        $scope.site = data;
      }
    );

    API.SiteTemplateConfig.get({ siteId: site },
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

    API.SiteUpdate.put({ siteId: site }, payload,
      function (data) {
        if (key === "cover_image" || key === "logo") {
          $scope.site.media[key] = data.media[key];
        } else {
          $scope.site[key] = data[key];
        }
        var index = Codekit.getIndex($scope.user.sites, $scope.site);
        $scope.user.sites[index][key] = data[key];

        AuthService.setAuthenticatedUser($scope.user);
        $rootScope.$broadcast("gonevisDash.SiteController:update");
        $mdToast.showSimple("Site " + keyString + " updated");
      },
      function () {
        $mdToast.showSimple("Oh... Couldn't update " + keyString);
      }
    );
  };

  /**
   * @method remove
   * @desc Delete site via API call
   */
  $scope.remove = function () {
    // How sure? Like confirm-a-confirm sure?
    if (window.prompt(
        "Delete site?\nDeleting site can not be undone!\n\nType in the site title to confirm:"
      ) !== $scope.site.title) {
      return;
    }

    API.Site.delete({ siteId: site },
      function () {
        for (var i = 0; i < $scope.user.sites.length; i++) {
          if ($scope.user.sites[i].id === site) {
            $scope.user.sites.splice(i, 1);
          }
        }

        AuthService.updateAuth($scope.user);

        $rootScope.$broadcast("gonevisDash.SiteController:remove");
        $mdToast.showSimple("Site deleted");
        $state.go($scope.user.sites ? "site-new" : "dash.main");
      },
      function () {
        $mdToast.showSimple("Oh... Something went wrong, couldn't delete site");
      }
    );
  };

  /**
   * @method selectImage
   * @desc Select image for logo/cover
   *
   * @param image {String} Image property of site (logo, cover, etc)
   */
  $scope.selectImage = function (image) {
    $scope.editing = image;
    $scope.dolphinService.viewSelection();
  };

  /**
   * @method saveConfig
   * @desc Save template config
   */
  $scope.saveConfig = function () {
    $scope.loadingTemplate = true;

    API.SetSiteTemplateConfig.put({ siteId: site }, { config_fields: $scope.siteTemplate.fields },
      function () {
        $scope.loadingTemplate = false;
        $mdToast.showSimple("Site template updated.");
      },
      function (data) {
        $scope.loadingTemplate = false;
        $mdToast.showSimple(data.detail ? data.detail : "Oh... Something went wrong, couldn't update site template.");
      }
    );
  };

  $scope.$on("gonevisDash.DolphinService:select", function (data, dolphin) {
    $scope.site.media[$scope.editing] = dolphin ? dolphin.id : null;
    $scope.updateSite($scope.editing, dolphin ? dolphin.id : null);
  });

  $scope.$on("gonevisDash.SiteTemplatesModalController:setTemplate", function (event, data) {
    $scope.loadingTemplate = true;

    API.SiteSetTemplate.put({ siteId: site }, { site_template_id: data.template.id },
      function () {
        $scope.loadingTemplate = false;
        $scope.siteTemplate = data.template.config;
        $mdToast.showSimple("Site template updated.");
      },
      function () {
        $mdToast.showSimple("Oh... Couldn't update site template.");
      }
    );
  });

  $scope.siteTemplates = function () {
    ModalsService.open("siteTemplates", "SiteTemplatesModalController", { currentTemplate: $scope.siteTemplate });
  };

  constructor();
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
  "DolphinService",
  "Codekit"
];
