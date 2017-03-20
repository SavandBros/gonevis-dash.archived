"use strict";

/**
 * @class Entry
 *
 * @param $rootScope
 * @param toaster
 * @param API
 * @param Codekit
 */
function Entry($rootScope, toaster, API, Codekit) {
  return function (data) {

    /**
     * @name self
     * @desc Super variable for getting this in functions
     *
     * @type {Tag}
     */
    var self = this;

    /**
     * @name data
     * @desc Backend data
     *
     * @type {Object}
     */
    this.get = data;

    /**
     * @name isDeleted
     * @type {Boolean}
     */
    this.isDeleted = false;

    /**
     * @name isSelected
     * @type {Boolean}
     */
    this.isSelected = false;

    /**
     * @method cache
     * @desc Cache entry
     */
    this.cache = function () {
      $rootScope.cache.entry = this;
    };

    /**
     * @method setProperty
     * @desc Change a property of entry
     *
     * @param key {String} Property name
     * @param value {String|Number} Property value
     */
    this.setProperty = function (key, value) {
      var payload = {};
      payload[key] = value;

      API.Entry.patch({ entry_id: this.get.id }, payload,
        function () {
          self.get[key] = value;
          self.isSelected = true;
        }
      );
    };

    /**
     * @method remove
     * @desc Delete entries via API call
     */
    this.remove = function () {
      API.Entry.delete({ entry_id: this.get.id },
        function () {
          self.isDeleted = true;
          self.isSelected = false;
          toaster.success("Done", "Entry deleted!");
          $rootScope.$broadcast("gonevisDash.Entry:remove", {
            entry: self,
            success: true,
          });
        }
      );
    };

    /**
     * @method getUrl
     * @desc Add draft parameters if entry is draft
     *
     * @returns {String}
     */
    this.getUrl = function () {
      var params = "";

      if (this.get.status === Codekit.entryStatuses[0].id) {
        params = "?view=preview";
      }

      return this.get.absolute_uri + params;
    };
  };
}

app.service("Entry", Entry);
Entry.$inject = [
  "$rootScope",
  "toaster",
  "API",
  "Codekit",
];
