"use strict";

/**
 * @class RunNevisRun
 *
 * @param $rootScope
 * @param $window
 * @param $location
 * @param $cookies
 * @param $state
 * @param toaster
 * @param ENV
 * @param AuthService
 * @param DolphinService
 * @param Client
 * @param editableOptions
 * @param taOptions
 * @param taRegisterTool
 * @param textAngularManager
 * @param taToolFunctions
 */
function RunNevisRun($rootScope, $window, $location, $cookies, $state, toaster,
  ENV, AuthService, DolphinService, Codekit, Client, editableOptions, taOptions, taRegisterTool,
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
    lights: true
  };

  // Client version control (if not current version)
  if (Client.version !== parseInt($window.localStorage.getItem("version"))) {

    // Store auth to use after data reset
    var isAuthed = AuthService.isAuthenticated(true);

    // Clear cookies
    $cookies.remove("JWT");
    $cookies.remove("user");

    // Reset localStorage version
    $window.localStorage.setItem("version", Client.version);

    // Redirect to signin and toast (If logged in)
    if (isAuthed) {
      toaster.info("Logged out", "Client version updated! Login again, please.");
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
    activeState: function () {
      return this.$editor().queryFormatBlockState("pre");
    }
  });
  taRegisterTool("addImage", {
    iconclass: "fa fa-picture-o",
    tooltiptext: "Insert Image",
    action: function () {
      this.$editor().wrapSelection("insertImage", "assets/img/avatar.png", false);
      DolphinService.viewSelection("editorAddImage");
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
    ["html", "addImage", "insertLink", /**"insertVideo"**/]
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

    // Close open modals
    angular.element(".modal, .modal-backdrop").fadeOut(
      function () {
        angular.element(this).remove();
      }
    );

    var isAuthenticated = AuthService.isAuthenticated();
    var toDash = toState.name.indexOf("dash.") !== -1;
    var sites = isAuthenticated ? AuthService.getAuthenticatedUser(true).get.sites : [];

    // If requires unauthenticated access only and user is authenticated or
    // If state requires authenticated access only and user is not authenticated
    if ((toState.auth === false && isAuthenticated) || (toState.auth === true && !isAuthenticated)) {
      // Stop changing state
      event.preventDefault();
      // If current state is invalid (first page)
      if (!fromState.name) {
        if (isAuthenticated) {
          $state.go("dash.main", { s: 0 });
        } else {
          $state.go("signin");
        }
      }
    }

    // If is authenticated and going to a dash state
    if (isAuthenticated && toDash) {

      // If no site
      if (sites.length < 1) {
        event.preventDefault();
        return $state.go("site-new");
      }

      // If has an invalid site index
      if (sites.length && !sites[toParams.s]) {
        // Stop changing state
        event.preventDefault();
        // Redirect with the same state but first site
        toParams.s = 0;
        $state.go(toState.name, toParams);
      }
    }
  });

  /**
   * @event $stateChangeSuccess
   * @desc Changed state succesfully
   *
   * @param event {Event}
   * @param toState {Object}
   * @param toParams {Object}
   */
  $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams) {
    // Analytics
    if (ENV.name === "production") {
      $window.ga("send", "pageview", { page: $location.url() });
    }

    // Update title
    Codekit.setTitle(toState.title);

    // Switch lights
    if (toParams.lights !== true) {
      $rootScope.set.lights = true;
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
  "toaster",
  "ENV",
  "AuthService",
  "DolphinService",
  "Codekit",
  "Client",
  "editableOptions",
  "taOptions",
  "taRegisterTool",
  "textAngularManager",
  "taToolFunctions"
];
