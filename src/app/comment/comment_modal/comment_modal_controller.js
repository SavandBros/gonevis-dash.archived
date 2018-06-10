"use strict";

import app from "../../app";

function CommentModalController($scope, comment, Codekit) {

  function constructor() {
    $scope.statuses = Codekit.commentStatuses;
    $scope.comment = comment;
  }

  constructor();
}

app.controller("CommentModalController", CommentModalController);
