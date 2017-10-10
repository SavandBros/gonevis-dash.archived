"use strict";

function TagModalController($scope, tag, Slug, DolphinService, ModalsService) {

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
   * @desc Dolphin selection
   *
   * @param {Event} event
   * @param {Dolphin} dolphin
   * @param {string} source
   */
  $scope.$on("gonevisDash.Dolphin:select", function(event, dolphin, source) {
    if (source === "tagCover") {
      $scope.form.data.cover_image = dolphin ? dolphin.get.id : null;
    }
  });

  /**
   * @desc Remove tag callback
   */
  $scope.$on("gonevisDash.Tag:remove", function() {
    $scope.modalsService.close("tag");
  });

  /**
   * @desc Slugify title and update slug
   */
  $scope.updateSlug = function() {
    $scope.form.data.slug = Slug.slugify($scope.form.data.name);
  };

  /**
   * @desc Update modal
   */
  $scope.$on("gonevisDash.Tag:update", function(event, data) {
    $scope.form.data = data.data;
  });

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
