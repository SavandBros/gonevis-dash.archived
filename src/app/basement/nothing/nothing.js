"use strict";
import nothingTemplate from "./nothing.html";
import app from "../../app";

app.component("nothing", {
  template: nothingTemplate,
  bindings: {
    text: '@',
    view: '<',
  }
});
