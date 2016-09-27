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

  /**
   * remove
   *
   * @method remove
   * @desc Delete a dolphin and broadcast it
   *
   * @param dolphin {Object}
   * @param toast {Boolean} Toggle show notification (toast) after API call
   */
  function remove(dolphin, toast) {
    toast = toast || true;

    API.Dolphin.remove({ site_id: dolphin.site, file_id: dolphin.id },
      function (data) {
        dolphin.isDeleted = true;
        $rootScope.$broadcast("gonevisDash.DolphinService:remove", {
          dolphin: dolphin,
          data: data,
          success: true
        });
        if (toast) {
          $mdToast.showSimple("Deleted " + dolphin.meta_data.name);
        }
      },
      function (data) {
        $rootScope.$broadcast("gonevisDash.DolphinService:remove", {
          dolphin: data,
          data: data,
          success: false
        });
        if (toast) {
          $mdToast.showSimple("Sorry, file couldn't be deleted. Try again later.");
        }
      }
    );
  }

  /**
   * view
   *
   * @method view
   * @desc Dolphin view via modal
   *
   * @param dolphin {Object}
   */
  function view(dolphin) {
    ModalsService.open("dolphin", "DolphinModalController", { dolphin: dolphin });
  }

  /**
   * viewSelection
   *
   * @method viewSelection
   * @desc Open the main dolphin component via modal for selection
   */
  function viewSelection() {
    $rootScope.selectionMode = true;
    ModalsService.open("dolphinSelection", "DolphinController");
  }

  return {
    remove: remove,
    view: view,
    viewSelection: viewSelection,
  };
}

app.factory("DolphinService", DolphinService);
DolphinService.$inject = [
  "$rootScope",
  "$mdToast",
  "API",
  "ModalsService",
];
