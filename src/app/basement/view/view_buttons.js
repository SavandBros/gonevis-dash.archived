"use strict";
import viewButtonsTemplate from "./view_buttons.html";
import app from "../../app";

function ViewButtonsController($scope) {

  var ctrl = this;
  /**
   * @desc Set item view style
   *
   * @param {string} view
   */
  $scope.changeView = function (view) {
    ctrl.setview({view: view});
  };
}

app.controller("ViewButtonsController", ViewButtonsController);
app.component("viewbuttons", {
  template: viewButtonsTemplate,
  controller: ViewButtonsController,
  bindings: {
    view: '=',
    setview: '&',
  }
});
