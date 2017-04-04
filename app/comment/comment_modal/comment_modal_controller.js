'use strict';

/**
 * @class CommentModalController
 *
 * @param $scope
 * @param $rootScope
 * @param comment
 * @param Codekit
 */
function CommentModalController($scope, $rootScope, comment, Codekit) {

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
  '$scope',
  '$rootScope',
  'comment',
  'Codekit'
];
