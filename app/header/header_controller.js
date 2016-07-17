'use strict';
/**
 * @ngdoc function
 * @name gonevisDash.controller:HeaderController
 * Controller of the gonevisDash
 * 
 * @param $scope
 * @param $state
 * @param AuthenticationService
 */
function HeaderController($scope, $state, AuthenticationService) {
    /**
     * constructor
     *
     * @method constructor
     * @desc Init function for controller
     *
     * @memberOf HeaderController
     */
    function constructor() {

        // Get user
        $scope.auth = AuthenticationService;
        $scope.user = AuthenticationService.getAuthenticatedUser();
    };

    $scope.$on('gonevisDash.AuthenticationService:Authenticated', function () {
        constructor();
        $state.go('main');
    });

    $scope.$on('gonevisDash.AuthenticationService:SignedOut', function () {
        constructor();
        $state.go('signin');
    });

    constructor();
};

app.controller("HeaderController", HeaderController);
HeaderController.$inject = ['$scope', '$state', 'AuthenticationService'];
