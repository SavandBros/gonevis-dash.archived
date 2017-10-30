"use strict";

function RunNevisRun($rootScope, $window, $location, $cookies, $state, toaster,
  ENV, AuthService, DolphinService, Codekit, Client, TourService, editableOptions, localStorageService) {

  /**
   * @name cache
   * @desc Predefined rootscope variable
   *
   * @type {object}
   */
  $rootScope.cache = {};

  /**
   * @name set
   * @desc Predefined rootScope variable
   *
   * @type {object}
   */
  $rootScope.set = {
    /**
     * @desc Lights for the editor
     * @type {boolean}
     */
    lights: true,

    /**
     * @desc Sidebar status
     * @type {boolean}
     */
  };

  /**
   * @desc Medium editor options
   * @type {object}
   */
  $rootScope.editorOptions = {
    activeButtonClass: "active",
    toolbar: {
      static: true,
      sticky: true,
      buttonLabels: "fontawesome",
      updateOnEmptySelection: true,
      buttons: [{
        name: "h1",
        aria: "Heading 1",
        contentDefault: "H1"
      }, {
        name: "h2",
        aria: "Heading 2",
        contentDefault: "H2"
      }, {
        name: "h3",
        aria: "Heading 3",
        contentDefault: "H3"
      }, {
        name: "bold",
        aria: "Bold",
        contentDefault: "B"
      }, {
        name: "italic",
        aria: "Italic",
        contentDefault: "<em>I</em>"
      }, {
        name: "underline",
        aria: "Underline",
        contentDefault: "<u>U</u>"
      }, {
        name: "strikethrough",
        aria: "Strikethrough",
        contentDefault: "<s>S</s>"
      }, {
        name: "anchor",
        aria: "Link",
        contentDefault: "<i class='fa fa-link'></i>"
      }, {
        name: "image",
        aria: "Insert image",
        contentDefault: "<i class='fa fa-image'></i>"
      }, {
        name: "quote",
        aria: "Block quote",
        contentDefault: "<i class='fa fa-quote-left'></i>"
      }, {
        name: "pre",
        aria: "Preformatted text",
        contentDefault: "<i class='fa fa-code'></i>"
      }, {
        name: "unorderedlist",
        aria: "List (unordered)",
        contentDefault: "<i class='fa fa-list-ul'></i>"
      }, {
        name: "justifyLeft",
        aria: "Left align",
        contentDefault: "<i class='fa fa-align-left'></i>"
      }, {
        name: "justifyCenter",
        aria: "Center align",
        contentDefault: "<i class='fa fa-align-center'></i>"
      }, {
        name: "justifyRight",
        aria: "Right align",
        contentDefault: "<i class='fa fa-align-right'></i>"
      }, {
        name: "removeFormat",
        aria: "Clear formatting",
        contentDefault: "<i class='fa fa-ban'><i>",
      }]
    }
  }

  // Set user tracking info
  AuthService.setTrackingInfo();

  // Editable texts config
  editableOptions.theme = "bs3";

  /**
   * @event $stateChangeStart
   * @desc Starting to change state callback
   *
   * @param {Event} event
   * @param {object} toState
   * @param {object} toParams
   * @param {object} fromState
   */
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState) {

    // No routing if running tour
    if (TourService.isTourOn() && fromState.name) {
      event.preventDefault();
    }

    // Close open modals
    angular.element(".modal, .modal-backdrop").fadeOut(
      function() {
        angular.element(this).remove();
      }
    );

    // Client version control (if not current version)
    if (Client.version !== parseInt(localStorageService.get("version"))) {

      // Store auth to use after data reset
      var isAuthed = AuthService.isAuthenticated(true);

      // Reset localStorage version
      localStorageService.set("version", Client.version);
      AuthService.signOut();

      // Redirect to signin and toast (If logged in)
      if (isAuthed) {
        toaster.info("Logged out", "Client version updated! Login again, please.");
        $state.go("signin");
      }

      // Stop the route
      event.preventDefault();
    }

    var isAuthenticated = AuthService.isAuthenticated();
    var toDash = toState.name.indexOf("dash.") !== -1;
    var sites = isAuthenticated ? AuthService.getAuthenticatedUser(true).getSites() : [];

    // If requires unauthenticated access only and user is authenticated or
    // If state requires authenticated access only and user is not authenticated
    if ((toState.auth === false && isAuthenticated) || (toState.auth === true && !isAuthenticated)) {
      // Stop changing state
      event.preventDefault();
      // If current state is invalid (first page)
      if (!fromState.name) {
        if (isAuthenticated) {
          $state.go("dash.main", {
            s: 0
          });
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
   * @param toState {object}
   * @param toParams {object}
   */
  $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams) {
    // Analytics
    if (ENV.name === "production") {
      $window.ga("send", "pageview", {
        page: $location.url()
      });
    }

    // Update title
    Codekit.setTitle(toState.title);

    // Switch lights
    if (toParams.lights !== true) {
      $rootScope.set.lights = true;
    }
  });

  /**
   * @event gonevisDash.Dolphin:select
   * @desc Dolphin selection callback, depends on state @editor
   *
   * @param {Event} event
   * @param {Dolphin} dolphin
   * @param {string} source
   */
  $rootScope.$on("gonevisDash.Dolphin:select", function(event, dolphin, source) {
    if ($state.current.editor && source === "editorAddImage") {
      var img = angular.element("img[data-selection=true]");
      img.attr("src", dolphin.get.file);
      img.attr("alt", dolphin.get.meta_data.name);
      img.removeAttr("data-selection");
    }
  });

  /**
   * @event goNevis.ModalsService.close
   * @desc On modal close
   *
   * @param {Event} event
   * @param {string} template
   */
  $rootScope.$on("goNevis.ModalsService.close", function(event, template) {
    if (template === "dolphinSelection") {
      // Check editor for images without source and remove them
      var img = angular.element("[medium-editor] img");
      if (typeof img.attr("src") === "undefined") {
        img.remove();
      }
    }
  });

  /**
   * @event document.click
   * @desc Click callback, depends on state @clickEvent
   */
  angular.element("*").on("click", function(event) {
    if ($state.current.clickEvent) {
      var el = angular.element(event.target);

      // Sidebar handler
      if (el.hasClass("preIn")) {
        angular.element("[ng-click='sidebar = false']").trigger("click");
      }
    }
  });

  /**
   * @desc Change callback
   *
   * @param {Event} event
   */
  angular.element("*").on("DOMSubtreeModified", function(event) {
    if ($state.current.editor) {
      var el = angular.element(event.target);

      // Editor handler
      if (el.parents("[medium-editor]").length) {
        var isInChild = el.children("img").length;
        // Image upload handler
        if (el.prop("tagName") === "IMG" || isInChild) {
          // Get the img
          var img = isInChild ? el.children("img") : el;
          // Already handling or handled
          if (img.attr("data-selection") === "true" || typeof img.attr("alt") !== "undefined") {
            return;
          }
          // Show file selection modal
          DolphinService.viewSelection("editorAddImage");
          // Set to uploading
          img.attr("data-selection", "true");
        }
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
  "TourService",
  "editableOptions",
  "localStorageService"
];
