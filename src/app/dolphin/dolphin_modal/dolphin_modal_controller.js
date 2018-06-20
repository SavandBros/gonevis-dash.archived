'use strict';

import app from "../../app";

function DolphinModalController($scope, $rootScope, toaster, dolphin, API, $translate) {

  function constructor() {
    $scope.dolphin = dolphin;

    $scope.form = {
      data: dolphin.get
    };
  }

  /**
   * @desc Update dolphin and broadcast
   *
   * @param {object} form Form and dolphin data object
   */
  $scope.update = function(form) {
    form.loading = true;

    API.Dolphin.put({
        siteId: form.data.site,
        fileId: form.data.id
      }, form.data,
      function(data) {
        form.loading = false;
        $translate(["DONE", "DOLPHIN_UPDATED"], {'name': form.data.meta_data.name}).then(function(translations) {
          toaster.info(translations.DONE, translations.DOLPHIN_UPDATED);
        });
        $rootScope.$broadcast('gonevisDash.Dolphin:update', {
          dolphin: data,
          data: data,
          success: true
        });
      },
      function(data) {
        form.loading = false;
        form.errors = data.data;
      }
    );
  };

  constructor();
}

app.controller("DolphinModalController", DolphinModalController);
