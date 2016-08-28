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
 * @param AuthenticationService
 */
function DolphinController($scope, $state, $stateParams, $mdToast, API, AuthenticationService) {

  var site = AuthenticationService.getCurrentSite();

  $scope.form = {
      site: AuthenticationService.getCurrentSite(),
      file: null,
    }
    /**
     * constructor
     *
     * @method constructor
     * @desc Init function for controller
     */
  function constructor() {
    API.Dolphins.get({ site_id: site },
      function (data) {
        $scope.dolphins = data.results;
        console.log(data.results);
      },
      function (data) {
        console.log(data);
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
  '$scope', '$state', '$stateParams', '$mdToast', 'API', 'AuthenticationService'
]
