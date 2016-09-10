'use strict';

/**
 * Main Controller
 * 
 * @class MainController
 * @namespace gonevisDash.MainController
 *
 * @param $scope
 * @param $state
 * @param $mdToast
 * @param AuthService
 * @param API
 * @param CommentService
 */
function MainController($scope, $state, $mdToast, $stateParams, AuthService, API, CommentService) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.auth = AuthService;
    $scope.user = AuthService.getAuthenticatedUser();
    $scope.site = AuthService.getCurrentSite();
    $scope.commentService = CommentService;

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
        }
      )
    },
  }

  constructor();
}

app.controller("MainController", MainController);
MainController.$inject = [
  '$scope',
  '$state',
  '$mdToast',
  '$stateParams',
  'AuthService',
  'API',
  'CommentService'
];
