"use strict";

import app from "../../app";

/**
 * @name PreviewModalController
 *
 * @description
 *
 * ## Purpose
 * It's purpose is to show a preview of a post/page by the given URL.
 *
 * ## Abilities
 * This controller can show the preview in three different screen sizes:
 * - Desktop (large)
 * - Tablet (medium)
 * - Mobile (small)
 *
 * @param {string} site link of post/page on GoNevis.
 * @param {string} preview link of post/page for iframe.
 */
function PreviewModalController($scope, site, preview, $sce) {

  function constructor() {
    $scope.preview = $sce.trustAsResourceUrl(preview);
    $scope.site = $sce.trustAsResourceUrl(site);
    $scope.currentWidth = "100%";

    /**
     * @desc Preview modes
     * @type {array}
     */
    $scope.modes = [{
      icon: "desktop",
      width: "100%"
    }, {
      icon: "tablet",
      width: "75%"
    }, {
      icon: "mobile",
      width: "30%"
    }];
  }

  /**
   * @desc Change preview mode
   *
   * @param {string} width
   */
  $scope.changeMode = width => {
    $scope.currentWidth = width;
  };

  constructor();
}

app.controller("PreviewModalController", PreviewModalController);
