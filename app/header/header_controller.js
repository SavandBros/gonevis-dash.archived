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
    // Get user
    $scope.auth = AuthenticationService;
    $scope.user = AuthenticationService.getAuthenticatedUser();

    $scope.state = $state;

    /**
     * constructor
     *
     * @method constructor
     * @desc Init function for controller
     *
     * @memberOf HeaderController
     */
    function constructor() {

    };

    $scope.$on('gonevisDash.AuthenticationService:Authenticated', function () {
        $state.reload();
    });

    $scope.$on('gonevisDash.AuthenticationService:SignedOut', function () {
        $state.reload(true);
    });
};

app.controller("HeaderController", HeaderController);
HeaderController.$inject = ['$scope', '$state', 'AuthenticationService'];
