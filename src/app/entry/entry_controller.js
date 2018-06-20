"use strict";

import app from "../app";

function EntryController($scope, $state, Entry, Codekit, API, AuthService, Pagination, Search, localStorageService,
                        $translate) {

  function constructor() {
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
  "$state",
  "Entry",
  "Codekit",
  "API",
  "AuthService",
  "Pagination",
  "Search",
  "localStorageService",
  "$translate"
];
