'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:SiteSettingsController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $mdToast
 * @param API
 * @param ModalsService
 * @param AuthService
 */
function SiteSettingsController($scope, $rootScope, $state, $mdToast, API, ModalsService, AuthService) {

  var site = AuthService.getCurrentSite()

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.user = AuthService.getAuthenticatedUser();

    API.Site.get({ site_id: site },
      function (data, status, headers, config) {
        $scope.sietSettings = data;
      },
      function (data, status, headers, config) {
        console.log(data);
      }
    );
  };

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
      function (data, status, headers, config) {
        $scope.sietSettings[key] = data[key];
        $mdToast.showSimple("Profile update.");
      },
      function (data, status, headers, config) {
        $mdToast.showSimple("" + data.data.title + "");
      }
    );
  }

  /**
   * remove
   *
   * @method remove
   * @desc delete site via api call
   *
   * @param siteId {String}
   */
  $scope.remove = function (siteId) {
    API.SiteUpdate.delete({ site_id: site },
      function (data, status, headers, config) {
        for (var i = 0; i < $scope.user.sites.length; i++) {
          if ($scope.user.sites[i].id == site) {
            $scope.user.sites.splice(i, 1);
          }
        };

        AuthService.updateAuth($scope.user);

        $rootScope.$broadcast('gonevisDash.SiteSettingsController:remove');
        $mdToast.showSimple("Site deleted");

        if ($scope.user.sites.length == 0) {
          $state.go('site-new');
        } else {
          ModalsService.open("sites", "SiteController");
        };
      },
      function (data, status, headers, config) {
        $mdToast.showSimple("Sorry we couldn't delete the site, please try again later");
      }
    );
  }

  constructor();
}

app.controller("SiteSettingsController", SiteSettingsController);
SiteSettingsController.$inject = [
  '$scope',
  '$rootScope',
  '$state',
  '$mdToast',
  'API',
  'ModalsService',
  'AuthService'
];
