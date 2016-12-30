'use strict';

/**
 * @class CommentModalController
 *
 * @param $scope
 * @param $rootScope
 * @param CommentService
 * @param comment
 * @param Codekit
 * @param API
 */
function CommentModalController($scope, $rootScope, CommentService, comment, Codekit, API) {

  /**
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.commentService = CommentService;
    $scope.statuses = Codekit.commentStatuses;
    $scope.comment = comment;
    $scope.comment.statusLabel = CommentService.getStatus($scope.comment);
  }

  /**
   * @method reply
   * @desc Reply to comment.
   *
   * @param form {Object}
   */
  $scope.reply = function (form) {
    var payload = {
      object_type: 1,
      comment: form.comment,
      object_pk: comment.object_pk
    };

    API.Comments.save(payload,
      function (data) {
        $rootScope.$broadcast("gonevisDash.reply:submit", {
          data: data,
          success: true
        });
      }
    );
  };

  /**
   * @method setStatus
   * @desc Set comment status
   *
   * @param comment {Object}
   * @param key {String}
   * @param value {Number}
   */
  $scope.setStatus = function (comment, key, value) {
    CommentService.setStatus(comment, key, value);
  };

  constructor();
}

app.controller("CommentModalController", CommentModalController);
CommentModalController.$inject = [
  '$scope',
  '$rootScope',
  'CommentService',
  'comment',
  'Codekit',
  'API'
];
