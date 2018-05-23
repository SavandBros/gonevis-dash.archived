"use strict";

function SiteController($scope, $rootScope, $state, $stateParams, $window, toaster,
  API, ModalsService, AuthService, DolphinService, Codekit) {

  var site = AuthService.getCurrentSite();
  var toasters = {};

  function getSiteSettings() {
    API.SiteSettings.get({ siteId: site }, function(data) {
      $scope.site = data;
      Codekit.setTitle($scope.site.title);
    });
  }

  function constructor() {
    $scope.user = AuthService.getAuthenticatedUser(false);
    $scope.site = $scope.user.sites[$stateParams.s];
    $scope.dolphinService = DolphinService;
    $scope.postPerPage = new Array(25);
    $scope.maxCustomDomains = 5;
    $scope.hideDelete = true; // Should remove this later

    // Get site settings
    getSiteSettings();

    // Get site template config
    API.SiteTemplateConfig.get({ siteId: site }, function(data) {
      $scope.siteTemplate = data.template_config;
      $scope.siteTemplate.hasFields = !Codekit.isEmptyObj($scope.siteTemplate.fields);
    });
  }

  /**
   * @desc update site via api call
   *
   * @param {string} key
   * @param {string} value
   */
  $scope.updateSite = function(key, value) {
    var keyString = key.replace("_", " ");
    var payload = {};

    // Check for GAC
    if (key === "google_analytics_code" && value.length && !(/^ua-\d{4,9}-\d{1,4}$/i).test(value.toString())) {
      toaster.error("Error updating code", "Incorrect google analytics code format (UA-XXXXX-X).");
      $scope.site.google_analytics_code = null;
      return;
    }

    toasters[key] = toaster.info("Updating " + keyString + "...");
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
  $scope.deleteSite = function() {
    // How sure? Like confirm-a-confirm sure?
    var text = "Delete site?\nDeleting site can not be undone!\n\nType in the site title to confirm:";
    if ($window.prompt(text) !== $scope.site.title) {
      return;
    }

    API.Site.delete({ siteId: site },
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
   * @desc Open themes modal
   */
  $scope.siteTemplates = function() {
    ModalsService.open("siteTemplates", "SiteTemplatesModalController", {
      site: $scope.site,
      currentTemplate: $scope.siteTemplate
    });
  };

  /**
   * @desc Add/set new custom domain for the site (instead of the current sub domain)
   */
  $scope.addDomain = function() {
    // Domain url
    var domain = $window.prompt("Enter your custom domain address:");

    // Check if cancelled
    if (domain === null) {
      return;
    }

    API.SetCustomDomain.put({ siteId: site }, { domain: domain },
      function() {
        toaster.success("Custom domain set", (
          "Supply '" + $scope.site.absolute_uri + "' to your DNS provider " +
          "for the destination of CNAME or ALIAS records."
        ));
        getSiteSettings();
      },
      function() {
        toaster.error("Error", "Domain is already taken or invalid.");
      }
    );
  };

  /**
   * @desc Delete a custom domain
   *
   * @param {string} domain
   */
  $scope.deleteDomain = function(domain) {
    // How sure? Like confirm-a-confirm sure?
    if (!$window.confirm("Are you sure you want to delete '" + domain.domain + "' domain?")) {
      return;
    }

    API.RemoveCustomDomain.put({ siteId: site }, { domain_id: domain.id }, function() {
      toaster.success("Done", "Deleted custom domain '" + domain.domain + "'.");
      getSiteSettings();
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

  constructor();
}

app.controller("SiteController", SiteController);
SiteController.$inject = [
  "$scope",
  "$rootScope",
  "$state",
  "$stateParams",
  "$window",
  "toaster",
  "API",
  "ModalsService",
  "AuthService",
  "DolphinService",
  "Codekit"
];
