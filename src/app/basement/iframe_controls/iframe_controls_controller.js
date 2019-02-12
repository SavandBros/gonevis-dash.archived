"use strict";
import IframeControlsTemplate from "./iframe_controls_view.html";
import app from "../../app";

function IframeControls($scope, $rootScope) {

  function constructor() {
    console.log("ssss");
  }

  constructor();
}


app.controller("IframeControls", IframeControls);
app.component("iframeControls", {
  template: IframeControlsTemplate,
  controller: IframeControls
});
