"use strict";

/**
 * @class StartController
 */
function StartController($scope, API) {

  /**
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {

    API.WebsiteTemplates.get({},
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
  "API"
];
