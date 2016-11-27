"use strict";

/**
 * @class EntryController
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param EntryService
 * @param API
 * @param AuthService
 * @param Pagination
 * @param Search
 */
function EntryController($scope, $rootScope, $state, $mdToast,
  EntryService, Codekit, API, AuthService, Pagination, Search) {

  /**
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.nothing = { text: "It's lonely here... Try adding some entries!" };
    $scope.filters = { title: "" };
    $scope.entryService = EntryService;
    $scope.statuses = Codekit.entryStatuses;
    $scope.search = Search;
    $scope.pageForm = {};

    var payload = { site: AuthService.getCurrentSite() };

    API.Entries.get(payload,
      function (data) {
        $scope.initialled = true;
        $scope.entries = data.results;
        $scope.pageForm = Pagination.paginate($scope.pageForm, data, payload);
        $scope.searchForm = Search.searchify($scope.searchForm, $scope.pageForm, API.Entries.get, data, payload);
      }
    );
  }

  /**
   * @method removeSelected
   * @desc Remove selected entries
   */
  $scope.removeSelected = function () {
    for (var i = 0; i < $scope.entries.length; i++) {
      if ($scope.entries[i].selected) {
        $scope.remove($scope.entries[i]);
      }
    }
  };

  /**
   * @method setStatus
   * @desc Set selected status
   *
   * @param status {Number}
   */
  $scope.setStatus = function (status) {
    for (var i = 0; i < $scope.entries.length; i++) {
      var entry = $scope.entries[i];
      if (entry.selected) {
        API.Entry.patch({ entry_id: entry.id }, { status: status },
          function (data) {
            entry = data;
            $mdToast.showSimple("Status changed!");
          }
        );
      }
    }
  };

  /**
   * @method remove
   * @desc Delete entries via API call
   * 
   * @param entry {object}
   */
  $scope.remove = function (entry) {
    API.Entry.delete({ entry_id: entry.id },
      function () {
        entry.isDeleted = true;
        $mdToast.showSimple("Entry deleted!");
      }
    );
  };

  /**
   * @method loadMore
   * @desc Load more function for controller
   */
  $scope.loadMore = Pagination.loadMore;

  /**
   * @event gonevisDash.Pagination:loadedMore
   * @desc Load more callback
   *
   * @param event {Event}
   * @param data {Object}
   */
  $scope.$on("gonevisDash.Pagination:loadedMore", function (event, data) {
    if (data.success) {
      $scope.pageForm.page = data.page;
      $scope.entries = $scope.entries.concat(data.data.results);
    }
  });

  /**
   * @event gonevisDash.Search:submit
   * @desc Search callback
   *
   * @param event {Event}
   * @param data {Object}
   */
  $scope.$on("gonevisDash.Search:submit", function (event, data) {
    if (data.success) {
      $scope.pageForm = data.pageForm;
      $scope.entries = data.data.results;
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
  "$mdToast",
  "EntryService",
  "Codekit",
  "API",
  "AuthService",
  "Pagination",
  "Search"
];
