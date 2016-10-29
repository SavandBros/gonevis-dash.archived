'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:SiteSettingsController
 * Controller of the gonevisDash
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
function SiteSettingsController($scope, $rootScope, $state, $stateParams, $mdToast, API, ModalsService, AuthService, DolphinService) {

  var site = AuthService.getCurrentSite();

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.user = AuthService.getAuthenticatedUser();
    $scope.siteSettings = $scope.user.sites[$stateParams.s];
    $scope.dolphinService = DolphinService;

    API.Site.get({ site_id: site },
      function (data) {
          $scope.siteSettings = data;
      }
    );
  }

  /**
   * updateSite
   *
   * @method updateSite
   * @desc update site via api call
   *
   * @param key {string} value {string} site {string}
   */
  $scope.updateSite = function (key, value) {
    $mdToast.showSimple('Updating ' + key + '...');

    var payload = {};
    payload[key] = value;

    API.SiteUpdate.put({ site_id: site }, payload,
      function (data) {
        $scope.siteSettings[key] = data[key];
        $mdToast.showSimple("Profile update.");
      },
      function (data) {
        $mdToast.showSimple("" + data.data.title + "");
      }
    );
  }

  /**
   * remove
   *
   * @method remove
   * @desc Delete site via api call
   *
   * @param siteId {String}
   */
  $scope.remove = function (siteId) {
    API.Site.delete({ site_id: site },
      function () {
        for (var i = 0; i < $scope.user.sites.length; i++) {
          if ($scope.user.sites[i].id == site) {
            $scope.user.sites.splice(i, 1);
          }
        }

        AuthService.updateAuth($scope.user);

        $rootScope.$broadcast('gonevisDash.SiteSettingsController:remove');
        $mdToast.showSimple("Site deleted");

        if ($scope.user.sites.length == 0) {
          $state.go('site-new');
        } else {
          ModalsService.open("sites", "SiteModalController");
        }
      },
      function (data) {
        $mdToast.showSimple("Sorry we couldn't delete the site, please try again later");
      }
    );
  };

  $scope.$on("gonevisDash.DolphinService:select", function (data, dolphin) {
    $scope.siteSettings.cover_image = dolphin.id;
    $scope.updateSite("cover_image", dolphin.id);
  });

  constructor();
}

app.controller("SiteSettingsController", SiteSettingsController);
SiteSettingsController.$inject = [
  '$scope',
  '$rootScope',
  '$state',
  "$stateParams",
  '$mdToast',
  'API',
  'ModalsService',
  'AuthService',
  'DolphinService'
];
