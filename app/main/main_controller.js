'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:MainController
 * Controller of the gonevisDash
 */
function MainController($scope) {
    $scope.imAlive = true;
    /**
     * constructor
     *
     * @method constructor
     * @desc Init function for controller
     *
     * @memberOf MainController
     */
    function constructor() {}
}

app.controller("MainController", MainController);
MainController.$inject = ['$scope'];
