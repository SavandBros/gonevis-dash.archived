'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:CommentController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param CommentService
 * @param comment
 */
function CommentController($scope, CommentService, comment) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.commentService = CommentService;
    $scope.comment = comment;
  };

  constructor();
}

app.controller("CommentController", CommentController);
CommentController.$inject = ['$scope', 'CommentService', 'comment'];
