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
 */
function EntryListController($scope, $rootScope, $state, $mdToast, API, AuthService) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    loadEntries();
    $scope.nothing = {
      text: "It's lonely here... Try adding some entries!"
    };
  }

  /**
   * loadEntries
   *
   * @method loadEntries
   * @desc Load entries via API call
   */
  function loadEntries() {
    API.Entries.get({ site: AuthService.getCurrentSite() },
      function (data, status, headers, config) {
        $scope.entries = data.results;
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
    API.Entry.delete({ entry_id: entry.id },
      function (data, status, headers, config) {
        entry.isDeleted = true;
        $mdToast.showSimple("Entry deleted!");
      }
    );
  }

  constructor()
}

app.controller('EntryListController', EntryListController)
EntryListController.$inject = [
  '$scope', '$rootScope', '$state', '$mdToast', 'API', 'AuthService'
]
