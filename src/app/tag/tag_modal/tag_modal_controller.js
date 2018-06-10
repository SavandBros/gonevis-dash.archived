"use strict";

import app from "../../app";

function TagModalController($scope, Tag, paramTag, Slug, DolphinService, AuthService, ModalsService, Codekit) {

  function constructor() {
    $scope.dolphinService = DolphinService;
    $scope.modalsService = ModalsService;

    if (paramTag !== null) {
      $scope.editing = true;
      $scope.tag = paramTag;
      $scope.form = {
        data: paramTag.get,
        oldSlug: paramTag.get.slug
      };
    } else {
      $scope.tag = new Tag({ site: AuthService.getCurrentSite() });
      $scope.form = {
        data: {
          site: $scope.tag.get.site
        }
      };
    }

    Codekit.focus("input.name:last");
  }

  /**
   * @desc Save form
   *
   * @param {object} form Form data to submit
   */
  $scope.save = function (form) {
    $scope.editing ? $scope.tag.update(form) : $scope.tag.create(form);
  };

  /**
   * @desc Slugify title and update slug
   */
  $scope.updateSlug = function() {
    $scope.form.data.slug = Slug.slugify($scope.form.data.name);
  };

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
   * @desc Update modal
   */
  $scope.$on("gonevisDash.Tag:update", function(event, data) {
    $scope.form.data = data.data;
  });

  constructor();
}

app.controller("TagModalController", TagModalController);
