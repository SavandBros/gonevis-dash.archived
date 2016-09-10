'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:CommentListController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $mdToast
 * @param API
 * @param AuthService
 */
function CommentListController($scope, $rootScope, $state, $mdToast, API, AuthService) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.user = AuthService.getAuthenticatedUser();
    $scope.site = AuthService.getCurrentSite();

    API.Comments.get({ site_id: $scope.site, object_type: 1 },
      function (data, status, headers, config) {
        $scope.comments = data.results;
      },
      function (data, status, headers, config) {
        console.log(data);
      }
    );
  };

  /**
   * delete
   *
   * @method delete
   * @desc function for deleting comments
   * 
   * @param delete {object}
   */
  $scope.delete = function (comment) {
    API.Comment.delete({ comment_id: comment.id },
      function (data, status, headers, config) {
        comment.isDeleted = true;
        $mdToast.showSimple("Comment deleted!");
      }
    );
  }

  constructor();
}

app.controller("CommentListController", CommentListController);
CommentListController.$inject = ['$scope', '$rootScope', '$state', '$mdToast', 'API', 'AuthService'];
