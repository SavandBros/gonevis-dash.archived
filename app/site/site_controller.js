"use strict";

function SiteController($scope, $rootScope, $state, $stateParams, toaster,
  API, ModalsService, AuthService, DolphinService, Codekit) {

  var site = AuthService.getCurrentSite();
  var toasters = {};

  function constructor() {
    $scope.user = AuthService.getAuthenticatedUser(false);
    $scope.site = $scope.user.sites[$stateParams.s];
    $scope.dolphinService = DolphinService;
    $scope.postPerPage = new Array(25);

    API.SiteSettings.get({
        siteId: site
      },
      function(data) {
        $scope.site = data;
        Codekit.setTitle($scope.site.title);
      }
    );

    API.SiteTemplateConfig.get({
        siteId: site
      },
      function(data) {
        $scope.siteTemplate = data.template_config;
        $scope.siteTemplate.hasFields = !Codekit.isEmptyObj($scope.siteTemplate.fields);
      }
    );
  }

  /**
   * @desc update site via api call
   *
   * @param {string} key
   * @param {string} value
   */
  $scope.updateSite = function(key, value) {

    var keyString = key.replace("_", " ");

    toasters[key] = toaster.info("Updating " + keyString + "...");

    var payload = {};
    payload[key] = value;

    API.SiteUpdate.put({
        siteId: site
      }, payload,
      function(data) {
        if (key === "cover_image" || key === "logo") {
          $scope.site.media[key] = data.media[key];
        } else {
          $scope.site[key] = data[key];
        }

        $scope.user.sites[$stateParams.s][key] = data[key];
        AuthService.setAuthenticatedUser($scope.user);

        $rootScope.$broadcast("gonevisDash.SiteController:update");

        toaster.clear(toasters[key]);
        toaster.info("Done", "Site " + keyString + " updated", 3000);
      },
      function() {
        toaster.error("Error", "Something went wrong, couldn't update " + keyString);
      }
    );
  };

  /**
   * @desc Delete site via API call
   */
  $scope.remove = function() {
    // How sure? Like confirm-a-confirm sure?
    if (window.prompt(
        "Delete site?\nDeleting site can not be undone!\n\nType in the site title to confirm:"
      ) !== $scope.site.title) {
      return;
    }

    API.Site.delete({
        siteId: site
      },
      function() {
        // Remove site from user object
        $scope.user.sites.splice($stateParams.s, 1);
        // Update local user object
        AuthService.setAuthenticatedUser($scope.user);
        // Announce site removal
        $rootScope.$broadcast("gonevisDash.SiteController:remove");
        toaster.success("Done", "Site deleted");
        // Go to main or new site page if has no other sites
        $state.go($scope.user.sites.length > 0 ? "dash.main" : "site-new");
      },
      function() {
        toaster.error("Error", "Something went wrong, couldn't delete site");
      }
    );
  };

  /**
   * @desc Select image for logo/cover
   *
   * @param {string} image Image property of site (logo, cover, etc)
   */
  $scope.selectImage = function(image) {
    $scope.editing = image;
    $scope.dolphinService.viewSelection("siteImage");
  };

  /**
   * @desc Save template config
   */
  $scope.saveConfig = function() {
    $scope.loadingTemplate = true;

    API.SetSiteTemplateConfig.put({
        siteId: site
      }, {
        config_fields: $scope.siteTemplate.fields
      },
      function() {
        $scope.loadingTemplate = false;
        toaster.info("Done", "Site template updated");
      },
      function(data) {
        $scope.loadingTemplate = false;
        toaster.error("Error", data.detail ? data.detail : "Something went wrong, we couldn't update site template.");
      }
    );
  };

  /**
   * @desc Open modal
   */
  $scope.siteTemplates = function() {
    ModalsService.open("siteTemplates", "SiteTemplatesModalController", {
      site: $scope.site,
      currentTemplate: $scope.siteTemplate
    });
  };

  /**
   * @desc Image selection callback
   *
   * @param {Event} event
   * @param {Dolphin} dolphin
   * @param {string} source
   */
  $scope.$on("gonevisDash.Dolphin:select", function(data, dolphin, source) {
    if (source === "siteImage") {
      $scope.site.media[$scope.editing] = dolphin ? dolphin.get.id : null;
      $scope.updateSite($scope.editing, dolphin ? dolphin.get.id : null);
    }
  });

  /**
   * @desc Set template callback
   *
   * @param {Event} event
   * @param {object} data
   */
  $scope.$on("gonevisDash.SiteTemplatesModalController:setTemplate", function(event, data) {
    $scope.loadingTemplate = true;

    API.SiteSetTemplate.put({
        siteId: site
      }, {
        site_template_id: data.template.id
      },
      function() {
        $scope.loadingTemplate = false;
        $scope.siteTemplate = data.template.config;
        $scope.siteTemplate.hasFields = !Codekit.isEmptyObj(
          $scope.siteTemplate.fields
        );

        toaster.info("Done", "Site template updated");
      },
      function() {
        toaster.error("Error", "Something went wrong, we couldn't update site template.");
      }
    );
  });

  /**
   * @desc Open modal
   */
  $scope.siteTemplates = function() {
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
