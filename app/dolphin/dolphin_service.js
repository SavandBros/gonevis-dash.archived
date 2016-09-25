"use strict";

/**
 * Dolphin Service
 *
 * @class DolphinService
 * @namespace gonevisDash.DolphinService
 *
 * @param $rootScope
 * @param $mdToast
 * @param API
 * @param ModalsService
 *
 * @returns [Factory]
 */
function DolphinService($rootScope, $mdToast, API, ModalsService) {
  function remove(dolphin, toast) {

    var toast = toast || true;

    API.Dolphin.remove({ site_id: dolphin.site, file_id: dolphin.id },
      function (data) {
        $scope.isDeleted = true;
        $rootScope.$broadcast('gonevisDash.DolphinService:remove', {
          dolphin: data,
          success: true
        });
        if (toast) {
          $mdToast.showSimple("Deleted " + meta_data.name);
        };
      },
      function (data) {
        $rootScope.$broadcast('gonevisDash.DolphinService:remove', {
          dolphin: data,
          success: false
        });
        if (toast) {
          $mdToast.showSimple("Sorry, file couldn't be deleted. Try again later.");
        };
      }
    )
  };

  return {
  };
}

app.factory("DolphinService", DolphinService);
DolphinService.$inject = [
  "$rootScope",
  "$mdToast",
  "API",
  "ModalsService",
];
