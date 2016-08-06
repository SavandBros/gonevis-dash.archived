'use strict'

/**
 * @ngdoc function
 * @name gonevisDash.controller:EntryEditController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $stateParams
 * @param $mdToast
 * @param EntryEditService
 * @param AuthenticationService
 */
function EntryEditController($scope, $rootScope, $state, $stateParams, $mdToast, EntryEditService, AuthenticationService) {

    var s = $stateParams.s
    var site = AuthenticationService.getCurrentSite();

    // Entry data
    $scope.form = {
        id: $stateParams.entryId
    };

    // Status data
    $scope.statuses = [{name: "Draft", id: 0}, {name: "Hidden", id: 1}, {name: "Published", id: 2}];
    /**
     * constructor
     *
     * @method constructor
     * @desc Init function for controller
     */
    function constructor() {
        // Get Entry data
        EntryEditService.get($scope.form.id).then(
            function(data, status, headers, config) {
                $scope.form = data.data;
                console.log(data.data);
            },
            function(data, status, headers, config) {
                console.log(data.data);
            }
        );
    }


    /**
     * updateEntry
     *
     * @method updateEntry
     * @desc Submit updateEntry form
     * 
     * @param form {object}
     */
    $scope.updateEntry = function(form) {
        form.loading = true;
        // Api call for updating entry
        EntryEditService.put(form).then(
            function(data, status, headers, config) {
                // Succsess message
                $mdToast.showSimple("Entry successfully updated !");
                form.loading = false;
            },
            function(data, status, headers, config) {
                // Failure message
                $mdToast.showSimple("Sorry, couldn't update entry");
                form.loading = false;
            }
        );
    }

    /**
     * deleteEntry
     *
     * @method deleteEntry
     * @desc delete entry via api call
     * 
     * @param entryId {string}
     */
    $scope.deleteEntry = function(entryId) {
            EntryEditService.del(entryId).then(
                function(data, status, headers, config) {
                    $mdToast.showSimple("Entry has been deleted !");
                    $state.go('dash.entry-list');
                },
                function(data, status, headers, config) {
                    console.log(data.data);
                }
            );
        };

    /* Need to be fixed
    $scope.search = function(query) {
        EntryEditService.search(site).then(
            function(data, status, headers, config) {
                $scope.result = data.data.results;
                console.log($scope.result);
            },
            function(data, status, headers, config) {
                console.log(data.data);
            }
        );
    }
    */
    // check user auth
    $scope.$on('gonevisDash.AuthenticationService:Authenticated', function() {
        constructor();
        $state.go('main');
    });

    constructor()
}

app.controller('EntryEditController', EntryEditController)
EntryEditController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$mdToast', 'EntryEditService', 'AuthenticationService']
