"use strict";

/**
 * Comment Service
 *
 * @class CommentService
 * @namespace gonevisDash.CommentService
 *
 * @param $rootScope
 * @param $mdToast
 * @param API
 * @param ModalsService
 *
 * @returns [Factory]
 */
function CommentService($rootScope, $mdToast, API, ModalsService) {

  var objectType = 1;

  /**
   * remove
   * 
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
          $mdToast.showSimple("Comment deleted.");
        }
        comment.isDeleted = true;
        $rootScope.$broadcast("gonevisDash.CommentService:delete", {
          data: data,
          comment: comment,
          success: true
        });
      },
      function (data) {
        if (toast) {
          $mdToast.showSimple("Deleting comment failed.");
        }
        $rootScope.$broadcast("gonevisDash.CommentService:delete", {
          data: data,
          comment: comment,
          success: false
        });
      }
    );
  }

  /**
   * view
   * 
   * @method view
   * @desc View comment as modal (detailed mode).
   * 
   * @param comment {Object}
   */
  function view(comment) {
    ModalsService.open("comment", "CommentModalController", { comment: comment });
  }

  return {
    objectType: objectType,
    remove: remove,
    view: view,
  };
}

app.factory("CommentService", CommentService);
CommentService.$inject = [
  "$rootScope",
  "$mdToast",
  "API",
  "ModalsService"
];
