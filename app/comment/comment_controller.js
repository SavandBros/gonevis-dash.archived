"use strict";

function CommentController($scope, $rootScope, API,
  AuthService, Comment, Pagination, Search, Codekit) {

  function constructor() {
    $scope.user = AuthService.getAuthenticatedUser(true);
    $scope.statuses = Codekit.commentStatuses;
    $scope.search = Search;
    $scope.comments = [];
    $scope.pageForm = {};

    var payload = { site: AuthService.getCurrentSite() };
    API.Comments.get(payload,
      function (data) {
        $scope.initialled = true;
        angular.forEach(data.results, function (data) {
          $scope.comments.push(new Comment(data));
        });
        $scope.pageForm = Pagination.paginate($scope.pageForm, data, payload);
        $scope.searchForm = Search.searchify($scope.searchForm, $scope.pageForm, API.Comments.get, data, payload);
      }
    );
  }

  /**
   * @desc Load more function for controller
   */
  $scope.loadMore = Pagination.loadMore;

  /**
   * @desc Remove comment
   */
  $rootScope.$on("gonevisDash.Comment:remove", function () {
    Codekit.timeoutSlice($scope.comments);
  });

  /**
   * @desc Search callback
   *
   * @param {Event} event
   * @param {object} data
   */
  $scope.$on("gonevisDash.Search:submit", function (event, data) {
    if (data.success) {
      $scope.pageForm = data.pageForm;
      $scope.comments = [];
      angular.forEach(data.data.results, function (data) {
        $scope.comments.push(new Comment(data));
      });
      $scope.searchForm = data.form;
    }
  });

  /**
   * @desc Load more callback
   *
   * @param {Event} event
   * @param {object} data
   */
  $scope.$on("gonevisDash.Pagination:loadedMore", function (event, data) {
    if (data.success) {
      $scope.pageForm.page = data.page;
      angular.forEach(data.data.results, function (data) {
        $scope.comments.push(new Comment(data));
      });
    }
  });

  /**
   * @desc Reply comment
   *
   * @param {Event} event
   * @param {object} comment
   */
  $scope.$on("gonevisDash.Comment:reply", function (event, comment) {
    $scope.comments.unshift(new Comment(comment));
  });

  constructor();
}

app.controller("CommentController", CommentController);
CommentController.$inject = [
  "$scope",
  "$rootScope",
  "API",
  "AuthService",
  "Comment",
  "Pagination",
  "Search",
  "Codekit"
];
