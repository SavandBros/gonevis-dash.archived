'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:CommentController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $mdToast
 * @param API
 * @param AuthenticationService
 */
function CommentController($scope, $rootScope, $state, $mdToast, comment, API, AuthenticationService) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.user = AuthenticationService.getAuthenticatedUser();
    $scope.site = AuthenticationService.getCurrentSite();

    API.Comment.get({ comment_id: comment },
      function (data, status, headers, config) {
        $scope.form = data;
        console.log(data)
      },
      function (data, status, headers, config) {
        console.log(data);
      }
    );
  };

  /**
   * updateComment
   *
   * @method updateComment
   * @desc function for updating comment
   * 
   * @param updateComment {object}
   */
  $scope.updateComment = function (form) {
    form.loading = true;

    API.Comment.put({ comment_id: comment }, form,
      function (data, status, headers, config) {
        form.loading = false;
        $scope.form = data;
        $mdToast.showSimple("Comment Updated.");
      },
      function (data, status, headers, config) {
        form.loading = false;
        $mdToast.showSimple("fail");
        console.log(data);
      }
    );
  }

  /**
   * delete
   *
   * @method delete
   * @desc function for deleting comments
   * 
   * @param delete {object}
   */
  $scope.delete = function (comment) {
    API.Comment.delete({ comment_id: comment },
      function (data, status, headers, config) {
        $mdToast.showSimple("Comment deleted!");
      }
    );
  }

  constructor();
}

app.controller("CommentController", CommentController);
CommentController.$inject = ['$scope', '$rootScope', '$state', '$mdToast', 'comment', 'API', 'AuthenticationService'];
