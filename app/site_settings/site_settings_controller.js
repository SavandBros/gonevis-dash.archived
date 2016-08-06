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
 * @param SiteSettingsService
 * @param AuthenticationService
 */
function SiteSettingsController($scope, $rootScope, $state, $mdToast, SiteSettingsService, AuthenticationService) {

  var site = AuthenticationService.getCurrentSite()

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.user = AuthenticationService.getAuthenticatedUser();

    SiteSettingsService.get(site).then(
      function (data, status, headers, config) {
        $scope.siteDetail = data.data;
        console.log($scope.siteDetail);
      },
      function (data, status, headers, config) {
        console.log(data.data);
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

    SiteSettingsService.update(site).then(
      function (data, status, headers, config) {
        $scope.siteDetail = data.data;
        $mdToast.showSimple("Profile update.");
      },
      function (data, status, headers, config) {
        $mdToast.showSimple("Sorry, error has occured while updating profile, try again later.");
        console.log(data.data)
      }
    );
  }

  constructor();
}

app.controller("SiteSettingsController", SiteSettingsController);
SiteSettingsController.$inject = ['$scope', '$rootScope', '$state', '$mdToast', 'SiteSettingsService', 'AuthenticationService'];
