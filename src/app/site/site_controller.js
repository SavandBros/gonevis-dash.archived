"use strict";

import paypal from "paypal-checkout";
paypal.Button.driver('angular', window.angular);

function SiteController($scope, $rootScope, $state, $stateParams, $window, toaster,
                        API, ModalsService, AuthService, DolphinService, Codekit, $translate) {

  var site = AuthService.getCurrentSite();
  var toasters = {};

  function getSiteSettings() {
    API.SiteSettings.get({ siteId: site }, function(data) {
      $scope.site = data;
      Codekit.setTitle($scope.site.title);
    });
  }

  function constructor() {
    // Check permission
    if ($rootScope.isRestrict) {
      return false;
    }
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
    var payload = {};

    // Check for GAC
    if (key === "google_analytics_code" && value.length && !(/^ua-\d{4,9}-\d{1,4}$/i).test(value.toString())) {
      $translate(["ERROR_UPDATING_CODE", "INCORRECT_GOOGLE_ANALYTICS"]).then(function(translations) {
        toaster.error(translations.ERROR_UPDATING_CODE, translations.INCORRECT_GOOGLE_ANALYTICS);
      });
      $scope.site.google_analytics_code = null;
      return;
    }

    $translate('UPDATING_SITE').then(function (updatingSite) {
      toasters[key] = toaster.info(updatingSite);
    });
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
        $translate(["DONE", "SITE_UPDATED"]).then(function(translations) {
          toaster.info(translations.DONE, translations.SITE_UPDATED);
        });
      },
      function() {
        $translate(["ERROR", "SITE_UPDATE_ERROR"]).then(function(translations) {
          toaster.error(translations.ERROR, translations.SITE_UPDATE_ERROR);
        });
      }
    );
  };

  /**
   * @desc Delete site via API call
   */
  $scope.deleteSite = function() {
    // How sure? Like confirm-a-confirm sure?
    const text = $translate.instant("DELETE_SITE_PROMPT");
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
        $translate(["DONE", "SITE_DELETED"]).then(function(translations) {
          toaster.success(translations.DONE, translations.SITE_DELETED);
        });
        // Go to main or new site page if has no other sites
        $state.go($scope.user.sites.length > 0 ? "dash.main" : "site-new");
      },
      function() {
        $translate(["ERROR", "SITE_DELETE_ERROR"]).then(function(translations) {
          toaster.error(translations.ERROR, translations.SITE_DELETE_ERROR);
        });
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
        $translate(["DONE", "SITE_TEMPLATE_UPDATED"]).then(function(translations) {
          toaster.info(translations.DONE, translations.SITE_TEMPLATE_UPDATED);
        });
      },
      function(data) {
        $scope.loadingTemplate = false;
        $translate(["ERROR", "SITE_TEMPLATE_UPDATE_ERROR"]).then(function(translations) {
          toaster.error(translations.ERROR, data.detail ? data.detail : translations.SITE_TEMPLATE_UPDATE_ERROR);
        });
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
    const domain = $window.prompt($translate.instant("ENTER_DOMAIN_ADDRESS"));

    // Check if cancelled
    if (domain === null) {
      return;
    }

    API.SetCustomDomain.put({ siteId: site }, { domain: domain },
      function() {
        $translate(["CUSTOM_DOMAIN_SET", "SUPPLY_URL_TO_DNS"], {"absolute_uri": $scope.site.absolute_uri}).then(
          function (translations) {
            toaster.success(translations.CUSTOM_DOMAIN_SET, translations.SUPPLY_URL_TO_DNS);
        });
        getSiteSettings();
      },
      function() {
        $translate(["ERROR", "DOMAIN_TAKEN_INVALID"]).then(function(translations) {
          toaster.error(translations.ERROR, translations.DOMAIN_TAKEN_INVALID);
        });
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
    if (!$window.confirm($translate.instant('CUSTOM_DOMAIN_DELETE_PROMPT', {domain: domain.domain}))) {
      return;
    }

    API.RemoveCustomDomain.put({ siteId: site }, { domain_id: domain.id }, function() {
      $translate(["DONE", "DELETED_CUSTOM_DOMAIN"], {domain: domain.domain}).then(function(translations) {
        toaster.success(translations.DONE, translations.DELETED_CUSTOM_DOMAIN);
      });
      getSiteSettings();
    });
  };

  /**
   * Debug
   */
  $scope.subscribe = function() {
    API.SubscribePlan.post({ siteId: site }, function(data) {
      console.log(data);
    });
  };

  $scope.paypalPayment = () => {
    API.SubscribePlan.post({ siteId: site }, function(data) {
      return data.payment_token;
    });
  };

  $scope.paypalonAuthorize = (data, actions) => {
    // Set up a url on your server to execute the payment
    const EXECUTE_URL = '/demo/checkout/api/paypal/payment/execute/';

    // Set up the data you need to pass to your server
    data = {
        paymentID: data.paymentID,
        payerID: data.payerID
    };

    // Make a call to your server to execute the payment
    return paypal.request.post(EXECUTE_URL, data)
        .then(function (res) {
            window.alert('Payment Complete!');
        });
  }

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

        $translate(["DONE", "SITE_TEMPLATE_UPDATED"]).then(function(translations) {
          toaster.info(translations.DONE, translations.SITE_TEMPLATE_UPDATED);
        });
      },
      function() {
        $translate(["ERROR", "SITE_TEMPLATE_UPDATE_ERROR"]).then(function(translations) {
          toaster.error(translations.ERROR, translations.SITE_TEMPLATE_UPDATE_ERROR);
        });
      }
    );
  });

  constructor();
}

const SITE_CONTROLLER_MODULE = angular.module('gonevisDash').controller("SiteController", SiteController);
export { SITE_CONTROLLER_MODULE };
