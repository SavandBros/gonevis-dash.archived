'use strict';
/**
 * @ngdoc function
 * @name gonevisDash.controller:HeaderController
 * Controller of the gonevisDash
 * 
 * @param $scope
 * @param $state
 * @param $stateParams
 * @param AuthenticationService
 */
function HeaderController($scope, $state, $stateParams, AuthenticationService) {
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

        $scope.state = $state;
        $scope.param = $stateParams
    };

    $scope.$on('gonevisDash.AuthenticationService:Authenticated', function () {
        constructor();
        $state.go('dash.main', {s: 0});
    });

    $scope.$on('gonevisDash.AuthenticationService:SignedOut', function () {
        constructor();
        $state.go('signin');
    });

    constructor();
};

app.controller("HeaderController", HeaderController);
HeaderController.$inject = ['$scope', '$state', '$stateParams', 'AuthenticationService'];
