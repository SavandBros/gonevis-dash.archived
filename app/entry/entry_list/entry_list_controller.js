'use strict'

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
 * @param Pagination
 */
function EntryListController($scope, $rootScope, $state, $mdToast, API, AuthService, Pagination) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.entryForm = {};
    $scope.nothing = { text: "It's lonely here... Try adding some entries!" };

    var payload = { site: AuthService.getCurrentSite() };
    API.Entries.get(payload,
      function (data) {
        $scope.entries = data.results;
        $scope.entryForm = Pagination.paginate($scope.entryForm, data, payload);
      }
    );
  }

  $scope.filters = { title: "" };

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
   * delete
   *
   * @method delete
   * @desc Delete entries via API call
   * 
   * @param entry {object}
   */
  $scope.delete = function (entry) {
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
      $scope.entryForm.page = data.page;
      $scope.entries = $scope.entries.concat(data.data.results);
    }
  });

  constructor()
}

app.controller('EntryListController', EntryListController)
EntryListController.$inject = [
  '$scope', '$rootScope', '$state', '$mdToast', 'API', 'AuthService', 'Pagination'
]
