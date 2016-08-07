'use strict'

/**
 * @ngdoc function
 * @name gonevisDash.controller:EntryEditController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $state
 * @param $stateParams
 * @param $mdToast
 * @param EntryEditService
 * @param AuthenticationService
 */
function EntryEditController($scope, $state, $stateParams, $mdToast, EntryEditService, AuthenticationService) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.form = {
      id: $stateParams.entryId,
      site: AuthenticationService.getCurrentSite()
    };

    $scope.statuses = [
      { name: "Draft", id: 0 },
      { name: "Hidden", id: 1 },
      { name: "Published", id: 2 }
    ];

    EntryEditService.get($scope.form.id).then(function (data) {
      $scope.form = data.data;
    })
  }


  /**
   * update
   *
   * @method update
   * @desc Update entry API callback
   * 
   * @param form {object}
   */
  $scope.update = function (form) {
    form.loading = true;

    EntryEditService.put(form).then(
      function (data) {
        $mdToast.showSimple("Entry updated!");
        form.loading = false;
        form.errors = null;
      },
      function (data) {
        $mdToast.showSimple("Couldn't update entry!");
        form.loading = false;
        form.errors = data.data;
      }
    );
  }

  /**
   * delete
   *
   * @method delete
   * @desc delete entry via api call
   * 
   * @param id {string} UUID of entry
   */
  $scope.delete = function (id) {
    EntryEditService.del(id).then(
      function (data) {
        $mdToast.showSimple("Entry has been deleted !");
        $state.go('dash.entry-list');
      },
      function (data) {
        $mdToast.showSimple("Something went wrong... We couldn't delete entry!");
      }
    );
  };

  constructor()
}

app.controller('EntryEditController', EntryEditController)
EntryEditController.$inject = [
  '$scope', '$state', '$stateParams', '$mdToast', 'EntryEditService', 'AuthenticationService'
]
