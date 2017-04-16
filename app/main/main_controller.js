"use strict";

/**
 * @class MainController
 *
 * @param $scope
 * @param $state
 * @param $stateParams
 * @param AuthService
 * @param API
 * @param Codekit
 * @param Comment
 * @param Entry
 */
function MainController($scope, $state, $stateParams, AuthService, API, Codekit, Comment, Entry) {

  var site = AuthService.getCurrentSite();

  /**
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.auth = AuthService;
    $scope.user = AuthService.getAuthenticatedUser();

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
   * @name Comment
   * @type {Object}
   */
  $scope.Comment = {
    /**
     * @name list
     * @type Array
     */
    list: [],
    /**
     * @method initialize
     * @desc initialize comments
     */
    initialize: function () {
      $scope.Comment.loading = true;

      API.Comments.get({ site: site },
        function (data) {
          $scope.Comment.loading = true;
          angular.forEach(data.results, function (data) {
            $scope.Comment.list.push(new Comment(data));
          });
        }
      );
    }
  };

  /**
   * @name Entry
   * @type {Object}
   */
  $scope.Entry = {
    /**
     * @name list
     * @type Array
     */
    list: [],
    /**
     * @method initialize
     * @desc Initialize entries
     */
    initialize: function () {
      $scope.Entry.loading = true;

      API.Entries.get({ site: site },
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
   * @name Metrics
   * @type {Object}
   */
  $scope.Metrics = {
    /**
     * @method initialize
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
   * @event gonevisDash.Comment:reply
   * @desc Reply comment
   *
   * @param event {Event}
   * @param comment {Object}
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
  "Codekit",
  "Comment",
  "Entry"
];
