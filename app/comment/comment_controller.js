"use strict";

/**
 * @ngdoc function
 * @name gonevisDash.controller:CommentController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $mdToast
 * @param API
 * @param AuthService
 * @param CommentService
 * @param Pagination
 */
function CommentController($scope, $rootScope, $state, $mdToast, API, AuthService, CommentService, Pagination, Search) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.user = AuthService.getAuthenticatedUser();
    $scope.commentService = CommentService;
    $scope.search = Search;
    $scope.nothing = { text: "You have no comments" };
    $scope.pageForm = {};

    var payload = { site: AuthService.getCurrentSite() };
    API.Comments.get(payload,
      function (data) {
        $scope.initialled = true;
        $scope.comments = data.results;
        $scope.pageForm = Pagination.paginate($scope.pageForm, data, payload);
        $scope.searchForm = Search.searchify($scope.searchForm, $scope.pageForm, API.Comments.get, data, payload);
      }
    );
  }

  /**
   * loadMore
   *
   * @method loadMore
   * @desc Load more function for controller
   */
  $scope.loadMore = Pagination.loadMore;

  $rootScope.$on("gonevisDash.CommentService:remove", function (event, data) {
    for (var i = 0; i < $scope.comments.length; i++) {
      if ($scope.comments[i].id === data.id) {
        $scope.comments[i].isDeleted = true;
      }
    }
  });

  $scope.$on("gonevisDash.Search:submit", function (event, data) {
    if (data.success) {
      $scope.pageForm = data.pageForm;
      $scope.comments = data.data.results;
      $scope.searchForm = data.form;
    }
  });

  $scope.$on("gonevisDash.Pagination:loadedMore", function (event, data) {
    if (data.success) {
      $scope.pageForm.page = data.page;
      $scope.comments = $scope.comments.concat(data.data.results);
    }
  });

  constructor();
}

app.controller("CommentController", CommentController);
CommentController.$inject = [
  "$scope",
  "$rootScope",
  "$state",
  "$mdToast",
  "API",
  "AuthService",
  "CommentService",
  "Pagination",
  "Search"
];
