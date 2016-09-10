'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:MainController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $state
 * @param $mdToast
 * @param AuthService
 * @param API
 */
function MainController($scope, $state, $mdToast, $stateParams, ModalsService, AuthService, API) {
  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   *
   * @memberOf MainController
   */
  function constructor() {
    // User
    $scope.auth = AuthService;
    $scope.user = AuthService.getAuthenticatedUser();
    $scope.site = AuthService.getCurrentSite();
    // Check auth
    if (!AuthService.isAuthenticated()) {
      $mdToast.showSimple('Please login to continue.');
      $state.go('signin');
    }

    // State
    $scope.state = $state;
    $scope.param = $stateParams

    $scope.Comment.initialize();
  };

  $scope.Comment = {

    list: [],

    initialize: function () {
      API.Comments.get({ site_id: $scope.site, object_type: 1 },
        function (data, status, headers, config) {
          $scope.Comment.list = data.results;
          console.log($scope.Comment.list)
        }
      )
    },

    delete: function (comment) {
      API.Comment.delete({ comment_id: comment.id },
        function (data, status, headers, config) {
          comment.isDeleted = true;
          $mdToast.showSimple("Comment deleted!");
        }
      );
    },

    show: function (comment) {

    }
  }

  /**
   * viewComment
   *
   * @method viewComment
   * @desc Open up comment detail via modal
   *
   * @param comment {Number}
   */
  $scope.viewComment = function (comment) {
    ModalsService.open("comment", "CommentController", { comment: comment });
  }

  constructor();
}

app.controller("MainController", MainController);
MainController.$inject = [
  '$scope',
  '$state',
  '$mdToast',
  '$stateParams',
  'ModalsService',
  'AuthService',
  'API',
];
