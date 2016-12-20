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
 * @param Slug
 */
function TagModalController($scope, TagService, tag, DolphinService, Slug) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.tagService = TagService;
    $scope.dolphinService = DolphinService;
    $scope.form = { data: tag };
  };

  $scope.$on("gonevisDash.DolphinService:select", function (data, dolphin) {
    $scope.form.data.cover_image = dolphin ? dolphin.id : null;
  });

  $scope.updateSlug = function () {
    $scope.form.data.slug = Slug.slugify($scope.form.data.name);
  };

  constructor();
}

app.controller("TagModalController", TagModalController);
TagModalController.$inject = [
  "$scope",
  "TagService",
  "tag",
  "DolphinService",
  "Slug"
];
