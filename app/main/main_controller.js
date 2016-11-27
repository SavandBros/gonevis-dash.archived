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
    list: [],

    /**
     * @name service
     * @desc Object service
     * @type {Service}
     */
    /**
     * @method initialize
     * @desc initialize comments
     */
    initialize: function () {
      API.Comments.get({site_id: $scope.site, object_type: 1},
        function (data) {
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
    list: [],
    /**
     * @name service
     * @desc Object service
     * @type {Service}
     */
    /**
     * @method initialize
     * @desc Initialize entries
     */
    initialize: function () {
      API.Entries.get({site: $scope.site},
        function (data) {
          $scope.Entry.list = data.results;
        }
      );
    }
  };

  $scope.form = {};
  /**
   * @name Metrics
   * @type {Object}
   */
    /**
     * @method initialize
     * @desc Initialize metrics
     */

  $scope.$on("gonevisDash.CommentService:delete", function (event, data) {
    for (var i = 0; i < $scope.Comment.list.length; i++) {
      if ($scope.Comment.list[i].id === data.id) {
        $scope.Comment.list[i].isDeleted = true;
      }

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
