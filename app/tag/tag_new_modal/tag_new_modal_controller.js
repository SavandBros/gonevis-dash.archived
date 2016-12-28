"use strict";

/**
 * @class TagNewModalController
 *
 * @param $scope
 * @param TagService
 * @param API
 * @param AuthService
 * @param ModalsService
 * @param Slug
 * @param DolphinService
 * @param Codekit
 */
function TagNewModalController($scope, TagService, API, AuthService, ModalsService, Slug, DolphinService, Codekit) {

  var site = AuthService.getCurrentSite();

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.form = { data: {} };
    $scope.dolphinService = DolphinService;

    Codekit.focus("input.name:last");
  }

  /**
   * create
   *
   * @method create
   * @desc Create a new tag
   *
   * @param form {Object}
   */
  $scope.create = function (form) {
    form.loading = true;
    form.errors = null;

    form.data.slug = form.data.slug ? form.data.slug : "";
    form.data.site = site;

    API.Tags.save({ site: site }, form.data,
      function (data) {
        TagService.create(form, data);
        form.loading = false;
        form.data.tagged_items_count = 0;
        ModalsService.close("tagCreate");
      },
      function (data) {
        form.loading = false;
        form.errors = data.data;
      }
    );
  };

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
  "TagService",
  "API",
  "AuthService",
  "ModalsService",
  "Slug",
  "DolphinService",
  "Codekit"
];
