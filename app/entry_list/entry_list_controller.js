'use strict'

/**
 * @ngdoc function
 * @name gonevisDash.controller:EntryListController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $mdToast
 * @param AuthenticationService
 */
function EntryListController($scope, $rootScope, $state, EntryListService, AuthenticationService) {

    var siteId = AuthenticationService.getCurrentSite();

    function constructor() {
        loadEntries();
    }

    function loadEntries() {
        EntryListService.get(siteId).then(
            function (data, status, headers, config) {
                $scope.entries = data.data.results;
            }
        )
    }

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
