'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:TagCreateModalController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param TagService
 * @param API
 * @param AuthService
 * @param ModalsService
 */
function TagCreateModalController($scope, TagService, API, AuthService, ModalsService) {

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
    form.data.site = site;

    API.Tags.save({ site: site }, form.data,
      function (data) {
        TagService.create(form, data);
        form.loading = false;
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
  'TagService',
  'API',
  'AuthService',
  'ModalsService'
];
