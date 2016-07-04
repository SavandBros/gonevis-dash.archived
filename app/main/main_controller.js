'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:MainController
 * Controller of the gonevisDash
 */
function MainController($scope) {
alert('Hello');
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

app.controller("MainController", MainController);
MainController.$inject = ['$scope'];
