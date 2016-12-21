"use strict";

/**
 * @class RunForestRun
 *
 * @param $rootScope
 * @param $mdToast
 * @param $state
 * @param editableOptions
 * @param ModalsService
 * @param AuthService
 */
function RunForestRun($rootScope, $mdToast, $state,
  editableOptions, ModalsService, AuthService, taOptions, taRegisterTool) {

  /**
   * @name cache
   * @desc We'll be using $rootScope.cache as an object, so we need to predefine it
   *
   * @type {Object}
   */
  $rootScope.cache = {};

  /**
   * @name set
   * @desc Predefined rootscope variable
   *
   * @type {Object}
   */
  $rootScope.set = {
    editor: {}
  };

  // Editable texts config
  editableOptions.theme = "bs3";

  taRegisterTool("code", {
    iconclass: "fa fa-code t-bold",
    tooltiptext: "Insert code (Preformatted text)",
    action: function () {
      return this.$editor().wrapSelection("formatBlock", "<pre>");
    },
    activeState: function () { return this.$editor().queryFormatBlockState("pre"); }
  });
  taRegisterTool("addImage", {
    iconclass: "fa fa-picture-o",
    tooltiptext: "Insert Image",
    action: function () {
      $rootScope.set.editor = {
        scope: textAngularManager.retrieveEditor("editor").scope,
        this: this,
        selecting: true
      };
      DolphinService.viewSelection();
    },
    onElementSelect: {
      element: "img",
      action: taToolFunctions.imgOnSelectAction
    }
  });

  taOptions.toolbar = [
    ["h1", "h2", "h3", "code", "quote"],
    ["bold", "italics", "underline", "strikeThrough"],
    ["ul", "ol", "clear"],
    ["justifyLeft", "justifyCenter", "justifyRight", "indent", "outdent"],
    ["html", "addImage", "insertLink", "insertVideo"]
  ];

  /**
   * @event $stateChangeStart
   * @desc Starting to change state callback
   *
   * @param event {Event}
   * @param toState {Object}
   * @param toParams {Object}
   */
  $rootScope.$on("$stateChangeStart", function (event, toState, toParams) {
    // Check authentication
    if (toState.auth === true && !AuthService.isAuthenticated() ||
      toState.auth === false && AuthService.isAuthenticated()) {
      event.preventDefault();
    }

    // Check current site
    if (!toParams.s) {
      ModalsService.open("sites");
    }
  });

  /**
   * @event $viewContentLoaded
   * @desc Load view content of state callback
   */
  $rootScope.$on("$viewContentLoaded", function () {
    // Invalid state
    if (!$state.current.name) {
      if (AuthService.isAuthenticated()) {
        $state.go("dash.main", { s: 0 });
      } else {
        $state.go("signin");
      }
    }
  });

  /**
   * @event gonevisDash.DolphinService:select
   * @desc Dolphin selection callback, depends on state @editor
   */
  $rootScope.$on("gonevisDash.DolphinService:select", function (event, dolphin) {
    if ($state.current.editor) {
      if ($rootScope.set.editor.selecting === true) {
        $rootScope.set.editor.dolphin = dolphin;
        $rootScope.set.editor.selecting = false;
      }
    }
  });

  angular.element("*").on("click", function (event) {
    var el = angular.element(event.target);
    if (el.hasClass("preIn")) {
      angular.element("[ng-click='sidebar = false']").trigger("click");
  /**
   * @event document.mousemove
   * @desc Mouse movement callback, depends on state @mousemoveEvent
   */
  angular.element(document).on("mousemove", function (event) {
    if ($state.current.mousemoveEvent) {
      $rootScope.set.pageX = event.pageX;
      $rootScope.set.pageY = event.pageY - angular.element("body").scrollTop();
      $rootScope.$apply();
    }
  });
}

app.run(RunForestRun);
RunForestRun.$inject = [
  "$rootScope",
  "$mdToast",
  "$state",
  "editableOptions",
  "ModalsService",
  "AuthService",
  "taOptions",
  "taRegisterTool"
];
