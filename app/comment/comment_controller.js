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
function CommentController($scope, $rootScope, $state, $mdToast, API, AuthService, CommentService, Pagination) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.commentForm = {};
    $scope.user = AuthService.getAuthenticatedUser();
    $scope.commentService = CommentService;
    $scope.nothing = { text: "You have no comments" };

    var payload = { site: AuthService.getCurrentSite() };
    API.Comments.get(payload,
      function (data) {
        $scope.comments = data.results;
        $scope.commentForm = Pagination.paginate($scope.commentForm, data, payload);
      }
    );
  }

  $scope.filters = { comment: "" };

  /**
   * search
   *
   * @method search
   * @desc Search through comments
   */
  $scope.search = function () {
    var payload = { search: $scope.filters.comment };

    API.Comments.get(payload,
      function (data) {
        $scope.comments = data.results;
        $scope.commentForm = Pagination.paginate($scope.commentForm, data, payload);
        if (!data.count) {
          $scope.noResults = true;
        } else {
          $scope.noResults = false;
        }
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
    for (var i = 0; i < $scope.comments.length; i++) {
      if ($scope.comments[i].id === data.id) {
        $scope.comments[i].isDeleted = true;
      }
    }
  });

  $scope.$on("gonevisDash.Pagination:loadedMore", function (event, data) {
    if (data.success) {
      $scope.commentForm.page = data.page;
      $scope.comments = $scope.comments.concat(data.data.results);
    }
  });

  constructor();
}

app.controller("CommentController", CommentController);
CommentController.$inject = [
  "$scope", "$rootScope", "$state", "$mdToast", "API", "AuthService", "CommentService", "Pagination"
];
