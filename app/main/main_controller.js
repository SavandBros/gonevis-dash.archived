"use strict";

/**
 * @class MainController
 *
 * @param $scope
 * @param $state
 * @param AuthService
 * @param API
 * @param Codekit
 * @param CommentService
 * @param EntryService
 */
function MainController($scope, $state, $stateParams,
  AuthService, API, Codekit, CommentService, EntryService) {

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
  }

  /**
   * @name Comment
   * @type {Object}
   */
  $scope.Comment = {
    /**
     * @name service
     * @desc Object service
     * @type {Service}
     */
    service: CommentService,
    /**
     * @method initialize
     * @desc initialize comments
     */
    initialize: function () {
      $scope.Comment.loading = true;

      API.Comments.get({ site: site },
        function (data) {
          $scope.Comment.loading = true;
          $scope.Comment.list = data.results;
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
     * @name service
     * @desc Object service
     * @type {Service}
     */
    service: EntryService,
    /**
     * @method initialize
     * @desc Initialize entries
     */
    initialize: function () {
      $scope.Entry.loading = true;

      API.Entries.get({ site: site },
        function (data) {
          $scope.Entry.loading = true;
          $scope.Entry.list = data.results;
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
  "CommentService",
  "EntryService"
];
