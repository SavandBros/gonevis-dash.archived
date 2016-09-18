'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:TagCreateModalController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param $mdToast
 * @param API
 * @param AuthService
 * @param ModalsService
 */
function TagCreateModalController($scope, $rootScope, $mdToast, API, AuthService, ModalsService) {

  var site = AuthService.getCurrentSite();

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.form = {}
  };

  /**
   * create
   *
   * @method create
   * @desc Create a new tag
   *
   * @param form {Object}
   */
  $scope.create = function (form) {
    form.loading = true;
    form.errors = null;

    form.data.slug = form.data.slug ? form.data.slug : "";

    API.Tags.save({ tag_site: site }, form.data,
      function (data) {
        form.loading = false;

        $rootScope.$broadcast("gonevisDash.API:create", {
          success: true,
          data: data,
          tag: form.data
        });

        $mdToast.showSimple("Tag " + data.name + " created.");
        ModalsService.close('tagCreate');
      },
      function (data) {
        form.loading = false;
        form.errors = data.data;
      }
    );
  }

  constructor();
}

app.controller("TagCreateModalController", TagCreateModalController);
TagCreateModalController.$inject = [
  '$scope',
  '$rootScope',
  '$mdToast',
  'API',
  'AuthService',
  'ModalsService'
];
