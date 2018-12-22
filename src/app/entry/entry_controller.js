"use strict";

import app from "../app";
import EntryStatus from "./status";
require("./entry.css");

function EntryController($scope, $state, $stateParams, Entry, UndoService, Codekit, API, AuthService, Pagination, Search,
  localStorageService, $translate, $timeout) {

  let currentView;

  /**
   * @desc Get posts/pages
   *
   * @param {object} tab
   */
  function getEntries(tab) {
    $scope.entries = [];
    $scope.initialled = false;
    let payload = {
      site: AuthService.getCurrentSite(),
      is_page: $scope.isPageView,
      status: $scope.currentTab.status
    };

    API.Entries.get(payload, data => {
      // Check current tab before storing data.
      if ($scope.currentTab !== tab) {
        return;
      }
      angular.forEach(data.results, function(item) {
        $scope.entries.push(new Entry(item));
      });
      $scope.initialled = true;
      $scope.pageForm = Pagination.paginate($scope.pageForm, data, payload);
      $scope.searchForm = Search.searchify($scope.searchForm, $scope.pageForm, API.Entries.get, data, payload);
      UndoService.onParamProvided($scope.entries);
    });
  }

  function constructor() {
    currentView = $stateParams.view ? $stateParams.view : "published";

    $scope.entryStatus = new EntryStatus();
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

    $translate([
      'NO_PAGES', 'NO_POSTS', 'REMOVE_SELECTED_PAGES_PROMPT', 'REMOVE_SELECTED_POSTS_PROMPT', 'DRAFT', 'DRAFTS',
      'HIDE_FROM_PUBLIC', 'PUBLISHED', 'PIN_FRONT_PAGE', 'UNPIN_FRONT_PAGE', "ALLOW_COMMENTING", 'DISABLE_COMMENTING'
    ]).then(function (translation) {
      if ($scope.isPageView) {
        $scope.nothingText = translation.NO_PAGES;
        $scope.removeSelectedPrompt = translation.REMOVE_SELECTED_PAGES_PROMPT;
      } else {
        $scope.nothingText = translation.NO_POSTS;
        $scope.removeSelectedPrompt = translation.REMOVE_SELECTED_POSTS_PROMPT;
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

      // List of tabs
      $scope.tabs = [{
        view: "published",
        label: translation.PUBLISHED,
        status: $scope.entryStatus.PUBLISH
      }, {
        view: "draft",
        label: translation.DRAFTS,
        status: $scope.entryStatus.DRAFT
      }];

      // Set current tab
      angular.forEach($scope.tabs, (tab, index) => {
        if (tab.view === currentView) {
          $scope.setCurrentTab($scope.tabs[index]);
        }
      });
    });
  }

  /**
   * @desc Set current tab
   *
   * @param {object} tab
   */
  $scope.setCurrentTab = function(tab) {
    let state = $scope.isPageView ? 'dash.page-list.status' : 'dash.entry-list.status';
    // Check current tab
    if ($scope.currentTab === tab) {
      return;
    }

    // Change URL
    $state.go(state, { view: tab.view });

    // Set current tab
    $scope.currentTab = tab;
    currentView = tab.view;

    $timeout(() => {
      let activeTab = angular.element("li.current");
      angular.element("span.indicator").css({
        "left": activeTab[0].offsetLeft,
        "width": activeTab.width()
      });
    });

    // Get posts/pages
    getEntries(tab);
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
  "$translate",
  "$timeout"
];
