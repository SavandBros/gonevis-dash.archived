"use strict";

function EntryController($scope, Entry, Codekit, API, AuthService, Pagination, Search) {

  function constructor() {
    $scope.view = localStorage.entryView || "list";
    $scope.filters = { title: "" };
    $scope.statuses = Codekit.entryStatuses;
    $scope.search = Search;
    $scope.pageForm = {};
    $scope.entries = [];
    $scope.actions = [{
      label: "Draft",
      icon: "pencil",
      property: "status",
      value: 0
    }, {
      label: "Published",
      icon: "globe",
      property: "status",
      value: 1,
    }, {
      label: "Pin (Featured)",
      icon: "star",
      property: "featured",
      value: true
    }, {
      label: "Unpin",
      icon: "star-o",
      property: "featured",
      value: false
    }, {
      label: "Enable Comments",
      icon: "comments",
      property: "comment_enabled",
      value: true
    }, {
      label: "Disable Comments",
      icon: "ban",
      property: "comment_enabled",
      value: false
    }];

    var payload = { site: AuthService.getCurrentSite() };

    API.Entries.get(payload,
      function (data) {
        angular.forEach(data.results, function (item) {
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
  $scope.setProperty = function (key, value) {
    angular.forEach($scope.entries, function (entry) {
      if (entry.isSelected) {
        entry.setProperty(key, value);
      }
    });
  };

  /**
   * @desc Set item view style
   *
   * @param {string} view
   */
  $scope.setView = function (view) {
    $scope.view = view;
    localStorage.entryView = view;
  };

  /**
   * @desc Remove selected entries
   */
  $scope.removeSelected = function () {

    if (confirm("Delete selected entries?\nDeleting entries can not be undone!") === true) {
      angular.forEach($scope.entries, function (entry) {
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
  $scope.countSelected = function () {
    $scope.selectCount = 0;
    angular.forEach($scope.entries, function (entry) {
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
  $scope.$on("gonevisDash.Pagination:loadedMore", function (event, data) {
    if (data.success) {
      $scope.pageForm.page = data.page;
      angular.forEach(data.data.results, function (data) {
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
  $scope.$on("gonevisDash.Search:submit", function (event, data) {
    if (data.success) {
      $scope.pageForm = data.pageForm;
      $scope.entries = [];
      angular.forEach(data.data.results, function (data) {
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
  "Entry",
  "Codekit",
  "API",
  "AuthService",
  "Pagination",
  "Search"
];
