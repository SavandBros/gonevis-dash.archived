"use strict";

/**
 * @class StartController
 */
function StartController($scope) {

  /**
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {

    $scope.templates = [
      1, 2, 3, 4 ,5, 6, 7, 8, 9
    ];
  }


  constructor();
}

app.controller("StartController", StartController);
StartController.$inject = [
  "$scope"
];
