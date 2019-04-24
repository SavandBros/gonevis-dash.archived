"use strict";

import app from "../app";

function Comment($rootScope, toaster, API, ModalsService, Codekit, Account, $translate) {
  return function(data) {

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
     * @name isEditing
     * @type {Boolean}
     */
    this.isEditing = false;

    /**
     * @name editedComment
     * @type {string}
     */
    this.editedComment = data.comment;

    /**
     * @type {boolean}
     */
    this.isLoading = false;

    /**
     * @type {number}
     */
    this.objectType = 1;

    /**
     * @desc Delete comment, notify and broadcast for controllers to use.
     */
    this.remove = function() {
      this.isLoading = true;

      API.Comment.delete({
          comment_id: this.get.id
        },
        function(data) {
          ModalsService.close("comment");
          self.isLoading = false;
          $translate(["DONE", "COMMENT_DELETED"]).then(function(translations) {
            toaster.success(translations.DONE, translations.COMMENT_DELETED);
          });
          self.isDeleted = true;

          $rootScope.$broadcast("gonevisDash.Comment:remove", {
            data: data,
            comment: self,
            success: true
          });
        },
        function(data) {
          self.isLoading = false;
          $translate(["ERROR", "COMMENT_DELETE_ERROR"]).then(function(translations) {
            toaster.error(translations.ERROR, translations.COMMENT_DELETE_ERROR);
          });

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
    this.reply = function(comment) {

      this.isLoading = true;

      var payload = {
        object_type: this.objectType,
        comment: comment,
        object_pk: this.get.object_pk
      };
      API.Comments.save(payload,
        function(data) {
          self.isLoading = false;
          $rootScope.$broadcast("gonevisDash.Comment:reply", data);
          ModalsService.close("comment");
        }
      );
    };

    /**
     * @desc Edit comment.
     *
     * @param {string} comment
     */
    this.edit = function(comment) {

      this.isLoading = true;

      API.Comment.put({ comment_id: this.get.id }, { comment: comment },
        function(data) {
          self.get.comment = data.comment;
          self.cancelEdit();
          self.isLoading = false;
        }
      );
    };

    /**
     * @desc Get comment's current status.
     */
    this.getStatus = function() {
      return Codekit.commentStatuses[this.get.status];
    };

    /**
     * @desc Change comment status
     *
     * @param {string} key
     * @param {number} value
     */
    this.setStatus = function(key, value) {
      var payload = {};
      payload[key] = value;

      API.Comment.patch({
          comment_id: this.get.id
        }, payload,
        function() {
          self.get[key] = value;
          self.get.statusLabel = this.getStatus();
        }
      );
    };

    /**
     * @desc View comment as modal (detailed mode).
     */
    this.view = function() {
      ModalsService.open("comment", "CommentModalController", {
        comment: self
      });
    };

    /**
     * @desc Cancel editing and reset edited comment.
     */
    this.cancelEdit = function () {
      this.isEditing = false;
      this.editedComment = this.get.comment;
    };

  };
}

app.factory("Comment", Comment);
