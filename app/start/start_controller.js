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
   */
  function constructor() {

    // List of steps
    $scope.steps = ["domain", "template", "sign up"];

    // Current step
    $scope.step = 0;

    // Domain name and data
    $scope.domainForm = {
      loading: false,
      available: false,
      name: null,
      error: null
    };

    // Final signup form data
    $scope.signupForm = {
      loading: false,
      success: false,
      errors: null
    };

    // Toggle password visibility
    $scope.showPassword = false;

    // Password class to check strength
    $scope.password = new Password();

    // Get site templates
    API.SiteTemplatesPublic.get({},
      function (data) {
        $scope.templates = data.results;
        $scope.selectedTemplate = $scope.templates[0];
      },
      function () {
        // Failed to get templates, this step is skipped
        $scope.steps.slice($scope.steps.indexOf("template"), 1);
      }
    );
  }

  /**
   * @method next
   * @desc Take user to next step of getting started
   */
  $scope.next = function () {
    $scope.isNexting = true;
    $timeout(function () {
      $scope.step++;
      $scope.isNexting = false;
    }, 500);
  };

  /**
   * @method checkDomain
   * @desc Check availability of domain as user enters it
   *
   * @param {Object} form Domain form
   */
  $scope.checkDomain = function (form) {
    form.loading = true;

    API.DomainCheck.post({ domain: form.name },
      function () {
        form.checkedName = form.name;
        form.loading = false;
        form.available = true;
      },
      function (data) {
        form.checkedName = form.name;
        form.loading = false;
        form.available = false;
        form.error = data.data;
      }
    );
  };

  /**
   * @method selectTemplate
   * @desc Store template and go to next step
   *
   * @param {Object} template Selected template object
   */
  $scope.selectTemplate = function (template) {
    $scope.selectedTemplate = template;
    $scope.next();
  };

  /**
   * @method signup
   * @desc Submit signup form
   * 
   * @param {Object} form Signup form
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
