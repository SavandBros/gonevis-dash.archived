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
function EntryListController($scope, $rootScope, $state, $stateParams, EntriesService, AuthenticationService) {

    var siteId = $stateParams.siteId;
    $scope.entries = {};

    function constructor() {
        EntriesService.get(siteId).then(
            function(data, status, headers, config) {
                $scope.entries = data.data.results;
                console.log(data.data.results);
            },
            function(data, status, headers, config) {
                console.log(data.data);
            }
        )
    }
    // check user auth
    $scope.$on('gonevisDash.AuthenticationService:Authenticated', function() {
        constructor();
        $state.go('main');
    });

    $scope.deleteEntry = function(entryId, index) {
        EntriesService.del(entryId).then(
            function(data, status, headers, config) {
                $scope.entries[index].isDeleted = true;
                console.log(data.data);
            },
            function(data, status, headers, config) {
                console.log(data.data);
            }
        );
    }

    constructor()
}

app.controller('EntryListController', EntryListController)
EntryListController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'EntriesService', 'AuthenticationService']
