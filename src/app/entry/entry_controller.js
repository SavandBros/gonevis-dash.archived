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
      'NO_PAGES', 'NO_POSTS', 'DRAFT', 'HIDE_FROM_PUBLIC', 'PUBLISHED',
      'PIN_FRONT_PAGE', 'UNPIN_FRONT_PAGE', "ALLOW_COMMENTING", 'DISABLE_COMMENTING'
    ]).then(function (translation) {
      if ($scope.isPageView) {
        $scope.nothingText = translation.NO_PAGES;
      } else {
        $scope.nothingText = translation.NO_POSTS;
      }

      $scope.actions = [{
        label: translation.DRAFT,
        tooltip: translation.HIDE_FROM_PUBLIC,
        icon: "pencil",
        property: "status",
        value: 0
      }, {
        label: translation.PUBLISHED,
        icon: "globe",
        property: "status",
        value: 1
      }, {
        label: translation.PIN_FRONT_PAGE,
        icon: "star",
        property: "featured",
        value: true
      }, {
        label: translation.UNPIN_FRONT_PAGE,
        icon: "star-o",
        property: "featured",
        value: false
      }, {
        label: translation.ALLOW_COMMENTING,
        icon: "comments",
        property: "comment_enabled",
        value: true
      }, {
        label: translation.DISABLE_COMMENTING,
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
        UndoService.onParamProvided($scope.entries);
      }
    );
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
