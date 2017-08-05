"use strict";

function Comment($rootScope, toaster, API, ModalsService, Codekit, Account) {
  return function (data) {

    /**
     * @desc Super variable for getting this in functions
     *
     * @type {Dolphin}
     */
    var self = this;

    /**
     * @readonly
     * @desc Backend data
     *
     * @type {object}
     */
    this.get = data;

    /**
     * @type {Account}
     */
    this.user = new Account(self.get.user);

    /**
     * @name isDeleted
     * @type {Boolean}
     */
    this.isDeleted = false;

    /**
     * @type {boolean}
     */
    this.isReplying = false;

    /**
     * @type {number}
     */
    this.objectType = 1;

    /**
     * @desc Delete comment, notify and broadcast for controllers to use.
     */
    this.remove = function () {
      API.Comment.delete({ comment_id: this.get.id },
        function (data) {
          toaster.success("Done", "Comment deleted");
          self.isDeleted = true;

          $rootScope.$broadcast("gonevisDash.Comment:remove", {
            data: data,
            comment: self,
            success: true
          });
        },
        function (data) {
          toaster.error("Error", "Deleting comment failed");

          $rootScope.$broadcast("gonevisDash.Comment:remove", {
            data: data,
            comment: self,
            success: false
          });
        }
      );
    };

    /**
     * @desc Reply to comment.
     */
    this.reply = function (comment) {

      this.isReplying = true;

      var payload = {
        object_type: this.objectType,
        comment: comment,
        object_pk: this.get.object_pk
      };
      API.Comments.save(payload,
        function (data) {
          self.isReplying = false;
          $rootScope.$broadcast("gonevisDash.Comment:reply", data);
        }
      );
    };

    /**
     * @desc Get comment's current status.
     */
    this.getStatus = function () {
      return Codekit.commentStatuses[this.get.status];
    };

    /**
     * @desc Change comment status
     * 
     * @param {string} key
     * @param {number} value
     */
    this.setStatus = function (key, value) {
      var payload = {};
      payload[key] = value;

      API.Comment.patch({ comment_id: this.get.id }, payload,
        function () {
          self.get[key] = value;
          self.get.statusLabel = this.getStatus();
        }
      );
    };

    /**
     * @desc View comment as modal (detailed mode).
     */
    this.view = function () {
      ModalsService.open("comment", "CommentModalController", { comment: this });
    };

  };
}

app.factory("Comment", Comment);
Comment.$inject = [
  "$rootScope",
  "toaster",
  "API",
  "ModalsService",
  "Codekit",
  "Account"
];
