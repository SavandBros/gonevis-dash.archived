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
 * @param API
 * @param AuthService
 */
function TagNewController($scope, $rootScope, $state, $mdToast, $stateParams, API, AuthService) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.user = AuthService.getAuthenticatedUser();
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
      site: AuthService.getCurrentSite(),
      slug: "",
      description: form.description
    };

    API.Tags.save({ tag_site: payload.site }, payload,
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
TagNewController.$inject = ['$scope', '$rootScope', '$state', '$mdToast', '$stateParams', 'API', 'AuthService']
