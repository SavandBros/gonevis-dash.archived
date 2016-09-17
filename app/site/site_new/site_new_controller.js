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

        var index = $scope.user.sites.push(data);
        AuthService.updateAuth($scope.user);
        $rootScope.$broadcast('gonevisDash.SiteNewController:Create');
        $mdToast.showSimple('Site ' + data.title + ' created');
        $state.go('dash.entry-new', { s: index - 1 });
      },
      function (data, status, headers, config) {
        form.errors = data.data;
        form.loading = false;
      }
    );
  };

  constructor();
}

app.controller("SiteNewController", SiteNewController);
SiteNewController.$inject = ['$scope',
  '$rootScope',
  '$state',
  '$mdToast',
  'API',
  'AuthService'
];
