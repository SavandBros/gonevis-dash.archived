'use strict';

/**
 * @class CommentModalController
 *
 * @param $scope
 * @param $rootScope
 * @param comment
 * @param Codekit
 * @param ModalsService
 */
function CommentModalController($scope, $rootScope, comment, Codekit, ModalsService) {

  /**
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.statuses = Codekit.commentStatuses;
    $scope.comment = comment;
  }

  $scope.close = function () {
    ModalsService.close('comment');
  };

  constructor();
}

app.controller("CommentModalController", CommentModalController);
CommentModalController.$inject = [
  '$scope',
  '$rootScope',
  'comment',
  'Codekit',
  'ModalsService'
];
