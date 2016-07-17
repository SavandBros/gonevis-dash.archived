'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:NewPostController
 * Controller of the gonevisDash
 * 
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $mdToast
 * @param AuthenticationService
 */
function NewPostController($scope, $rootScope, $state, $mdToast, AuthenticationService) {

    // New post form
    $scope.form = {};

    /**
     * constructor
     *
     * @method constructor
     * @desc Init function for controller
     *
     * @memberOf NewPostController
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
     */
    $scope.newPost = function (form) {
        form.loading = true;
    }

    constructor();
}

app.controller("NewPostController", NewPostController);
NewPostController.$inject = ['$scope', '$rootScope', '$state', '$mdToast', 'AuthenticationService'];
