'use strict'

/**
 * Main Controller
 * 
 * @class MainController
 * @namespace gonevisDash.MainController
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $mdToast
 * @param AuthService
 * @param API
 * @param CommentService
 */
function MainController ($scope, $rootScope, $state, $mdToast, $stateParams, AuthService, API, CommentService) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor () {
    $scope.auth = AuthService
    $scope.user = AuthService.getAuthenticatedUser()
    $scope.site = AuthService.getCurrentSite()
    $scope.commentService = CommentService

    // Check auth
    if (!AuthService.isAuthenticated()) {
      $mdToast.showSimple('Please login to continue.')
      $state.go('signin')
    }

    // State
    $scope.state = $state
    $scope.param = $stateParams

    $scope.Comment.initialize()
  }

  $scope.Comment = {
    list: [],

    initialize: function () {
      API.Comments.get({ site_id: $scope.site, object_type: 1 },
        function (data, status, headers, config) {
          $scope.Comment.list = data.results
        }
      )
    }
  }

  $rootScope.$on('gonevisDash.CommentService:delete', function (event, data) {
    for (var i = 0; i < $scope.Comment.list.length; i++) {
      if ($scope.Comment.list[i].id == data.id) {
        $scope.Comment.list[i].isDeleted = true
      }
    }
  })

  constructor()
}

app.controller('MainController', MainController)
MainController.$inject = [
  '$scope',
  '$rootScope',
  '$state',
  '$mdToast',
  '$stateParams',
  'AuthService',
  'API',
  'CommentService'
]
