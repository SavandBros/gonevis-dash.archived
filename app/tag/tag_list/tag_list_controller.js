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

    $scope.form = {
      data: null,
      loading: false,
      errors: false
    };

    API.Tags.get({ tag_site: site },
      function (data, status, headers, config) {
        $scope.tags = data.results;
      }
    );
  };

  /**
   * create
   *
   * @method create
   * @desc Create a new tag
   * 
   * @param form {object}
   */
  $scope.create = function (form) {
    form.loading = true;
    form.errors = null;

    form.data.slug = form.data.slug || "";

    API.Tags.save({ tag_site: site }, form.data,
      function (data) {
        form.loading = false;
        form.data = null;
        $scope.tags.unshift(data);
        $mdToast.showSimple("Tag " + data.name + " created.");
      },
      function (data) {
        form.loading = false;
        form.data = null;
        form.errors = data.data;
        $mdToast.showSimple("Tag creaton failed.");
      }
    );
  }


  constructor();
}

app.controller("TagListController", TagListController);
TagListController.$inject = ['$scope', '$rootScope', '$state', '$mdToast', 'API', 'AuthService'];
