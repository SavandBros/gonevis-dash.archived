'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:MainController
 * @description
 * # MainController
 * Controller of the gonevisDash
 */
function MainController($scope) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];
}

angular.module('gonevisDash').controller("MainController", MainController);
MainController.$inject = ['$scope'];
