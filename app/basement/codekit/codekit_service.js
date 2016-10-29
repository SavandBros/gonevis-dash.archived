"use strict";

/**
 * Codekit
 *
 * @class Codekit
 * @namespace gonevisDash.Codekit
 * @desc Codekit service is a basement filled with useful function and constant data,
 *       It stops repeating code such as functions, static variables, etc...
 *       Using this provider is highly recommended, even got a short name to be used quickly :P
 *
 * @returns [Factory]
 */
function Codekit() {

  /**
   * getIndex
   *
   * @method getIndex
   * @desc Get index of an item in a data
   *
   * @param master {Object} Master data to search in
   * @param search {Object} Item to find it's index in master object
   * @param key {String} Property to compare, default is "id"
   *
   * @returns {Number} Index of the item found in data via the given key
   */
  function getIndex(master, search, key) {
    key = key || "id";

    for (var i in master) {
      if (master[i][key] === search[key]) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Entry statuses
   *
   * @desc All statuses available for entries.
   * @type Array<{
   *  label: String,
   *  id: Number,
   *  icon: String,
   *  color: String
   * }>
   */
  var entryStatuses = [
    { label: "Draft", id: 0, icon: "pencil", color: "warning" },
    { label: "Hidden", id: 1, icon: "lock", color: "default" },
    { label: "Published", id: 2, icon: "globe", color: "success" }
  ];

  return {
    getIndex: getIndex,
    entryStatuses: entryStatuses
  };
};

app.factory("Codekit", Codekit);
