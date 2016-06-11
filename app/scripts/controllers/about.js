'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:AboutController
 * @description
 * @class AboutController
 * Controller of the gonevisDash
 */
function AboutController($scope) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];
}

angular.module('gonevisDash').controller('AboutController', AboutController);
AboutController.$inject = ['$scope'];
