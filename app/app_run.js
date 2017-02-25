"use strict";

/**
 * @class RunNevisRun
 *
 * @param $rootScope
 * @param $window
 * @param $location
 * @param $cookies
 * @param $state
 * @param $mdToast
 * @param AuthService
 * @param DolphinService
 * @param Client
 * @param editableOptions
 * @param taOptions
 * @param taRegisterTool
 * @param textAngularManager
 * @param taToolFunctions
 */
function RunNevisRun($rootScope, $window, $location, $cookies, $state, $mdToast,
  AuthService, DolphinService, Client, editableOptions, taOptions, taRegisterTool,
  textAngularManager, taToolFunctions) {
  /**
   * @name cache
   * @desc Predefined rootscope variable
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

  // Client version control (if not current version)
  if (Client.version !== parseInt($window.localStorage.getItem("version"))) {

    // Store auth to use after data reset
    var isAuthed = AuthService.isAuthenticated();

    // Clear cookies
    $cookies.remove("JWT");
    $cookies.remove("user");

    // Reset localStorage version
    $window.localStorage.setItem("version", Client.version);

    // Redirect to signin and toast (If logged in)
    if (isAuthed) {
      $mdToast.showSimple("Client version updated! Login again, please.");
      $state.go("signin");
    }
  }

  // Editable texts config
  editableOptions.theme = "bs3";

  // Editor toolbar (register)
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

  // Editor toolbar
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
  $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState) {
    var isAuthenticated = AuthService.isAuthenticated();
    var sites = isAuthenticated ? AuthService.getAuthenticatedUser().sites : [];

    // Check authentication
    if (toState.auth === true && !isAuthenticated || toState.auth === false && isAuthenticated) {
      // Redirect if in bad auth state
      if (fromState.auth === true && toState.auth === false) {
        $state.go("signin");
      }
      // Prevent
      event.preventDefault();
    }

    // Check current site, if not set use first one
    if (isAuthenticated && toState.name.indexOf("dash.") !== -1 && sites && !sites[toParams.s]) {
      event.preventDefault();
      toParams.s = 0;
      $state.go(toState.name, toParams);
    }
  });

  /**
   * @event $stateChangeSuccess
   * @desc Changed state succesfully
   */
  $rootScope.$on("$stateChangeSuccess", function () {
    $window.ga("send", "pageview", { page: $location.url() });
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

  /**
   * @event document.click
   * @desc Click callback, depends on state @clickEvent
   */
  angular.element("*").on("click", function (event) {
    if ($state.current.clickEvent) {
      var el = angular.element(event.target);

      // Sidebar handler
      if (el.hasClass("preIn")) {
        angular.element("[ng-click='sidebar = false']").trigger("click");
      }

      // Dolphin insert handler
      if (el.attr("contenteditable") === "true" || el.parent().attr("contenteditable") === "true") {
        if ($rootScope.set.editor.dolphin) {
          $rootScope.set.editor.this.$editor().wrapSelection(
            "insertImage", $rootScope.set.editor.dolphin.file, false
          );
          $rootScope.set.editor = {};
        }
      }
    }
  });

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

app.run(RunNevisRun);
RunNevisRun.$inject = [
  "$rootScope",
  "$window",
  "$location",
  "$cookies",
  "$state",
  "$mdToast",
  "AuthService",
  "DolphinService",
  "Client",
  "editableOptions",
  "taOptions",
  "taRegisterTool",
  "textAngularManager",
  "taToolFunctions"
];
