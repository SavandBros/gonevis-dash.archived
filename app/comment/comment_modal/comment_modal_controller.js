"use strict";

/**
 * @class CommentModalController
 *
 * @param $scope
 * @param comment
 * @param Codekit
 */
function CommentModalController($scope, comment, Codekit) {

  /**
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.statuses = Codekit.commentStatuses;
    $scope.comment = comment;
  }

  constructor();
}

app.controller("CommentModalController", CommentModalController);
CommentModalController.$inject = [
  "$scope",
  "comment",
  "Codekit"
];
