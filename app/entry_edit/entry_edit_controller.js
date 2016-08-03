'use strict'

/**
 * @ngdoc function
 * @name gonevisDash.controller:EntryEditController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $mdToast
 * @param AuthenticationService
 */
function EntryEditController($scope, $rootScope, $state, $stateParams, $mdToast, $window, EntryEditService, AuthenticationService) {

    var s = $stateParams.s

    // Entry data
    $scope.form = {
        id: $stateParams.entryId
    };

    $scope.statuses = [{name: "Draft", id: 0}, {name: "Hidden", id: 1}, {name: "Published", id: 2}];

    function constructor() {
        EntryEditService.get($scope.form.id).then(
            function(data, status, headers, config) {
                $scope.form = data.data;
                console.log(data.data);
            },
            function(data, status, headers, config) {
                console.log(data.data);
            }
        )
    }

    $scope.updateEntry = function(form) {
        form.loading = true;
        EntryEditService.put(form).then(
            function(data, status, headers, config) {
                $mdToast.showSimple("Entry successfully updated !");
                console.log(data.data);
                form.loading = false;
            },
            function(data, status, headers, config) {
                console.log(data);
            }
        );
    }
    $scope.deleteEntry = function(entryId) {
            EntryEditService.del(entryId).then(
                function(data, status, headers, config) {
                    $mdToast.showSimple("Entry has been deleted !");
                    $window.history.back();
                    console.log(data.data);
                },
                function(data, status, headers, config) {
                    console.log(data.data);
                }
            );
        }
        // check user auth
    $scope.$on('gonevisDash.AuthenticationService:Authenticated', function() {
        constructor();
        $state.go('main');
    });

    constructor()
}

app.controller('EntryEditController', EntryEditController)
EntryEditController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$mdToast', '$window','EntryEditService', 'AuthenticationService']
