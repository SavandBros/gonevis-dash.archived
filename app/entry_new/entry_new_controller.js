'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:EntryNewController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $state
 * @param $mdToast
 * @param AuthenticationService
 * @param EntryNewService
 */
function EntryNewController($scope, $state, $mdToast, AuthenticationService, EntryNewService) {

    $scope.form = {};

    /**
     * constructor
     *
     * @method constructor
     * @desc Init function for controller
     *
     * @memberOf EntryNewController
     */
    function constructor() {
        // Check auth
        if (!AuthenticationService.isAuthenticated()) {
            return $state.go('signin');
        }
    };

    /**
     * newPost
     *
     * @method newPost
     * @desc Submit newPost form
     *
     * @param form {object} Form data to submit
     */
    $scope.newPost = function (form) {
        form.loading = true;
        form.site = AuthenticationService.getCurrentSite();

        EntryNewService.create(form).then(
            function (data, status, headers, config) {
                $mdToast.showSimple("Entry added.");
            },
            function (data, status, headers, config) {
                $mdToast.showSimple("Failed to add entry.");
            }
        );
    }

    constructor();
}

app.controller("EntryNewController", EntryNewController);
EntryNewController.$inject = ['$scope', '$state', '$mdToast', 'AuthenticationService', 'EntryNewService'];
