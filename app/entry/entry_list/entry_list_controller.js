"use strict"

/**
 * @ngdoc function
 * @name gonevisDash.controller:EntryListController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param API
 * @param AuthService
 * @param Codekit
 */
function EntryListController($scope, $rootScope, $state, $mdToast, Codekit, API, AuthService) {

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

    API.Entries.get({ site: AuthService.getCurrentSite() },
      function (data) {
        $scope.entries = data.results;
      }
    )
  }

  /**
   * search
   *
   * @method search
   * @desc Search through entries
   */
  $scope.search = function () {
    API.Entries.get({ search: $scope.filters.title },
      function (data) {
        $scope.entries = data.results;
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
      if ($scope.entries[i].selected) {
        $scope.delete($scope.entries[i])
      }
    }
  }

  $scope.statuses = [
    { name: "Draft", id: 0, icon: "fa fa-pencil" },
    { name: "Hidden", id: 1, icon: "fa fa-user-secret" },
    { name: "Published", id: 2, icon: "fa fa-star" }
  ];

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
   * delete
   *
   * @method delete
   * @desc Delete entries via API call
   * 
   * @param entry {object}
   */
  $scope.delete = function (entry) {
    API.Entry.delete({ entry_id: entry.id },
      function (data, status, headers, config) {
        entry.isDeleted = true;
        $mdToast.showSimple("Entry deleted!");
      }
    );
  }

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
  "AuthService"
]
