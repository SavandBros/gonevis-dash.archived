'use strict'

/**
 * @ngdoc function
 * @name gonevisDash.controller:DolphinController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $state
 * @param $stateParams
 * @param $mdToast
 * @param API
 * @param ENV
 * @param AuthenticationService
 * @param Upload
 */
function DolphinController($scope, $state, $stateParams, $mdToast, API, ENV, AuthenticationService, Upload) {

  var site = AuthenticationService.getCurrentSite();

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.form = {
      site: site,
      file: null,
    }

    API.Dolphins.get({ site_id: site },
      function (data) {
        $scope.dolphins = data.results;
      }
    );

    $scope.upload = {
    }
  }

  /**
   * addFile
   *
   * @method addFile
   * @desc function to add new file
   *
   * @param 
   */
  $scope.newFile = function (form) {
    API.DolphinNew.save({ site_id: site }, form,
      function (data) {
        console.log(data.data);
      },
      function (data) {
        console.log(data.data);
      });
  }

  constructor()
}

app.controller('DolphinController', DolphinController)
DolphinController.$inject = [
  '$scope', '$state', '$stateParams', '$mdToast', 'API', 'ENV', 'AuthenticationService', 'Upload'
]
