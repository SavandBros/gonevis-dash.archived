"use strict"

/**
 * @ngdoc function
 * @name gonevisDash.controller:EntryListController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param Codekit
 * @param API
 * @param AuthService
 * @param Pagination
 */
function EntryListController($scope, $rootScope, $state, $mdToast, Codekit, API, AuthService, Pagination) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.nothing = { text: "It's lonely here... Try adding some entries!" };
    $scope.filters = { title: "" };
    $scope.statuses = Codekit.entryStatuses;
    $scope.entryForm = {};
    $scope.pageForm = {};

    var payload = { site: AuthService.getCurrentSite() };
    API.Entries.get(payload,
      function (data) {
        $scope.entries = data.results;
        $scope.pageForm = Pagination.paginate($scope.pageForm, data, payload);
      }
    );
  }

  /**
   * removeSelected
   *
   * @method removeSelected
   * @desc Remove selected entries
   *
   * @param entry{object}
   */
  $scope.removeSelected = function (entry) {
    for (var i = 0; i < $scope.entries.length; i++) {
      if ($scope.entries[i].selected) {
        $scope.delete($scope.entries[i])
      }
    }
  }

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
  }

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
      function (data) {
        entry.isDeleted = true;
        $mdToast.showSimple("Entry deleted!");
      }
    );
  }

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

  constructor()
}

app.controller("EntryListController", EntryListController)
EntryListController.$inject = [
  "$scope",
  "$rootScope",
  "$state",
  "$mdToast",
  "Codekit",
  "API",
  "AuthService",
  "Pagination"
]
