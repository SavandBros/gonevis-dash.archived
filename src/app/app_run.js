"use strict";

import app from "./app";

app.run(function ($rootScope, $window, $location, $cookies, $state, $timeout, toaster,
  ENV, AuthService, DolphinService, Codekit, Client, TourService,
  editableOptions, localStorageService, $transitions) {

  /**
   * @name cache
   * @desc Predefined rootscope variable
   *
   * @type {object}
   */
  $rootScope.cache = {};

  if (localStorageService.get("set")) {

    // Load from localStorage
    $rootScope.set = localStorageService.get("set");

  } else {
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
      sidebar: true
    };
  }

  $rootScope.auth = AuthService;

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
  };

  // Set user tracking info
  AuthService.setTrackingInfo();

  // Editable texts config
  editableOptions.theme = "bs3";

  /**
   * @event onStart
   * @desc Starting to change state callback
   *
   * @param transition {Event}
   */
  $transitions.onStart({}, function (transition) {

    // No routing if running tour
    if (TourService.isTourOn() && transition.from().name) {
      transition.abort();
    }

    // Close open modals
    angular.element(".modal, .modal-backdrop").fadeOut(
      function () {
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
      transition.abort();
    }


    var isAuthenticated = AuthService.isAuthenticated();
    var toDash = transition.to().name.indexOf("dash.") !== -1;
    var sites = isAuthenticated ? AuthService.getAuthenticatedUser(true).getSites() : [];


    // If requires unauthenticated access only and user is authenticated or
    // If state requires authenticated access only and user is not authenticated
    if ((transition.to().auth === false && isAuthenticated) || (transition.to().auth === true && !isAuthenticated)) {
      // Stop changing state
      transition.abort();
      // If current state is invalid (first page)
      if (!transition.from().name) {
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
        transition.abort();
        return $state.go("site-new");
      }

      // If has an invalid site index
      if (sites.length && !sites[transition.params().s]) {
        // Stop changing state
        transition.abort();
        // Redirect with the same state but first site
        $state.go(
          transition.to().name, angular.extend({}, transition.params(), { s: 0}));
      }
    }
  });

  /**
   * @event onSuccess
   * @desc Changed state succesfully
   *
   * @param transition {Event}
   */
  $transitions.onSuccess({}, function (transition) {
    // Analytics
    if (ENV.name === "production") {
      $window.ga("send", "pageview", {
        page: $location.url()
      });
    }

    // // Update title
    Codekit.setTitle(transition.$to().self.title);

    // Switch lights
    if (transition.params().lights !== true) {
      $rootScope.set.lights = true;
    }

    // Init dropdowns after render
    $timeout(function () {
      angular.element(".dropdown-toggle").dropdown();
    });
  });

  /**
   * @event gonevisDash.Dolphin:select
   * @desc Dolphin selection callback, depends on state @editor
   *
   * @param {Event} event
   * @param {Dolphin} dolphin
   * @param {string} source
   */
  $rootScope.$on("gonevisDash.Dolphin:select", function (event, dolphin, source) {
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
  $rootScope.$on("goNevis.ModalsService.close", function (event, template) {
    if (template === "dolphinSelection") {
      // Check editor for images without source and remove them
      angular.forEach(angular.element("[medium-editor] img"), function (element) {
        var img = angular.element(element);
        if (typeof img.attr("src") === "undefined") {
          img.remove();
        }
      });
    }
  });

  /**
   * @event $rootScope.set
   * @desc Update settings to local storage
   */
  $rootScope.$watch(function () {
    return $rootScope.set;
  }, function () {
    // Update localStorage
    localStorageService.set("set", $rootScope.set);
  }, true);

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

  /**
   * @desc Change callback
   *
   * @param {Event} event
   */
  angular.element("*").on("DOMSubtreeModified", function (event) {
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
});
