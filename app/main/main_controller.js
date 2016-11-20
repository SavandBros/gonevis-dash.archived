"use strict";

/**
 * Main Controller
 *
 * @class MainController
 * @namespace gonevisDash.MainController
 *
 * @param $scope
 * @param $state
 * @param $mdToast
 * @param AuthService
 * @param API
 * @param CommentService
 */
function MainController($scope, $state, $mdToast, $stateParams, AuthService, API, CommentService) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.auth = AuthService;
    $scope.user = AuthService.getAuthenticatedUser();
    $scope.site = AuthService.getCurrentSite();

    $scope.state = $state;
    $scope.param = $stateParams;

    $scope.commentService = CommentService;

    $scope.Comment.initialize();
    $scope.Entry.initialize();
  }

  $scope.Comment = {
    list: [],

    initialize: function () {
      API.Comments.get({site_id: $scope.site, object_type: 1},
        function (data) {
          $scope.Comment.list = data.results;
        }
      );
    }
  };

  $scope.Entry = {
    list: [],

    initialize: function () {
      API.Entries.get({site: $scope.site},
        function (data) {
          $scope.Entry.list = data.results;
        }
      );
    }
  };

  $scope.form = {};

  $scope.$on("gonevisDash.CommentService:delete", function (event, data) {
    for (var i = 0; i < $scope.Comment.list.length; i++) {
      if ($scope.Comment.list[i].id === data.id) {
        $scope.Comment.list[i].isDeleted = true;
      }
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
  "CommentService"
];
