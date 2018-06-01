"use strict";

var app = require("../app_module");

function StartController($scope, $timeout, Password, AuthService, API, toaster) {

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
      function(data) {
        $scope.templates = data.results;
        angular.forEach($scope.templates, function(template) {
          if (template.name === "zero") {
            $scope.selectedTemplate = template;
          }
        });
      },
      function() {
        // Failed to get templates, this step is skipped
        $scope.steps.slice($scope.steps.indexOf("template"), 1);
      }
    );
  }

  /**
   * @desc Take user to next step of getting started
   */
  $scope.next = function() {
    $scope.isNexting = true;
    $timeout(function() {
      $scope.step++;
      $scope.isNexting = false;
    }, 500);
  };

  /**
   * @desc Take user to the prev step of getting started
   */
  $scope.prev = function() {
    $scope.isPreving = true;
    $timeout(function() {
      $scope.step--;
      $scope.isPreving = false;
    }, 500);
  };

  /**
   * @desc Check availability of domain as user enters it
   *
   * @param {object} form Domain form
   */
  $scope.checkDomain = function(form) {
    form.loading = true;

    API.DomainCheck.post({
        domain: form.name
      },
      function() {
        form.checkedName = form.name;
        form.loading = false;
        form.available = true;
      },
      function(data) {
        form.checkedName = form.name;
        form.loading = false;
        form.available = false;
        form.error = data.data;
      }
    );
  };

  /**
   * @desc Store template and go to next step
   *
   * @param {object} template Selected template object
   */
  $scope.selectTemplate = function(template) {
    $scope.selectedTemplate = template;
    $scope.next();
  };

  /**
   * @desc Submit signup form
   * 
   * @param {object} form Signup form
   */
  $scope.signup = function(form) {
    form.loading = true;

    var payload = {
      password: $scope.password.password,
      email: form.data.email,
      template_id: $scope.selectedTemplate.id,
      site_name: $scope.domainForm.name,
      site_url: $scope.domainForm.name
    };

    API.Signup.post(payload,
      function() {
        form.errors = [];
        // Sign user in
        AuthService.signIn(
          form.data.email,
          $scope.password.password,
          function() {
            toaster.success(
              "Awesome!",
              "Thanks for registering at GoNevis, a link has been sent to your email for account verification."
            );
          }
        );
      },
      function(data) {
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
  "AuthService",
  "API",
  "toaster"
];

module.exports = StartController;
