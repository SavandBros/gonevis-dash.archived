"use strict";
import topBarTemplate from "./top_bar.html";
import app from "../../app";

app.component("topBar", {
  template: topBarTemplate,
  bindings: {
    searchForm: '<',
    view: '=',
    viewName: '@',
  }
});
