"use strict";

/**
 * @class TagModalController
 *
 * @param $scope
 * @param tag
 * @param Slug
 * @param DolphinService
 * @param ModalsService
 */
function TagModalController($scope, tag, Slug, DolphinService, ModalsService) {

  /**
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.dolphinService = DolphinService;
    $scope.modalsService = ModalsService;
    $scope.editing = true;
    $scope.tag = tag;
    $scope.form = {
      data: tag.get,
      oldSlug: tag.get.slug
    };
  }

  /**
   * @event gonevisDash.Dolphin:select
   * @desc Dolphin selection
   *
   * @param event {Event}
   * @param dolphin {Dolphin}
   * @param source {String}
   */
  $scope.$on("gonevisDash.Dolphin:select", function (event, dolphin, source) {
    if (source === "tagCover") {
      $scope.form.data.cover_image = dolphin ? dolphin.get.id : null;
    }
  });

  $scope.$on("gonevisDash.Tag:remove", function () {
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
  "tag",
  "Slug",
  "DolphinService",
  "ModalsService"
];