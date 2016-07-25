'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:EntryNewController
 * Controller of the gonevisDash
 * 
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $mdToast
 * @param AuthenticationService
 */
function EntryNewController($scope, $rootScope, $state, $mdToast, AuthenticationService) {

    // New post form
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
            $state.go('signin');
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
    }

    constructor();
}

app.controller("EntryNewController", EntryNewController);
EntryNewController.$inject = ['$scope', '$rootScope', '$state', '$mdToast', 'AuthenticationService'];
