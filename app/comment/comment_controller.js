"use strict";

/**
 * @ngdoc function
 * @name gonevisDash.controller:CommentController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param API
 * @param AuthService
 * @param Comment
 * @param Pagination
 * @param Search
 * @param Codekit
 */
function CommentController($scope, $rootScope, API,
  AuthService, Comment, Pagination, Search, Codekit) {

  /**
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.user = AuthService.getAuthenticatedUser();
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
   * @method loadMore
   * @desc Load more function for controller
   */
  $scope.loadMore = Pagination.loadMore;

  $rootScope.$on("gonevisDash.Comment:remove", function () {
    Codekit.timeoutSlice($scope.comments);
  });

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

  $scope.$on("gonevisDash.Pagination:loadedMore", function (event, data) {
    if (data.success) {
      $scope.pageForm.page = data.page;
      angular.forEach(data.data.results, function (data) {
        $scope.comments.push(new Comment(data));
      });
    }
  });

  /**
   * @event gonevisDash.Comment:reply
   * @desc Reply comment
   *
   * @param event {Event}
   * @param comment {Object}
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
