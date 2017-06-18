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

  /**
   * @method signup
   * @desc Submit signup form
   * 
   * @param form {Object}
   */
  $scope.signup = function (form) {
    form.loading = true;

    var payload = {
      password: $scope.password.password,
      email: form.data.email,
      template_id: $scope.selectedTemplate.id,
      site_name: $scope.domainForm.name,
      site_url: $scope.domainForm.name
    };

    API.Signup.post(payload,
      function () {
        form.errors = [];
        $scope.success = true;
      },
      function (data) {
        form.loading = false;
        form.errors = data.data;
      }
    );
  };

  constructor();
}

app.controller("StartController", StartController);
StartController.$inject = [
  "$scope",
  "$timeout",
  "Password",
  "API"
];
