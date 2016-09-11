'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:TagListController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $mdToast
 * @param API
 * @param AuthService
 */
function TagListController($scope, $rootScope, $state, $mdToast, API, AuthService) {

  var site = AuthService.getCurrentSite();

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.user = AuthService.getAuthenticatedUser();

    API.Tags.get({ tag_site: site },
      function (data, status, headers, config) {
        $scope.tags = data.results;
      }
    );
  };

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


  constructor();
}

app.controller("TagListController", TagListController);
TagListController.$inject = ['$scope', '$rootScope', '$state', '$mdToast', 'API', 'AuthService'];
