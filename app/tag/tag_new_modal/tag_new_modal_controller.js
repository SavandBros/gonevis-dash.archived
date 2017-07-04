"use strict";

/**
 * @class TagNewModalController
 *
 * @param $scope
 * @param Tag
 * @param AuthService
 * @param Slug
 * @param DolphinService
 * @param Codekit
 */
function TagNewModalController($scope, Tag, AuthService, Slug, DolphinService, Codekit) {

  /**
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.Tag = new Tag({ site: AuthService.getCurrentSite() });
    $scope.dolphinService = DolphinService;
    $scope.form = {
      data: { site: $scope.Tag.get.site }
    };

    Codekit.focus("input.name:last");
  }

  /**
   * @method updateSlug
   * @desc Slugify title and update slug
   */
  $scope.updateSlug = function () {
    $scope.form.data.slug = Slug.slugify($scope.form.data.name);
  };

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

  constructor();
}

app.controller("TagNewModalController", TagNewModalController);
TagNewModalController.$inject = [
  "$scope",
  "Tag",
  "AuthService",
  "Slug",
  "DolphinService",
  "Codekit"
];