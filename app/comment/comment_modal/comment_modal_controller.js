'use strict';

/**
 * @class CommentModalController
 *
 * @param $scope
 * @param CommentService
 * @param comment
 * @param Codekit
 */
function CommentModalController($scope, CommentService, comment, Codekit) {

  /**
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.commentService = CommentService;
    $scope.statuses = Codekit.commentStatuses;
    $scope.statuses = Codekit.commentStatuses;
    $scope.comment = comment;
  }

  /**
   * @method setStatus
   * @desc Set comment status
   *
   * @param comment {Object}
   * @param key {String}
   * @param value {Number}
   */
  $scope.setStatus = function (comment, key, value) {
    $scope.commentService.setStatus(comment, key, value);
  };

  constructor();
}

app.controller("CommentModalController", CommentModalController);
CommentModalController.$inject = ['$scope', 'CommentService', 'comment', 'Codekit'];
