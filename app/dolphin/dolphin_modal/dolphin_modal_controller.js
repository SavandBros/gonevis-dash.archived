'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:DolphinModalController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param dolphin
 * @param DolphinService
 * @param API
 */
function DolphinModalController($scope, $rootScope, dolphin, DolphinService, API) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.form = {
      data: dolphin
    };

    $scope.dolphinService = DolphinService;

    API.Dolphin.get({ siteId: dolphin.site, fileId: dolphin.id },
      function (data) {
        $scope.form.data = data;
      }
    );
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
        // $mdToast.showSimple("File " + form.data.meta_data.name + " updated.");
        $rootScope.$broadcast('gonevisDash.DolphinService:update', {
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
};

app.controller("DolphinModalController", DolphinModalController);
DolphinModalController.$inject = [
  '$scope',
  '$rootScope',
  'dolphin',
  'DolphinService',
  'API'
];
