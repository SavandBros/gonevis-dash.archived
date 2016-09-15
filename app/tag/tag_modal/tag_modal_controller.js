'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:TagModalController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param TagService
 * @param tag
 */
function TagModalController($scope, TagService, tag) {

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

app.controller("TagModalController", TagModalController);
TagModalController.$inject = ['$scope', 'TagService', 'tag'];
