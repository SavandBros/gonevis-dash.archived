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
 * @param AuthenticationService
 */
function CommentListController($scope, $rootScope, $state, $mdToast, API, AuthenticationService) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.user = AuthenticationService.getAuthenticatedUser();
    $scope.site = AuthenticationService.getCurrentSite();

    API.Comments.get({ object_type: 1 },
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
CommentListController.$inject = ['$scope', '$rootScope', '$state', '$mdToast', 'API', 'AuthenticationService'];
