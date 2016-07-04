'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:MainController
 * Controller of the gonevisDash
 */
function MainController($scope, AuthenticationService) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   *
   * @memberOf EmptyController
   */
  function constructor() {
    alert('Hello');
  }
}

angular.module('gonevisDash').controller("MainController", MainController);
MainController.$inject = ['$scope', 'AuthenticationService'];
