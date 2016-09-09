'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:MainController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $state
 * @param $mdToast
 * @param AuthenticationService
 * @param API
 */
function MainController($scope, $state, $mdToast, $stateParams, AuthenticationService, API) {
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
    $scope.auth = AuthenticationService;
    $scope.user = AuthenticationService.getAuthenticatedUser();
    $scope.site = AuthenticationService.getCurrentSite();
    // Check auth
    if (!AuthenticationService.isAuthenticated()) {
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

  constructor();
}

app.controller("MainController", MainController);
MainController.$inject = [
  '$scope',
  '$state',
  '$mdToast',
  '$stateParams',
  'AuthenticationService',
  'API',
];
