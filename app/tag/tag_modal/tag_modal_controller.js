'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:TagModalController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param TagService
 * @param tag
 * @param DolphinService
 */
function TagModalController($scope, TagService, tag, DolphinService) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.tagService = TagService;
    $scope.dolphinService = DolphinService;
    $scope.tag = tag;
  };

  $scope.$on("gonevisDash.DolphinService:select", function (data, dolphin) {
    $scope.tag.cover_image = dolphin.id;
  });

  constructor();
}

app.controller("TagModalController", TagModalController);
TagModalController.$inject = [
  "$scope",
  "TagService",
  "tag",
  "DolphinService"
];
