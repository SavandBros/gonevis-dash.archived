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
 * @param TagListService
 * @param AuthenticationService
 */
function TagListController($scope, $rootScope, $state, $mdToast, TagListService, AuthenticationService) {

  var site = AuthenticationService.getCurrentSite();

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.user = AuthenticationService.getAuthenticatedUser();

    TagListService.get(site).then(
      function (data, status, headers, config) {
        $scope.tags = data.data.results;
      },
      function (data, status, headers, config) {
        console.log(data.data);
      }
    );
  };

  constructor();
}

app.controller("TagListController", TagListController);
TagListController.$inject = ['$scope', '$rootScope', '$state', '$mdToast', 'TagListService', 'AuthenticationService'];
