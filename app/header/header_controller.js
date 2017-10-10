"use strict";

function HeaderController($scope, $rootScope, $state, $stateParams, $timeout,
  AuthService, DolphinService, Codekit, Entry, API, ModalsService, TourService, toaster) {

  function constructor() {

    // User
    $scope.auth = AuthService;
    $scope.user = AuthService.getAuthenticatedUser(true);

    // State
    $scope.state = $state;
    $scope.param = $stateParams;

    // Entry formats
    $scope.entryFormats = Codekit.entryFormats;
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
        function(data) {
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
      format: Codekit.entryFormats[format].id
    });
    // Set image properties
    if (format === "image") {
      entry.get.cover_image = data.get.id;
      entry.get.title = data.get.meta_data.name;
      entry.get.content = "<img src='" + data.get.file + "' alt='" + data.get.meta_data.name + "'/>";
    }
    // Entry submission
    entry.create(
      function(data) {
        // Prevent older cache
        entry.cache(true);
        toaster.success("Done", "Entry created!");
        // Go for edit
        $state.go("dash.entry-edit", {
          s: $stateParams.s,
          entryId: data.id
        });
      },
      function() {
        toaster.error("Error", "Something went wrong, failed to create entry.");
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
  $scope.nevis = function(format) {
    $scope.nevisFormat = format;
    if (format === "image") {
      DolphinService.viewSelection("headerNevis");
    }
  };

  /**
   * @desc Dolphin selection used for quick nevis
   *
   * @param {Event} event
   * @param {Dolphin} dolphin
   * @param {string} source
   */
  $scope.$on("gonevisDash.Dolphin:select", function(event, dolphin, source) {
    // If we're dealing with quick nevis
    if (source === "headerNevis") {
      handleNevis($scope.nevisFormat, dolphin);
    }
  });

  /**
   * @desc Authentication loads
   */
  $scope.$on("gonevisDash.AuthService:Authenticated", function() {
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
  $scope.$on("gonevisDash.AuthService:SignedOut", function(event, sessionExpired) {
    // Session expired message
    if (sessionExpired) {
      toaster.clear($scope.signOutToast);
      $scope.signOutToast = toaster.info("Logged out", "Looks like your session has expired, login again.");
    }
    // Sign out completely
    AuthService.unAuthenticate();
    $state.go("start");
  });

  /**
   * @desc Email is not confirmed for an action
   */
  $scope.$on("gonevisDash.AuthInterceptor.UnconfirmedEmailAccess", function() {
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
  $scope.$on("gonevisDash.SiteController:update", constructor);

  /**
   * @desc User update
   */
  $scope.$on("gonevisDash.UserController:update", constructor);

  /**
   * @desc Check for tours
   *
   * @param {Event} event
   * @param {string} tourName
   */
  $scope.$on("gonevisDash.Tour.readyToCheck", function(event, tourName) {
    // Wait for DOM to finish rendering
    $timeout(function() {
      $scope.tour = TourService.checkForView(tourName);
    });
  });

  constructor();
  retrieveUser();
}

app.controller("HeaderController", HeaderController);
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
  "toaster"
];
