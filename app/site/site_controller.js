"use strict";

/**
 * @class SiteController
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $stateParams
 * @param toaster
 * @param API
 * @param ModalsService
 * @param AuthService
 * @param DolphinService
 */
function SiteController($scope, $rootScope, $state, $stateParams, toaster,
  API, ModalsService, AuthService, DolphinService, Codekit) {

  var site = AuthService.getCurrentSite();
  var toasters = {};

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

    toasters[key] = toaster.info("Updating " + keyString + "...");

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

        toaster.clear(toasters[key]);
        toaster.info("Done", "Site " + keyString + " updated", 3000);
      },
      function () {
        toaster.error("", "Oh... Couldn't update " + keyString);
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
        // Remove site from user object
        $scope.user.sites.splice(Codekit.getIndex($scope.user.sites, site));
        // Update local user object
        AuthService.setAuthenticatedUser($scope.user);
        // Announce site removal
        $rootScope.$broadcast("gonevisDash.SiteController:remove");
        toaster.success("Done", "Site deleted");
        // Go to main or new site page if has no other sites
        $state.go($scope.user.sites ? "dash.main" : "site-new");
      },
      function () {
        toaster.error("Oops", "Something went wrong, couldn't delete site");
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
        toaster.info("Done", "Site template updated");
      },
      function (data) {
        $scope.loadingTemplate = false;
        toaster.error("Oops", data.detail ? data.detail : "Something went wrong, couldn't update site template.");        
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
        toaster.info("Done", "Site template updated");
      },
      function () {
        toaster.error("", "Oh... Couldn't update site template.");
      }
    );
  });

  $scope.siteTemplates = function () {
    ModalsService.open("siteTemplates", "SiteTemplatesModalController", {
      site: $scope.site,
      currentTemplate: $scope.siteTemplate
    });
  };

  constructor();
}

app.controller("SiteController", SiteController);
SiteController.$inject = [
  "$scope",
  "$rootScope",
  "$state",
  "$stateParams",
  "toaster",
  "API",
  "ModalsService",
  "AuthService",
  "DolphinService",
  "Codekit"
];
