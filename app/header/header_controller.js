"use strict";

/**
 * @class HeaderController
 *
 * @param $scope
 * @param $state
 * @param $stateParams
 * @param AuthService
 * @param DolphinService
 * @param Codekit
 * @param Entry
 * @param API
 * @param toaster
 */
function HeaderController($scope, $rootScope, $state, $stateParams,
  AuthService, DolphinService, Codekit, Entry, API, toaster) {

  /**
   * @method constructor
   * @desc Init function for controller
   */
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
   * @method handleNevis
   * @desc Handle user selection of quick nevis
   *
   * @param {String} format 
   * @param {Dolphin|Object|String} data
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
      function (data) {
        // Prevent older cache
        entry.cache(true);
        toaster.success("Done", "Entry created!");
        // Go for edit
        $state.go("dash.entry-edit", {
          s: $stateParams.s,
          entryId: data.id
        });
      },
      function () {
        toaster.error("Error", "Something went wrong, failed to create entry.");
      }
    );
    // Clear
    $scope.nevisFormat = null;
  }

  /**
   * @method nevis
   * @desc Entry with different format
   *
   * @param format {String}
   */
  $scope.nevis = function (format) {
    $scope.nevisFormat = format;
    if (format === "image") {
      DolphinService.viewSelection("headerNevis");
    }
  };

  /**
   * @event gonevisDash.Dolphin:select
   * @desc Dolphin selection used for quick nevis
   *
   * @param event {Event}
   * @param dolphin {Dolphin}
   * @param source {String}
   */
  $scope.$on("gonevisDash.Dolphin:select", function (event, dolphin, source) {
    // If we're dealing with quick nevis
    if (source === "headerNevis") {
      handleNevis($scope.nevisFormat, dolphin);
    }
  });

  /**
   * @event gonevisDash.AuthService:Authenticated
   * @desc Authentication loads
   */
  $scope.$on("gonevisDash.AuthService:Authenticated", function () {
    constructor();
    // Go to main or new site page if has no other sites
    if ($scope.user.get.sites.length) {
      $state.go("dash.main", { s: 0 });
    } else {
      $state.go("site-new");
    }
  });

  /**
   * @event gonevisDash.AuthService:SignedOut
   * @desc Un-authentication redirect
   *
   * @param event {Event}
   * @param sessionExpired {Boolean}
   */
  $scope.$on("gonevisDash.AuthService:SignedOut", function (event, sessionExpired) {
    // Session expired message
    if (sessionExpired) {
      toaster.clear($scope.signOutToast);
      $scope.signOutToast = toaster.info("Logged out", "Looks like your session has expired, login again.");
    }
    // Sign out completely
    AuthService.unAuthenticate();
    $state.go("signin");
  });

  /**
   * @event gonevisDash.SiteNewController:Create
   * @desc Site creation load
   */
  $scope.$on("gonevisDash.SiteNewController:Create", constructor);

  /**
   * @event gonevisDash.SiteController:remove
   * @desc Site removal
   */
  $scope.$on("gonevisDash.SiteController:remove", constructor);

  /**
   * @event gonevisDash.SiteController:update
   * @desc Site update
   */
  $scope.$on("gonevisDash.SiteController:update", constructor);

  /**
   * @event gonevisDash.UserController:update
   * @desc User update
   */
  $scope.$on("gonevisDash.UserController:update", constructor);

  constructor();
}

app.controller("HeaderController", HeaderController);
HeaderController.$inject = [
  "$scope",
  "$rootScope",
  "$state",
  "$stateParams",
  "AuthService",
  "DolphinService",
  "Codekit",
  "Entry",
  "API",
  "toaster"
];
