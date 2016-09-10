'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:TagListController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $mdToast
 * @param API
 * @param AuthService
 */
function TagListController($scope, $rootScope, $state, $mdToast, API, AuthService) {

  var site = AuthService.getCurrentSite();

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.user = AuthService.getAuthenticatedUser();

    API.Tags.get({ tag_site: site },
      function (data, status, headers, config) {
        $scope.tags = data.results;
      },
      function (data, status, headers, config) {
        console.log(data);
      }
    );
  };

  constructor();
}

app.controller("TagListController", TagListController);
TagListController.$inject = ['$scope', '$rootScope', '$state', '$mdToast', 'API', 'AuthService'];
