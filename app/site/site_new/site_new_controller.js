'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:SiteNewController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $mdToast
 * @param API
 * @param AuthService
 */
function SiteNewController($scope, $rootScope, $state, $mdToast, API, AuthService) {

  // Create Site form
  $scope.form = {};

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.user = AuthService.getAuthenticatedUser();
  };

  /**
   * createSite
   *
   * @method createSite
   * @desc create site via api call
   *
   * @param form {object}
   */
  $scope.createSite = function (form) {
    form.loading = true;

    API.SiteNew.save(form,
      function (data, status, headers, config) {
        form.loading = false;
        // Update sites
        $scope.user.sites.push(data);

        // Update current user's data
        AuthService.updateAuthentication($scope.user);

        // Show success message
        $mdToast.showSimple('Site ' + data.title + ' created');

        // Redirect user to the site that just have been created
        $state.go('dash.entry-new', { s: $scope.user.sites.length - 1 });
      },
      function (data, status, headers, config) {
        console.log(data);
      }
    );
  };

  constructor();
}

app.controller("SiteNewController", SiteNewController);
SiteNewController.$inject = ['$scope', '$rootScope', '$state', '$mdToast', 'API', 'AuthService'];