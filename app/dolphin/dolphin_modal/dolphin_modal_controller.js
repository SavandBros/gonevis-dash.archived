'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:DolphinModalController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param $mdToast
 * @param dolphin
 * @param DolphinService
 * @param API
 */
function DolphinModalController($scope, $rootScope, $mdToast, dolphin, DolphinService, API) {

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

    API.Dolphin.get({ site_id: dolphin.site, file_id: dolphin.id },
      function (data, status, headers, config) {
        $scope.form.data = data;
      }
    );
  };

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

    API.Dolphin.put({ site_id: form.data.site, file_id: form.data.id }, form.data,
      function (data, status, headers, config) {
        form.loading = false;
        $mdToast.showSimple("File " + form.data.meta_data.name + " updated.");
        $rootScope.$broadcast('gonevisDash.DolphinService:update', {
          dolphin: data,
          success: true
        });
      },
      function (data, status, headers, config) {
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
  '$mdToast',
  'dolphin',
  'DolphinService',
  'API'
];
