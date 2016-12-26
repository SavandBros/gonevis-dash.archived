'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:CommentModalController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param CommentService
 * @param comment
 * @param Codekit
 */
function CommentModalController($scope, CommentService, comment, Codekit) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.commentService = CommentService;
    $scope.statuses = Codekit.commentStatuses;
    $scope.statuses = Codekit.commentStatuses;
    $scope.comment = comment;
  };

  /**
   * @method setStatus
   * @desc set status comments
   *
   * @param comment {Object}
   * @param key {String}
   * @param value {Number}
   */
  $scope.setStatus = function(comment, key, value) {
    $scope.commentService.setStatus(comment, key, value);
  }

  constructor();
}

app.controller("CommentModalController", CommentModalController);
CommentModalController.$inject = ['$scope', 'CommentService', 'comment', 'Codekit'];