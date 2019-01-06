"use strict";
import headerTemplate from "./header_view.html";

import app from "../app";

function HeaderController($scope, $rootScope, $state, $stateParams, $timeout, AuthService, DolphinService, Codekit,
  Entry, API, ModalsService, TourService, toaster, $translate, $transitions, $window) {

  function constructor() {
    $scope.codekit = Codekit;

    // Settings
    $scope.set = $rootScope.set;

    // User
    $scope.auth = AuthService;
    $scope.user = AuthService.getAuthenticatedUser(true);

    // State
    $scope.state = $state;

    // Entry formats
    $scope.entryFormats = Codekit.entryFormats;

    $translate([
      "DASHBOARD", "WRITE", "POSTS", "PAGES", "READER", "TAGS",
      "COMMENTS", "MEDIA", "NAVIGATIONS", "TEAM", "SETTINGS"
    ]).then(function (translations) {
      // Navs
      $scope.mainNavs = [{
        label: translations.DASHBOARD,
        sref: "dash.main",
        icon: "fa-dashboard"
      }, {
        label: translations.WRITE,
        sref: "dash.entry-edit",
        icon: "fa-plus"
      }, {
        label: translations.POSTS,
        sref: "dash.entry-list.status",
        view: "published",
        icon: "fa-book"
      }, {
        label: translations.PAGES,
        sref: "dash.page-list.status",
        view: "published",
        icon: "fa-newspaper-o"
      }, {
        label: translations.TAGS,
        sref: "dash.tag-list",
        icon: "fa-tag"
      }, {
        label: translations.COMMENTS,
        sref: "dash.comment-list",
        icon: "fa-comments-o"
      }, {
        label: translations.MEDIA,
        sref: "dash.dolphin",
        icon: "fa-file-image-o"
      }, {
        label: translations.NAVIGATIONS,
        sref: "dash.navigation",
        icon: "fa-bars"
      }, {
        label: translations.TEAM,
        sref: "dash.team",
        icon: "fa-users"
      }, {
        label: translations.SETTINGS,
        sref: "dash.site.settings",
        view: "settings",
        icon: "fa-cog"
      }];
    });
  }

  /**
   * @desc Retrieve user data
   */
  function retrieveUser() {
    // Get fresh user data if is authenticated
    if (AuthService.isAuthenticated()) {
      API.AccountRefresh.save({
          token: AuthService.getToken()
        },
        function (data) {
          $scope.user = AuthService.setAuthenticatedUser(data.user);
        }
      );
    }
  }

  /**
   * @desc Handle user selection of quick nevis
   *
   * @param {string} format
   * @param {Dolphin|object|string} data
   */
  function handleNevis(format, data) {
    // New entry
    var entry = new Entry({
      site: AuthService.getCurrentSite(),
      format: Codekit.entryFormats[0][format].id
    });
    // Set image properties
    if (format === "image") {
      entry.get.cover_image = data.get.id;
      entry.get.title = data.get.meta_data.name;
      entry.get.content = "<img src='" + data.get.file + "' alt='" + data.get.meta_data.name + "'/>";
    }
    // Entry submission
    entry.create(
      function (data) {
        // Prevent older cache
        entry.cache(true);
        $translate(["DONE", "ENTRY_CREATED"]).then(function (translations) {
          toaster.success(translations.DONE, translations.ENTRY_CREATED);
        });
        // Go for edit
        $state.go("dash.entry-edit", {
          s: $stateParams.s,
          entryId: data.id
        });
      },
      function () {
        $translate(["ERROR", "WRONG_POST_CREATION_FAILED"]).then(function (translations) {
          toaster.success(translations.ERROR, translations.WRONG_POST_CREATION_FAILED);
        });
      }
    );
    // Clear
    $scope.nevisFormat = null;
  }

  /**
   * @desc Entry with different format
   *
   * @param {string} format
   */
  $scope.nevis = function (format) {
    $scope.nevisFormat = format;
    if (format === "image") {
      DolphinService.viewSelection("headerNevis");
    }
  };

  /**
   * @param {string} blogUrl
   */
  $scope.visitBlog = blogUrl => {
    let schema = "https://";
    // Check if blog url ends with 'gonevis.com'.
    if (!blogUrl.endsWith("gonevis.com")) {
      schema = "//";
    }
    // Open blog URL in new tab.
    $window.open(schema + blogUrl);
  };

  /**
   * Change current site and save to lastSite
   * @param {number} index
   */
  $scope.setSite = function (index) {
    $rootScope.set.lastSite = index;
    $scope.currentSite = $scope.user.getSites()[index];
  };

  /**
   * Get current site's logo
   * @param {object} site
   *
   * @returns {string}
   */
  $scope.currentSiteLogo = (site) => {
    if (site && site.media.logo) {
      return site.media.logo.thumbnail_48x48;
    }

    return Codekit.getDefaultImage('tiny');
  };

  /**
   * Open feedback modal
   */
  $scope.feedback = function() {
    ModalsService.open("feedback", "FeedbackController");
  };

  /**
   * Show a toaster that says: 'Happy new year USERNAME'.
   */
  $scope.happyNewYear = () => {
    $translate("HAPPY_NEW_YEAR", { username: $scope.user.get.username }).then(translation => {
      toaster.info("2019", translation);
    });
  };

  /**
   * @desc Dolphin selection used for quick nevis
   *
   * @param {Event} event
   * @param {Dolphin} dolphin
   * @param {string} source
   */
  $scope.$on("gonevisDash.Dolphin:select", function (event, dolphin, source) {
    // If we're dealing with quick nevis
    if (source === "headerNevis") {
      handleNevis($scope.nevisFormat, dolphin);
    }
  });

  /**
   * @desc Authentication loads
   */
  $scope.$on("gonevisDash.AuthService:Authenticated", function () {
    constructor();
    // Go to main or new site page if has no other sites
    if ($scope.user.getSites().length > 0) {
      $state.go("dash.main", {
        s: 0
      });
    } else {
      $state.go("site-new");
    }
  });

  /**
   * @desc Un-authentication redirect
   *
   * @param {Event} event
   * @param {boolean} sessionExpired
   */
  $scope.$on("gonevisDash.AuthService:SignedOut", function (event, sessionExpired) {
    // Session expired message
    if (sessionExpired) {
      toaster.clear($scope.signOutToast);
      $translate(["LOGGED_OUT", "SESSION_EXPIRED"]).then(function (translations) {
        $scope.signOutToast = toaster.info(translations.LOGGED_OUT, translations.SESSION_EXPIRED);
      });
    }
    // Sign out completely
    AuthService.unAuthenticate();

    $timeout(() => {
      $state.go("start", {}, {reload: true});
    });
  });

  /**
   * @desc Email is not confirmed for an action
   */
  $scope.$on("gonevisDash.AuthInterceptor.UnconfirmedEmailAccess", function () {
    ModalsService.open("emailConfirmation", "EmailConfirmationController");
  });

  /**
   * @desc Site creation load
   */
  $scope.$on("gonevisDash.SiteNewController:Create", constructor);

  /**
   * @desc Site removal
   */
  $scope.$on("gonevisDash.SiteController:remove", constructor);

  /**
   * @desc Site update
   */
  $scope.$on("gonevisDash.SiteController:update", () => {
    constructor();
    $scope.currentSite = $scope.user.getSites()[$scope.param.s];
  });

  /**
   * @desc User update
   */
  $scope.$on("gonevisDash.UserController:update", constructor);

  /**
   * @event onBefore
   * @desc Before starting to change state callback
   *
   * @param transition {Event}
   */
  $transitions.onBefore({}, function(transition) {
    $scope.param = transition.params();
    let stateName = transition.to().name;

    if (AuthService.isAuthenticated()) {
      if (stateName.indexOf("site-new") !== -1) {
        $rootScope.set.sidebar = false;
      }
      let index = $rootScope.set.lastSite;

      // Check if current state is includes dash in it's name.
      if (stateName.indexOf("dash") !== -1) {
        index = $scope.param.s;
        $rootScope.set.lastSite = index;
      }

      $scope.currentSite = $scope.user.getSites()[index];

      // Sidebar indicator
      $scope.$watch("mainNavs", function(oldValue) {
        if (!oldValue) {
          return;
        }
        if (stateName.indexOf("dash") !== -1) {
          $timeout(() => {
            let activeNav = angular.element(`a[name="${stateName}"]`)[0];
            angular.element("div.indicator").css({
              "top": activeNav.offsetTop,
              "height": activeNav.offsetHeight
            });
          });
        }
      });
    }
  });

  /**
   * @desc Check for tours
   *
   * @todo Fix me
   *
   * @param {Event} event
   * @param {string} tourName
   */
  // $scope.$on("gonevisDash.Tour.readyToCheck", function (event, tourName) {
  //   // Wait for DOM to finish rendering
  //   $timeout(function () {
  //     $scope.tour = TourService.checkForView(tourName);
  //   });
  // });

  constructor();
  retrieveUser();
}

app.component("header", {
  template: headerTemplate,
  controller: HeaderController
});
HeaderController.$inject = [
  "$scope",
  "$rootScope",
  "$state",
  "$stateParams",
  "$timeout",
  "AuthService",
  "DolphinService",
  "Codekit",
  "Entry",
  "API",
  "ModalsService",
  "TourService",
  "toaster",
  "$translate",
  "$transitions",
  "$window"
];
