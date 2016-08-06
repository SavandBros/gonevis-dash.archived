'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:TagEditController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $mdToast
 * @param $stateParams
 * @param TagEditService
 * @param AuthenticationService
 */
function TagEditController($scope, $rootScope, $state, $mdToast, $stateParams, TagEditService, AuthenticationService) {

  $scope.form = {
    site: AuthenticationService.getCurrentSite(),
    id: $stateParams.tagId
  }

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.user = AuthenticationService.getAuthenticatedUser();

    TagEditService.get($scope.form).then(
      function (data, status, headers, config) {
        $scope.form = data.data;
      }
    );
  };

  /**
   * updateTag
   *
   * @method updateTag
   * @desc for updating tag details
   * 
   * @param form {object}
   */
  $scope.updateTag = function (form) {
    form.loading = true;

    TagEditService.put(form).then(
      function (data, status, headers, config) {
        form.loading = false;
      },
      function (data, status, headers, config) {
        form.loading = false;
      }
    );
  }

  constructor();
}

app.controller("TagEditController", TagEditController);
TagEditController.$inject = ['$scope', '$rootScope', '$state', '$mdToast', '$stateParams', 'TagEditService', 'AuthenticationService'];
