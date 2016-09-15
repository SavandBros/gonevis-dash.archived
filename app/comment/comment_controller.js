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
 * @param AuthService
 * @param CommentService
 */
function CommentController($scope, $rootScope, $state, $mdToast, API, AuthService, CommentService) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.user = AuthService.getAuthenticatedUser();
    $scope.site = AuthService.getCurrentSite();
    $scope.commentService = CommentService;

    API.Comments.get({ site_id: $scope.site, object_type: CommentService.objectType },
      function (data, status, headers, config) {
        $scope.comments = data.results;
      }
    )
  };

  $rootScope.$on('gonevisDash.CommentService:delete', function (event, data) {
    for (var i = 0; i < $scope.comments.length; i++) {
      if ($scope.comments[i].id == data.id) {
        $scope.comments[i].isDeleted = true;
      }
    }
  });

  constructor();
}

app.controller('CommentController', CommentController);
CommentController.$inject = [
  '$scope', '$rootScope', '$state', '$mdToast', 'API', 'AuthService', 'CommentService'
]
