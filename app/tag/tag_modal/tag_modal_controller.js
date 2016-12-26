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
 * @param ModalsService
 */
function TagModalController($scope, TagService, tag, DolphinService, Slug, ModalsService) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.tagService = TagService;
    $scope.dolphinService = DolphinService;
    $scope.modalsService = ModalsService;
    $scope.form = { data: tag };
  };

  $scope.$on("gonevisDash.DolphinService:select", function (event, dolphin) {
    $scope.form.data.cover_image = dolphin ? dolphin.id : null;
  });

  $scope.$on("gonevisDash.TagService:remove", function () {
    $scope.modalsService.close("tag");
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
  "Slug",
  "ModalsService"
];
