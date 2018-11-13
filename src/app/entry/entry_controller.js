"use strict";

import app from "../app";

function EntryController($scope, $state, $stateParams, Entry, UndoService, Codekit, API, AuthService, Pagination, Search, localStorageService,
                        $translate) {

  function constructor() {
    $scope.undoService = UndoService;
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

      $scope.options = [{
        label: "Status",
        description: "Change status",
        property: "status",
        list: [{
          label: translation.PUBLISHED,
          icon: "globe",
          value: 1,
        }, {
          label: translation.DRAFT,
          icon: "pencil",
          value: 0
        }]
      }, {
        label: "Set feature",
        description: "Pin to front page",
        property: "featured",
        list: [{
          label: translation.PIN,
          icon: "star",
          value: true
        }, {
          label: translation.UNPIN,
          icon: "star-o",
          value: false
        }]
      }, {
        label: "Commenting",
        description: "Change commenting",
        property: "comment_enabled",
        list: [{
          label: translation.ENABLE_COMMENTS,
          icon: "comments",
          value: true
        }, {
          label: translation.DISABLE_COMMENTS,
          icon: "ban",
          value: false
        }]
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
        UndoService.onParamProvided($scope.entries);
      }
    );
  }

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
      UndoService.onParamProvided($scope.entries);
    }
  });

  constructor();
}

app.controller("EntryController", EntryController);
EntryController.$inject = [
  "$scope",
  "$state",
  "$stateParams",
  "Entry",
  "UndoService",
  "Codekit",
  "API",
  "AuthService",
  "Pagination",
  "Search",
  "localStorageService",
  "$translate"
];
