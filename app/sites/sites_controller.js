'use strict'

/**
 * @ngdoc function
 * @name gonevisDash.controller:SitesController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $mdToast
 * @param AuthenticationService
 */
function SitesController ($scope, $rootScope, $state, $stateParams, UserSitesService, AuthenticationService) {

  $scope.sites = {};

  function constructor () {
    UserSitesService.get().then(
      function(data, status, headers, config) {
        $scope.sites = data.data.results;
        console.log(data.data.results);
      },
      function(data, status, headers, config) {
        console.log(data.data);
      }
    )
  }
  // check user auth
  $scope.$on('gonevisDash.AuthenticationService:Authenticated', function() {
      constructor();
      $state.go('main');
  });

  constructor()
}

app.controller('SitesController', SitesController)
SitesController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'UserSitesService', 'AuthenticationService']
