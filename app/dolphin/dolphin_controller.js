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
 * @param DolphinService
 * @param AuthenticationService
 */
function DolphinController($scope, $state, $stateParams, $mdToast, DolphinService, AuthenticationService) {

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
    DolphinService.get(site).then(
      function (data) {
        $scope.dolphins = data.data.results;
        console.log(data.data.results);
      },
      function (data) {
        console.log(data.data);
      }
    );
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
    DolphinService.post(form).then(
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
  '$scope', '$state', '$stateParams', '$mdToast', 'DolphinService', 'AuthenticationService'
]
