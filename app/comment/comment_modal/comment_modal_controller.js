'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:CommentModalController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param CommentService
 * @param comment
 */
function CommentModalController($scope, CommentService, comment) {

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

app.controller("CommentModalController", CommentModalController);
CommentModalController.$inject = ['$scope', 'CommentService', 'comment'];
