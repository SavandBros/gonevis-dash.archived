'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:TagController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param TagService
 * @param tag
 */
function TagController($scope, TagService, tag) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.tagService = TagService;
    $scope.tag = tag;
  };

  constructor();
}

app.controller("TagController", TagController);
TagController.$inject = ['$scope', 'TagService', 'tag'];
