"use strict";

/**
 * @class StartController
 *
 * @param $scope
 * @param $timeout
 * @param Password
 * @param API
 */
function StartController($scope, $timeout, Password, API) {

  /**
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {

    // Toggle password visibility
    $scope.showPassword = false;

    // Password class to check strength
    $scope.password = new Password();

    API.SiteTemplatesPublic.get({},
      function (data) {
        $scope.templates = data.results;
      }
    );
  }


  constructor();
}

app.controller("StartController", StartController);
StartController.$inject = [
  "$scope",
  "$timeout",
  "Password",
  "API"
];
