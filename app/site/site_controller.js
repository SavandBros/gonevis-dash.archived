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

    API.SiteUpdate.put({ site_id: site }, payload,
      function (data) {
        $scope.site[key] = data[key];
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

    API.Site.delete({ site_id: site },
      function () {
        for (var i = 0; i < $scope.user.sites.length; i++) {
          if ($scope.user.sites[i].id === site) {
            $scope.user.sites.splice(i, 1);
          }
        }

        AuthService.updateAuth($scope.user);

        $rootScope.$broadcast("gonevisDash.SiteController:remove");
        $mdToast.showSimple("Site deleted");

        if ($scope.user.sites.length === 0) {
          $state.go("site-new");
        } else {
          ModalsService.open("sites", "SiteModalController");
        }
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
    var payload = {
      config_fields: $scope.siteTemplate.fields
    };
    API.SetSiteTemplateConfig.put({ site_id: site }, payload,
      function () {
        $mdToast.showSimple("Site template updated");
      },
      function () {
        $mdToast.showSimple("Oh... Something went wrong, couldn't update site template");
      }
    );
  };

  $scope.$on("gonevisDash.DolphinService:select", function (data, dolphin) {
    $scope.site.media[$scope.editing] = dolphin ? dolphin.id : null;
    $scope.updateSite($scope.editing, dolphin ? dolphin.id : null);
  });

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
  "DolphinService"
];
