'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:DolphinModalController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param toaster
 * @param dolphin
 * @param API
 */
function DolphinModalController($scope, $rootScope, toaster, dolphin, API) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.dolphin = dolphin;

    $scope.form = {
      data: dolphin.get
    };
  }

  /**
   * update
   *
   * @method update
   * @desc Update dolphin and broadcast
   *
   * @param form {Object} Form and dolphin data object
   */
  $scope.update = function (form) {
    form.loading = true;

    API.Dolphin.put({ siteId: form.data.site, fileId: form.data.id }, form.data,
      function (data) {
        form.loading = false;
        toaster.info("Done", "File " + form.data.meta_data.name + " updated.");
        $rootScope.$broadcast('gonevisDash.Dolphin:update', {
          dolphin: data,
          data: data,
          success: true
        });
      },
      function (data) {
        form.loading = false;
        form.errors = data.data;
      }
    );
  };

  constructor();
}

app.controller("DolphinModalController", DolphinModalController);
DolphinModalController.$inject = [
  '$scope',
  '$rootScope',
  'toaster',
  'dolphin',
  'API'
];