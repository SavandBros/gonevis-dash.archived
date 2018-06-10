"use strict";
import viewButtonsTemplate from "./view_buttons.html";
import app from "../../app";

function ViewButtonsController($scope, localStorageService) {

  var ctrl = this;

  /**
   * @desc Set item view style
   *
   * @param {string} view
   */
  $scope.setView = function (view) {
    ctrl.view = view;
    localStorageService.set(ctrl.viewName, ctrl.view);
  };
}

app.controller("ViewButtonsController", ViewButtonsController);
app.component("viewButtons", {
  template: viewButtonsTemplate,
  controller: ViewButtonsController,
  bindings: {
    view: '=',
    viewName: '@',
  }
});
