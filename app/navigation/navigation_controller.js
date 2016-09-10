'use strict'

/**
 * @ngdoc function
 * @name gonevisDash.controller:NavigationController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $mdToast
 * @param AuthService
 */
function NavigationController ($scope, $rootScope, $state, $mdToast, API, AuthService) {
  var site = AuthService.getCurrentSite()
  $scope.navigations = []

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor () {
    API.Navigation.get({ site_id: site },
      function (data, status, headers, config) {
        $scope.navigations = data.navigation
        console.log(data)
      }
    )
  }

  $scope.updateNavigation = function () {
    $scope.loading = true;
    API.Navigation.put({ site_id: site }, {navigation: $scope.navigations},
      function (data, status, headers, config) {
        $scope.loading = false;
        $mdToast.showSimple("Navigation updated.");
        console.log(data)
      },
      function (data, status, headers, config) {
        $scope.loading = false;
        $mdToast.showSimple("Sorry, we couldn't update navigation, please try again later");
        console.log(data)
      }
    )
  }

  $scope.addNav = function () {
    $scope.navigations.push(
      {'url': '', 'label': '', 'sort_number': $scope.navigations.length + 1}
    )
  };

  $scope.deleteNav = function (id) {
    for ( var i = 0; i < $scope.navigations.length; i++ ) {
      if ( $scope.navigations[i].url == id ) {
        $scope.navigations.splice(i, 1);
        $scope.updateNavigation();
      }
    }
  }

  constructor()
}

app.controller('NavigationController', NavigationController)
NavigationController.$inject = ['$scope', '$rootScope', '$state', '$mdToast', 'API', 'AuthService']
