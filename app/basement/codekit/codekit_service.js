"use strict";

/**
 * @class Codekit
 * @desc Codekit service is a basement filled with useful function and constant data,
 *       It stops repeating code such as functions, static variables, etc...
 *       Using this provider is highly recommended, even got a short name to be used quickly :P
 *
 * @param $timeout
 * @param $window
 *
 * @returns [Factory]
 */
function Codekit($timeout, $window) {

  /**
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
   * @name entryStatuses
   * @desc All statuses available for entries.
   *
   * @type {Array}
   */
  var entryStatuses = [{
    label: "Draft",
    id: 0,
    icon: "edit",
    color: "warning",
    title: "Set as draft (hidden)"
  }, {
    label: "Published",
    id: 1,
    icon: "globe",
    color: "success",
    title: "Set as Published"
  }];

  /**
   * @name entryFormats
   * @desc All formats available for entries.
   *
   * @type {Object}
   */
  var entryFormats = {
    text: {
      id: 0,
      label: "Text",
      icon: "file-text-o"
    },
    image: {
      id: 1,
      label: "Image",
      icon: "picture-o"
    },
    video: {
      id: 2,
      label: "Video",
      icon: "film",
      disabled: true
    },
    audio: {
      id: 3,
      label: "Audio",
      icon: "headphones",
      disabled: true
    },
    status: {
      id: 4,
      label: "Status",
      icon: "smile-o",
      disabled: true
    }
  };

  /**
   * @name commentStatuses
   * @desc All statuses available for comments.
   *
   * @type {Array}
   */
  var commentStatuses = [{
    label: "Pending approval",
    icon: "clock-o",
    property: "status",
    value: 0,
    class: "b-color-0"
  }, {
    label: "Active",
    icon: "globe",
    property: "status",
    value: 1,
    class: "b-color-2"
  }, {
    label: "Hidden",
    icon: "user-secret",
    property: "status",
    value: 2,
    class: "b-color-1"
  }];

  /**
   * @name teamRoles
   * @desc All roles for team.
   *
   * @type {Array}
   */
  var teamRoles = [
    { id: 0, color: "text-primary", label: "Owner" },
    { id: 1, color: "text-info", label: "Administrator" },
    { id: 2, color: "text-warning", label: "Editor" }
  ];

  /**
   * @method timeoutSlice
   * @desc Delete an item if has property isDeleted
   *
   * @param master {Object} Master data to search in
   * @param key {String} Deleted property
   * @param delay {Number}
   */
  function timeoutSlice(master, key, delay) {
    key = key || "isDeleted";
    delay = delay || 1000;

    $timeout(function () {
      for (var i in master) {
        if (master[i][key] === true) {
          master.splice(i, 1);
        }
      }
    }, delay);
  }

  /**
   * @method isEmptyObj
   * @desc is object empty
   *
   * @param object {Object}
   */
  function isEmptyObj(object) {
    return (Object.getOwnPropertyNames(object).length === 0);
  }

  /**
   * @method focus
   * @desc Focus on an element (input)
   *
   * @param selector {String}
   */
  function focus(selector) {
    $timeout(function () {
      angular.element(selector).focus();
    }, 200);
  }

  /**
   * @method setTitle
   * @desc Set tab title
   *
   * @param {String} title 
   */
  function setTitle(title) {
    var finalTitle = "GoNevis Dash";

    if (title) {
      finalTitle = title + " - GoNevis Dash";
    }

    $window.document.title = finalTitle;
  }

  return {
    getIndex: getIndex,
    entryStatuses: entryStatuses,
    entryFormats: entryFormats,
    commentStatuses: commentStatuses,
    teamRoles: teamRoles,
    timeoutSlice: timeoutSlice,
    isEmptyObj: isEmptyObj,
    focus: focus,
    setTitle: setTitle
  };
}

app.factory("Codekit", Codekit);
Codekit.$inject = [
  "$timeout",
  "$window"
];
