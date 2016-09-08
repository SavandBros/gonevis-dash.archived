'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:DolphinController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $mdToast
 * @param $stateParams
 * @param API
 * @param AuthenticationService
 */
function DolphinController($scope, $rootScope, $state, $mdToast, $stateParams, id, API, AuthenticationService) {

  var site = AuthenticationService.getCurrentSite();

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.user = AuthenticationService.getAuthenticatedUser();

    API.Dolphin.get({ site_id: site, file_id: id },
      function (data, status, headers, config) {
        $scope.form = data;
      }
    );
  };

  /**
   * updateFile
   *
   * @method updateFile
   * @desc for updating tag details
   * 
   * @param form {object}
   */
  $scope.updateFile = function (form) {
    form.loading = true;

    API.Dolphin.put({ site_id: site, file_id: $stateParams.fileId }, form,
      function (data, status, headers, config) {
        form.loading = false;
        $mdToast.showSimple("File updated.");
      },
      function (data, status, headers, config) {
        form.loading = false;
      }
    );
  };

  /**
   * updateFile
   *
   * @method updateFile
   * @desc for updating tag details
   * 
   * @param form {object}
   */
  $scope.delete = function (id) {
    API.Dolphin.delete({ site_id: site, file_id: $stateParams.fileId },
      function (data, status, headers, config) {
        $mdToast.showSimple("File" + $scope.form.file_name + " deleted.");
        $state.go('dash.dolphin');
      },
      function (data, status, headers, config) {
        $mdToast.showSimple("There have been a problem");
      }
    )
  }



  constructor();
}

app.controller("DolphinController", DolphinController);
DolphinController.$inject = [
  '$scope', '$rootScope', '$state', '$mdToast', '$stateParams', 'id', 'API', 'AuthenticationService'
];
