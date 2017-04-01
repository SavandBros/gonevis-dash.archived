"use strict";

/**
 * @class DolphinService
 *
 * @param $rootScope
 * @param API
 * @param ModalsService
 * @param toaster
 */
function DolphinService($rootScope, API, ModalsService, toaster) {

  /**
   * @method remove
   * @desc Delete a dolphin and broadcast it
   *
   * @param dolphin {Object}
   * @param toast {Boolean} Toggle show notification (toast) after API call
   */
  function remove(dolphin, toast) {
    toast = toast || true;

    API.Dolphin.remove({ siteId: dolphin.site, fileId: dolphin.id },
      function (data) {
        dolphin.isDeleted = true;
        $rootScope.$broadcast("gonevisDash.DolphinService:remove", {
          dolphin: dolphin,
          data: data,
          success: true
        });
        if (toast) {
          toaster.success("Done", "Deleted " + dolphin.meta_data.name);
        }
      },
      function (data) {
        $rootScope.$broadcast("gonevisDash.DolphinService:remove", {
          dolphin: data,
          data: data,
          success: false
        });
        if (toast) {
          toaster.error("Sorry", "file couldn't be deleted. Try again later.");
        }
      }
    );
  }

  /**
   * @method view
   * @desc Dolphin view via modal
   *
   * @param dolphin {Object}
   */
  function view(dolphin) {
    ModalsService.open("dolphin", "DolphinModalController", { dolphin: dolphin });
  }

  /**
   * @method viewSelection
   * @desc Open the main dolphin component via modal for selection
   *
   * @param source {String} Source of use (to check later)
   */
  function viewSelection(source) {
    $rootScope.selectionMode = true;
    ModalsService.open("dolphinSelection", "DolphinController", { source: source });
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
  "API",
  "ModalsService",
  "toaster"
];
