"use strict";

/**
 * @class MainController
 *
 * @param $scope
 * @param $state
 * @param $mdToast
 * @param AuthService
 * @param API
 * @param Codekit
 * @param CommentService
 * @param EntryService
 */
function MainController($scope, $state, $mdToast, $stateParams,
  AuthService, API, Codekit, CommentService, EntryService) {

  /**
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.auth = AuthService;
    $scope.user = AuthService.getAuthenticatedUser();
    $scope.site = AuthService.getCurrentSite();

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

      API.Comments.get({ site_id: $scope.site },
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

      API.Entries.get({ site: $scope.site },
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

      API.SiteMetrics.get({ site_id: $scope.site },
        function (data) {
          $scope.Metrics.loading = false;
          $scope.Metrics.list = data.metrics;
        }
      );
    }
  };

  /**
   * @event gonevisDash.CommentService:remove
   * @desc Remove comment callback
   *
   * @param event {Event}
   * @param data {Object}
   */
  $scope.$on("gonevisDash.CommentService:remove", function (event, data) {
    if (data.success) {
      var index = Codekit.getIndex($scope.Comment.list, data);
      $scope.Comment.list[index].isDeleted = true;
    }
  });

  constructor();
}

app.controller("MainController", MainController);
MainController.$inject = [
  "$scope",
  "$state",
  "$mdToast",
  "$stateParams",
  "AuthService",
  "API",
  "Codekit",
  "CommentService",
  "EntryService"
];
