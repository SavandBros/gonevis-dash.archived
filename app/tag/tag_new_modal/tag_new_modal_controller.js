"use strict";

/**
 * @class TagNewModalController
 *
 * @param $scope
 * @param Tag
 * @param API
 * @param AuthService
 * @param ModalsService
 * @param Slug
 * @param DolphinService
 * @param Codekit
 */
function TagNewModalController($scope, Tag, API, AuthService, ModalsService, Slug, DolphinService, Codekit) {

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
   * @event gonevisDash.DolphinService:select
   * @desc Dolphin selection
   *
   * @param event {Event}
   * @param dolphin {Object}
   */
  $scope.$on("gonevisDash.DolphinService:select", function (event, dolphin) {
    $scope.form.data.cover_image = dolphin ? dolphin.id : null;
  });

  constructor();
}

app.controller("TagNewModalController", TagNewModalController);
TagNewModalController.$inject = [
  "$scope",
  "Tag",
  "API",
  "AuthService",
  "ModalsService",
  "Slug",
  "DolphinService",
  "Codekit"
];
