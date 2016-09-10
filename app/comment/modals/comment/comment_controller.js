'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:CommentController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $mdToast
 * @param API
 */
function CommentController($scope, $mdToast, comment, API) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.comment = comment;
  };

  /**
   * delete
   *
   * @method delete
   * @desc function for deleting comments
   * 
   * @param comment {object}
   */
  $scope.delete = function (comment) {
    API.Comment.delete({ comment_id: comment.id },
      function (data, status, headers, config) {
        $mdToast.showSimple("Comment deleted!");
      }
    );
  }

  constructor();
}

app.controller("CommentController", CommentController);
CommentController.$inject = ['$scope', '$mdToast', 'comment', 'API'];
