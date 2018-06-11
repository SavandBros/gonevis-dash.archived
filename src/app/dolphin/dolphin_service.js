"use strict";

import app from "../app";

function Dolphin($rootScope, API, AuthService, ModalsService, toaster) {
  return function(data) {

    /**
     * @private
     */
    var self = this;

    /**
     * @private
     */
    var constructor = function() {
      self.extension = self.get.ext.split("/")[1].toUpperCase();
      self.get.site = AuthService.getCurrentSite();
    };

    /**
     * @readonly
     * @desc Backend data
     *
     * @type {object}
     */
    this.get = data;

    /**
     * @type {boolean}
     */
    this.isDeleted = false;

    /**
     * @desc Delete a dolphin and broadcast it
     */
    this.remove = function() {
      API.Dolphin.remove({
          siteId: this.get.site,
          fileId: this.get.id
        },
        function(data) {
          self.isDeleted = true;
          toaster.success("Done", "Deleted " + self.get.meta_data.name);

          $rootScope.$broadcast("gonevisDash.Dolphin:remove", {
            dolphin: self,
            data: data,
            success: true
          });
        },
        function(data) {
          toaster.error("Error", "Something went wrong, couldn't remove file.");

          $rootScope.$broadcast("gonevisDash.Dolphin:remove", {
            dolphin: self,
            data: data,
            success: false
          });
        }
      );
    };

    /**
     * @desc Dolphin view via modal
     */
    this.view = function() {
      ModalsService.open("dolphin", "DolphinModalController", {
        dolphin: self
      });
    };

    constructor();
  };

}

app.service("Dolphin", Dolphin);

function DolphinService($rootScope, ModalsService) {
  /**
   * @desc Open the main dolphin component via modal for selection
   *
   * @param {string} source Source of use (to check later)
   */
  function viewSelection(source) {
    $rootScope.selectionMode = true;
    ModalsService.open("dolphinSelection", "DolphinController", {
      source: source
    });
  }

  return {
    viewSelection: viewSelection
  };
}

app.service("DolphinService", DolphinService);
