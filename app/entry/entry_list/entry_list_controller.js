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

    var payload = { site: AuthService.getCurrentSite() };
    API.Entries.get(payload,
      function (data) {
        $scope.entries = data.results;
        $scope.entryForm = Pagination.paginate($scope.entryForm, data, payload);
      }
    );
  }

  /**
   * search
   *
   * @method search
   * @desc Search through entries
   */
  $scope.search = function () {
    var payload = { search: $scope.filters.title };

    API.Entries.get(payload,
      function (data) {
        $scope.entries = data.results;
        $scope.entryForm = Pagination.paginate($scope.entryForm, data, payload);
        if (!data.count) {
          $scope.noResults = true;
        } else {
          $scope.noResults = false;
        }
      }
    );
  };

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
      if ($scope.entries[i].isSelected) {
        $scope.remove($scope.entries[i]);
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
      if (entry.isSelected) {
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
   * setComment
   *
   * @method setComment
   * @desc set selected comment status
   *
   * @param enable{bool}
   */
  $scope.setComment = function (enable) {
    for (var i = 0; i < $scope.entries.length; i++) {
      var entry = $scope.entries[i];
      if (entry.isSelected) {
        API.Entry.patch({ entry_id: entry.id }, { comment_enabled: enable },
          function (data) {
            entry = data;
            entry.isSelected = true;
            $mdToast.showSimple("Commenting " + (enable ? "enabled" : "disabled"));
          }
        );
      }
    }
  };

  /**
   * setFeature
   *
   * @method setFeature
   * @desc set selected feature status
   *
   * @param enable{Boolean}
   */
  $scope.setFeature = function (enable) {
    for (var i = 0; i < $scope.entries.length; i++) {
      var entry = $scope.entries[i];
      if (entry.isSelected) {
        API.Entry.patch({ entry_id: entry.id }, { featured: enable },
          function (data) {
            entry = data;
            entry.isSelected = true;
            $mdToast.showSimple("Feature " + (enable ? "enabled" : "disabled"));
          }
        );
      }
    }
  }

  /**
   * countSelected
   *
   * @method countSelected
   * @desc Count selected entries
   */
  $scope.countSelected = function () {
    $scope.selectCount = 0;
    for (var i in $scope.entries) {
      if ($scope.entries[i].isSelected) {
        $scope.selectCount++;
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
        entry.isSelected = false;
        $scope.selectCount = 0;
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
      $scope.entryForm.page = data.page;
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
