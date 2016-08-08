'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:CommentListController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $mdToast
 * @param CommentListService
 * @param AuthenticationService
 */
function CommentListController($scope, $rootScope, $state, $mdToast, CommentListService, AuthenticationService) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.user = AuthenticationService.getAuthenticatedUser();

    CommentListService.get().then(
      function (data, status, headers, config) {
        $scope.comments = data.data.results;
      },
      function (data, status, headers, config) {
        console.log(data.data);
      }
    );
  };

  $scope.delete = function (comment) {
    CommentListService.del(comment.id).then(
      function (data, status, headers, config) {
        comment.isDeleted = true;
        $mdToast.showSimple("Comment deleted!");
      }
    );
  }

  constructor();
}

app.controller("CommentListController", CommentListController);
CommentListController.$inject = ['$scope', '$rootScope', '$state', '$mdToast', 'CommentListService', 'AuthenticationService'];
