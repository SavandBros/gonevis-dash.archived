"use strict";

var app = require("../app_module");

function Entry($rootScope, $state, API, Codekit, toaster) {
  return function(data) {

    /**
     * @desc Super variable for getting this in functions
     * @type {Tag}
     */
    var self = this;

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
     * @type {boolean}
     */
    this.isSelected = false;

    /**
     * @desc Cache entry
     *
     * @param {boolean} clear
     */
    this.cache = function(clear) {
      $rootScope.cache.entry = clear ? null : this;
    };

    /**
     * @desc Change a property of entry
     *
     * @param {string} key Property name
     * @param {string|number} value Property value
     */
    this.setProperty = function(key, value) {
      var payload = {};
      payload[key] = value;

      API.Entry.patch({
          entry_id: this.get.id
        }, payload,
        function() {
          self.get[key] = value;
          self.isSelected = true;
        }
      );
    };

    /**
     * @desc Check if has cover image
     * @returns {boolean}
     */
    this.hasCoverImage = function () {
      if (self.get.media && self.get.media.cover_image) {
        return true;
      }
      return false;
    };

    /**
     * @desc Entry creation
     *
     * @param {function} success
     * @param {function} fail
     *
     * @returns {Promise}
     */
    this.create = function(success, fail) {
      return API.Entry.save(this.get, success, fail);
    };

    /**
     * @desc Delete entries via API call
     */
    this.remove = function() {
      API.Entry.delete({
          entry_id: this.get.id
        },
        function() {
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
     * @desc Add draft parameters if entry is draft
     * @returns {string}
     */
    this.getUrl = function() {
      var params = "";

      if (this.get.status === Codekit.entryStatuses[0].id) {
        params = "?view=preview";
      }

      return this.get.absolute_uri + params;
    };

    /**
     * @desc Add entry to navigation
     */
    this.addToNavigation = function() {
      $state.go("dash.navigation", {
        add: {
          label: this.get.title,
          url: "/" + this.get.slug
        }
      });
    };
  };
}

app.service("Entry", Entry);
Entry.$inject = [
  "$rootScope",
  "$state",
  "API",
  "Codekit",
  "toaster"
];

module.exports = Entry;
