"use strict";

import app from "../../app";

function PreviewModalController($scope, URL, $sce) {

  function constructor(){
    $scope.url = $sce.trustAsResourceUrl(URL);
    $scope.currentClass = "modal-lg";

    /**
     * @desc Preview modes
     * @type {array}
     */
    $scope.modes = [{
      icon: "desktop",
      class: "modal-lg"
    }, {
      icon: "tablet",
      class: "modal-md"
    }, {
      icon: "mobile",
      class: "modal-sm"
    }];
  }

  /**
   * @desc Change preview mode
   *
   * @param {string} previewClass
   */
  $scope.changeMode = (previewClass) => {
    $scope.currentClass = previewClass;
  };

  constructor();
}

app.controller("PreviewModalController", PreviewModalController);
