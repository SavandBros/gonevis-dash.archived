'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:TagCreateModalController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param TagService
 * @param $element
 */
function TagCreateModalController($scope, $rootScope, TagService, $element) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.tagService = TagService;
  };

  $rootScope.$on('gonevisDash.TagService:create', function () {
    $element.modal('hide');
  });
  constructor();
}

app.controller("TagCreateModalController", TagCreateModalController);
TagCreateModalController.$inject = ['$scope', '$rootScope', 'TagService', '$element'];
