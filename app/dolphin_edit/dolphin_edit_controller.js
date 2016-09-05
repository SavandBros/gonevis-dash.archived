'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:DolphinEditController
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
function DolphinEditController($scope, $rootScope, $state, $mdToast, $stateParams, API, AuthenticationService) {

  var site = AuthenticationService.getCurrentSite();

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.user = AuthenticationService.getAuthenticatedUser();

    API.Dolphin.get({ site_id: site, file_id: $stateParams.fileId },
      function (data, status, headers, config) {
        $scope.form = data;
        console.log($scope.form)
      })
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
   * delete
   *
   * @method delete
   * @desc for deleting a dolphin
   * 
   * @param id {string}
   */
  $scope.delete = function (id) {
    API.Dolphin.delete({ site_id: site, file_id: $stateParams.fileId },
      function (data, status, headers, config) {
        $mdToast.showSimple("File" + $scope.form.meta_data.name + " deleted.");
        $state.go('dash.dolphin');
      },
      function (data, status, headers, config) {
        $mdToast.showSimple("There have been a problem");
      }
    )
  }



  constructor();
}

app.controller("DolphinEditController", DolphinEditController);
DolphinEditController.$inject = ['$scope', '$rootScope', '$state', '$mdToast', '$stateParams', 'API', 'AuthenticationService'];
