"use strict";

function TagNewModalController($scope, Tag, AuthService, Slug, DolphinService, Codekit) {

  function constructor() {
    $scope.Tag = new Tag({ site: AuthService.getCurrentSite() });
    $scope.dolphinService = DolphinService;
    $scope.form = {
      data: { site: $scope.Tag.get.site }
    };

    Codekit.focus("input.name:last");
  }

  /**
   * @desc Slugify title and update slug
   */
  $scope.updateSlug = function () {
    $scope.form.data.slug = Slug.slugify($scope.form.data.name);
  };

  /**
   * @desc Dolphin selection
   *
   * @param {Event} event
   * @param {Dolphin} dolphin
   * @param {string} source
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