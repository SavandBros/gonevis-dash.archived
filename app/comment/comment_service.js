"use strict";

/**
 * @class CommentService
 *
 * @param $rootScope
 * @param API
 * @param ModalsService
 * @param Codekit
 *
 * @return [Factory]
 */
function CommentService($rootScope, API, ModalsService, Codekit) {

  /**
   * @method remove
   * @desc Delete comment, notify and broadcast for controllers to use.
   * 
   * @param comment {Object}
   * @param toast {Boolean}
   */
  function remove(comment, toast) {
    toast = toast || true;

    API.Comment.delete({ comment_id: comment.id },
      function (data) {
        if (toast) {
          // $mdToast.showSimple("Comment deleted.");
        }
        comment.isDeleted = true;
        $rootScope.$broadcast("gonevisDash.CommentService:remove", {
          data: data,
          comment: comment,
          success: true
        });
      },
      function (data) {
        if (toast) {
          // $mdToast.showSimple("Deleting comment failed.");
        }
        $rootScope.$broadcast("gonevisDash.CommentService:remove", {
          data: data,
          comment: comment,
          success: false
        });
      }
    );
  }

  /**
   * @method getStatus
   * @desc Get comment's current status.
   *
   * @param comment {Object}
   */
  function getStatus(comment) {
    for (var i in Codekit.commentStatuses) {
      var status = Codekit.commentStatuses[i];

      if (status.value === comment.status) {
        return status.label;
      }
    }
  }

  /**
   * @method setStatus
   * @desc Change comment status
   *
   * @param comment {Object}
   * @param key {String}
   * @param value {Number}
   */
  function setStatus(comment, key, value) {
    var payload = {};
    payload[key] = value;

    API.Comment.patch({ comment_id: comment.id }, payload,
      function () {
        comment[key] = value;
        comment.statusLabel = getStatus(comment);
      }
    );
  }

  /**
   * @method view
   * @desc View comment as modal (detailed mode).
   *
   * @param comment {Object}
   */
  function view(comment) {
    ModalsService.open("comment", "CommentModalController", { comment: comment });
  }

  return {
    remove: remove,
    view: view,
    getStatus: getStatus,
    setStatus: setStatus,
  };
}

app.factory("CommentService", CommentService);
CommentService.$inject = [
  "$rootScope",
  "API",
  "ModalsService",
  "Codekit"
];
