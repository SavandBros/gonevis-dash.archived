"use strict";

/**
 * Main Controller
 * 
 * @class MainController
 * @namespace gonevisDash.MainController
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $mdToast
 * @param AuthService
 * @param API
 * @param CommentService
 * @param Pagination
 */
function MainController($scope, $rootScope, $state, $mdToast, $stateParams, AuthService, API, CommentService, Pagination) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.commentForm = {};
    $scope.auth = AuthService;
    $scope.user = AuthService.getAuthenticatedUser();
    $scope.site = AuthService.getCurrentSite();
    $scope.commentService = CommentService;

    // Check auth
    if (!AuthService.isAuthenticated()) {
      $mdToast.showSimple("Please login to continue.");
      $state.go("signin");
    }

    // State
    $scope.state = $state;
    $scope.param = $stateParams;

    $scope.Comment.initialize();
  }

  $scope.Comment = {
    list: [],

    initialize: function () {
      var payload = { site_id: $scope.site, object_type: 1 };
      API.Comments.get(payload,
        function (data) {
          $scope.Comment.list = data.results;
          $scope.commentForm = Pagination.paginate($scope.commentForm, data, payload);
        }
      );
    }
  };

  $scope.form = {};

  /**
   * newPost
   *
   * @method newPost
   * @desc Submit newPost form
   *
   * @param form {object} Form data to submit
   */
  $scope.newPost = function (form) {
    form.loading = true;
    form.site = AuthService.getCurrentSite();

    API.EntryAdd.save(form,
      function (data) {
        $mdToast.showSimple("Entry " + data.title + " drafted.");
        form.title = "";
        form.content = "";
      },
      function (data) {
        $mdToast.showSimple("Failed to add entry.");
        form.loading = false;
        form.errors = data;
      }
    );
  };

  /**
   * loadMore
   *
   * @method loadMore
   * @desc Load more function for controller
   */
  $scope.loadMore = Pagination.loadMore;

  $rootScope.$on("gonevisDash.CommentService:delete", function (event, data) {
    for (var i = 0; i < $scope.Comment.list.length; i++) {
      if ($scope.Comment.list[i].id === data.id) {
        $scope.Comment.list[i].isDeleted = true;
      }
    }
  });

  $scope.$on("gonevisDash.Pagination:loadedMore", function (event, data) {
    if (data.success) {
      $scope.commentForm.page = data.page;
      $scope.Comment.list = $scope.Comment.list.concat(data.data.results);
    }
  });

  constructor();
}

app.controller("MainController", MainController);
MainController.$inject = [
  "$scope",
  "$rootScope",
  "$state",
  "$mdToast",
  "$stateParams",
  "AuthService",
  "API",
  "CommentService",
  "Pagination"
];
