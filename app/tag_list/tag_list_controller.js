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
 * @param AuthenticationService
 */
function TagListController($scope, $rootScope, $state, $mdToast, API, AuthenticationService) {

  var site = AuthenticationService.getCurrentSite();

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.user = AuthenticationService.getAuthenticatedUser();

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
TagListController.$inject = ['$scope', '$rootScope', '$state', '$mdToast', 'API', 'AuthenticationService'];
