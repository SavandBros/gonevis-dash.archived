"use strict";

/**
 * @ngdoc function
 * @name gonevisDash.controller:EntryController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param API
 * @param AuthService
 * @param Pagination
 * @param Search
 */
function EntryController($scope, $rootScope, $state, $mdToast, Codekit, API, AuthService, Pagination, Search) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.nothing = { text: "It's lonely here... Try adding some entries!" };
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

  $scope.filters = { title: "" };

  /**
   * removeSelected
   *
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
   * setStatus
   *
   * @method setStatus
   * @desc set selected status
   *
   * @param status{number}
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
   * remove
   *
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
   * cacheEntry
   *
   * @method cacheEntry
   * @desc Save all data of entry so entry-edit can load it instantly
   *
   * @param entry {Object}
   */
  $scope.cacheEntry = function (entry) {
    $rootScope.cachedEntryTitle = entry.title;
  };

  /**
   * loadMore
   *
   * @method loadMore
   * @desc Load more function for controller
   */
  $scope.loadMore = Pagination.loadMore;

  $scope.$on("gonevisDash.Pagination:loadedMore", function (event, data) {
    if (data.success) {
      $scope.pageForm.page = data.page;
      $scope.entries = $scope.entries.concat(data.data.results);
    }
  });

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
  "Codekit",
  "API",
  "AuthService",
  "Pagination",
  "Search"
];
