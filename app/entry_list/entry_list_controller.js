'use strict'

/**
 * @ngdoc function
 * @name gonevisDash.controller:EntryListController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param EntryListService
 * @param AuthenticationService
 */
function EntryListController($scope, $rootScope, $state, EntryListService, AuthenticationService) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    loadEntries();
  }

  /**
   * loadEntries
   *
   * @method loadEntries
   * @desc Load entries via API call
   */
  function loadEntries() {
    EntryListService.get(AuthenticationService.getCurrentSite()).then(
      function (data, status, headers, config) {
        $scope.entries = data.data.results;
      }
    )
  }

  /**
   * deleteEntry
   *
   * @method deleteEntry
   * @desc Delete entries via API call
   * 
   * @param entryId {string}
   */
  $scope.deleteEntry = function (entryId, index) {
    EntryListService.del(entryId).then(
      function (data, status, headers, config) {
        $scope.entries[index].isDeleted = true;
      }
    );
  }

  constructor()
}

app.controller('EntryListController', EntryListController)
EntryListController.$inject = ['$scope', '$rootScope', '$state', 'EntryListService', 'AuthenticationService']
