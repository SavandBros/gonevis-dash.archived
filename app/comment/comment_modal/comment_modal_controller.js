"use strict";

var app = require("../../app_module");

function CommentModalController($scope, comment, Codekit) {

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

module.exports = CommentModalController;
