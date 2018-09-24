"use strict";

import app from "../app";

function EntryController($scope, $rootScope, $state, $stateParams, Entry, Codekit, API, AuthService, Pagination, Search, localStorageService,
                        $translate, toaster, $timeout) {

  let deletedEntry = $stateParams.deletedEntry;
  let undoToaster;
  let undoTimeout;

  function handleEntryDeleteFinish(remove, permanent) {
    angular.forEach($scope.entries, function(entry) {
      if (entry.get.id === $stateParams.deletedEntry) {
        if (permanent && deletedEntry) {
          return entry.remove(true);
        }

        entry.isDeleted = remove;
      }
    });
  }

  function constructor() {
    if (deletedEntry) {
      $scope.onDeletedEntry();
    }
    $scope.codekit = Codekit;
    $scope.isPageView = $state.includes("dash.page-list");
    $scope.view = localStorageService.get("entryView") || "list";
    $scope.filters = {
      title: ""
    };
    $scope.statuses = Codekit.entryStatuses;
    $scope.search = Search;
    $scope.pageForm = {};
    $scope.entries = [];

    $translate([
      'NO_PAGES', 'NO_POSTS', 'DRAFT', 'PUBLISHED',
      'PIN', 'UNPIN', "ENABLE_COMMENTS", 'DISABLE_COMMENTS'
    ]).then(function (translation) {
      if ($scope.isPageView) {
        $scope.nothingText = translation.NO_PAGES;
      } else {
        $scope.nothingText = translation.NO_POSTS;
      }

      $scope.actions = [{
        label: translation.DRAFT,
        icon: "pencil",
        property: "status",
        value: 0
      }, {
        label: translation.PUBLISHED,
        icon: "globe",
        property: "status",
        value: 1,
      }, {
        label: translation.PIN,
        icon: "star",
        property: "featured",
        value: true
      }, {
        label: translation.UNPIN,
        icon: "star-o",
        property: "featured",
        value: false
      }, {
        label: translation.ENABLE_COMMENTS,
        icon: "comments",
        property: "comment_enabled",
        value: true
      }, {
        label: translation.DISABLE_COMMENTS,
        icon: "ban",
        property: "comment_enabled",
        value: false
      }];
    });

    var payload = {
      site: AuthService.getCurrentSite(),
      is_page: $scope.isPageView
    };

    API.Entries.get(payload,
      function(data) {
        angular.forEach(data.results, function(item) {
          $scope.entries.push(new Entry(item));
        });
        $scope.initialled = true;
        $scope.pageForm = Pagination.paginate($scope.pageForm, data, payload);
        $scope.searchForm = Search.searchify($scope.searchForm, $scope.pageForm, API.Entries.get, data, payload);

        if (deletedEntry) {
          handleEntryDeleteFinish(true);
        }
      }
    );
  }

  /**
   * @desc set property of selected entries
   *
   * @param {string} key
   * @param {boolean|number} value
   */
  $scope.setProperty = function(key, value) {
    angular.forEach($scope.entries, function(entry) {
      if (entry.isSelected) {
        entry.setProperty(key, value);
      }
    });
  };

  /**
   * @desc Remove selected entries
   */
  $scope.removeSelected = function() {

    if (confirm($translate.instant('REMOVE_SELECTED_ENTRY_PROMPT')) === true) {
      angular.forEach($scope.entries, function(entry) {
        if (entry.isSelected) {
          entry.remove();
        }
      });
    } else {
      return;
    }
  };

  /**
   * @desc Count selected entries
   */
  $scope.countSelected = function() {
    $scope.selectCount = 0;
    angular.forEach($scope.entries, function(entry) {
      if (entry.isSelected) {
        $scope.selectCount++;
      }
    });
  };


  /**
   * @desc Handle entry deletion.
   *
   * @param {object} entry
   */
  $scope.onDeletedEntry = (entry) => {
    // If an entry was provided, then hide it temporary.
    if (entry) {
      entry.isSelected = false;
      entry.isDeleted = true
    };

    // Clear undo toaster
    toaster.clear(undoToaster);
    $translate(['UNDO_DELETE', 'UNDO_DELETE_MESSAGE']).then(function (translation) {
      undoToaster = toaster.pop(
        "success",
        translation.UNDO_DELETE,
        translation.UNDO_DELETE_MESSAGE, 5000,
        'trustedHtml',
        function() {
          deletedEntry = null;

          // If an entry was provided, then hide it temporary.
          if (entry) {
            entry.isDeleted = false;
            return true;
          }

          handleEntryDeleteFinish(false, false);
          return true;
        }
      );
    });

    // Cancel last "undoTimeout" timeouts.
    $timeout.cancel(undoTimeout);
    // Proceed to deletion After 5 seconds.
    undoTimeout = $timeout(() => {
      // Clear undo toaster
      toaster.clear(undoToaster);
      // If an entry was provided, then delete.
      if (entry && entry.isDeleted === true) {
        return entry.remove(true);
      }

      // If param "deletedEntry" has value, then delete.
      if (deletedEntry) {
        handleEntryDeleteFinish(true, true);
      }
    }, 5500);
  }

  /**
   * @desc Load more function for controller
   */
  $scope.loadMore = Pagination.loadMore;

  /**
   * @desc Load more callback
   *
   * @param {Event} event
   * @param {object} data
   */
  $scope.$on("gonevisDash.Pagination:loadedMore", function(event, data) {
    if (data.success) {
      $scope.pageForm.page = data.page;
      angular.forEach(data.data.results, function(data) {
        $scope.entries.push(new Entry(data));
      });
    }
  });

  /**
   * @desc Search callback
   *
   * @param {Event} event
   * @param {object} data
   */
  $scope.$on("gonevisDash.Search:submit", function(event, data) {
    if (data.success) {
      $scope.pageForm = data.pageForm;
      $scope.entries = [];
      angular.forEach(data.data.results, function(data) {
        $scope.entries.push(new Entry(data));
      });
      $scope.searchForm = data.form;
    }
  });

  constructor();
}

app.controller("EntryController", EntryController);
EntryController.$inject = [
  "$scope",
  "$rootScope",
  "$state",
  "$stateParams",
  "Entry",
  "Codekit",
  "API",
  "AuthService",
  "Pagination",
  "Search",
  "localStorageService",
  "$translate",
  "toaster",
  "$timeout"
];
