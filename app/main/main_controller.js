"use strict";

function MainController($scope, $state, $stateParams, AuthService, API, Comment, Entry) {

  var site = AuthService.getCurrentSite();

  function constructor() {
    $scope.state = $state;
    $scope.param = $stateParams;

    $scope.Comment.initialize();
    $scope.Entry.initialize();
    $scope.Metrics.initialize();

    // Get site template
    API.SiteTemplateConfig.get({ siteId: site }, function (data) {
      $scope.siteTemplate = data.template_config;
    });
  }

  /**
   * @type {object}
   */
  $scope.Comment = {
    /**
     * @type {array}
     */
    list: [],
    /**
     * @desc initialize comments
     */
    initialize: function () {
      $scope.Comment.loading = true;

      API.Comments.get({ site: site, limit: 10 },
        function (data) {
          $scope.Comment.loading = false;
          angular.forEach(data.results, function (data) {
            $scope.Comment.list.push(new Comment(data));
          });
        }
      );
    }
  };

  /**
   * @type {object}
   */
  $scope.Entry = {
    /**
     * @type {array}
     */
    list: [],
    /**
     * @desc Initialize entries
     */
    initialize: function () {
      $scope.Entry.loading = true;

      API.Entries.get({ site: site, limit: 10 },
        function (data) {
          $scope.Entry.loading = true;
          angular.forEach(data.results, function (data) {
            $scope.Entry.list.push(new Entry(data));
          });
        }
      );
    }
  };

  /**
   * @type {object}
   */
  $scope.Metrics = {
    /**
     * @desc Initialize metrics
     */
    initialize: function () {
      $scope.Metrics.loading = true;

      API.SiteMetrics.get({ siteId: site },
        function (data) {
          $scope.Metrics.loading = false;
          $scope.Metrics.list = data.metrics;
        }
      );
    }
  };

  /**
   * @desc Reply comment
   *
   * @param {Event} event
   * @param {object} comment
   */
  $scope.$on("gonevisDash.Comment:reply", function (event, comment) {
    $scope.Comment.list.unshift(new Comment(comment));
  });

  constructor();
}

app.controller("MainController", MainController);
MainController.$inject = [
  "$scope",
  "$state",
  "$stateParams",
  "AuthService",
  "API",
  "Comment",
  "Entry"
];
