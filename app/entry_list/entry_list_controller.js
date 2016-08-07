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
function EntryListController($scope, $rootScope, $state, $mdToast, EntryListService, AuthenticationService) {

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
   * delete
   *
   * @method delete
   * @desc Delete entries via API call
   * 
   * @param entry {object}
   */
  $scope.delete = function (entry) {
    entry.isDeleted = true;
    return;
    EntryListService.del(entry.id).then(
      function (data, status, headers, config) {
        $mdToast.showSimple("Entry deleted!");
        $mdToast.showSimple("Entry deleted!");
      }
    );
  }

  constructor()
}

app.controller('EntryListController', EntryListController)
EntryListController.$inject = [
  '$scope', '$rootScope', '$state', '$mdToast', 'EntryListService', 'AuthenticationService'
]
