'use strict'

/**
 * @ngdoc function
 * @name gonevisDash.controller:TagNewController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $mdToast
 * @param $stateParams
 * @param TagNewService
 * @param AuthenticationService
 */
function TagNewController($scope, $rootScope, $state, $mdToast, $stateParams, TagNewService, AuthenticationService) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.user = AuthenticationService.getAuthenticatedUser();
  }

  /**
   * newTag
   *
   * @method newTag
   * @desc for updating tag details
   * 
   * @param form {object}
   */
  $scope.newTag = function (form) {
    form.loading = true;

    var payload = {
      name: form.name,
      site: AuthenticationService.getCurrentSite(),
      slug: form.slug,
      description: form.description
    };

    TagNewService.post(payload).then(
      function (data, status, headers, config) {
        form.loading = false;
        $mdToast.showSimple("Tag " + form.name + " has been created");
        $state.go('dash.tag-list');
      },
      function (data, status, headers, config) {
        form.loading = false
      }
    );
  }

  constructor()
}

app.controller('TagNewController', TagNewController)
TagNewController.$inject = ['$scope', '$rootScope', '$state', '$mdToast', '$stateParams', 'TagNewService', 'AuthenticationService']
