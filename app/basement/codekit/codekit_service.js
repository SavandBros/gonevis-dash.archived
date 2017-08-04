"use strict";

/**
 * @desc Codekit service is a basement filled with useful function and constant data,
 *       It stops repeating code such as functions, static variables, etc...
 *       Using this provider is highly recommended, even got a short name to be used quickly :P
 */
function Codekit($timeout, $window, $log) {

  /**
   * @desc Get index of an item in a data
   *
   * @param {object} master Master data to search in
   * @param {object} search Item to find it's index in master object
   * @param {string} key Property to compare, default is "id"
   *
   * @returns {number} Index of the item found in data via the given key
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
   * @desc All statuses available for entries.
   *
   * @type {array}
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
   * @desc All formats available for entries.
   *
   * @type {object}
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
   * @desc All statuses available for comments.
   *
   * @type {array}
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
   * @desc All roles for team.
   *
   * @type {array}
   */
  var teamRoles = [
    { id: 0, color: "text-primary", label: "Owner" },
    { id: 1, color: "text-info", label: "Administrator" },
    { id: 2, color: "text-warning", label: "Editor" }
  ];

  /**
   * @desc Delete an item if has property isDeleted
   *
   * @param {object} master Master data to search in
   * @param {string} key Deleted property
   * @param {number} delay
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
   * @desc is object empty
   *
   * @param {object} object
   */
  function isEmptyObj(object) {
    return (Object.getOwnPropertyNames(object).length === 0);
  }

  /**
   * @desc Focus on an element (input)
   *
   * @param {string} selector
   */
  function focus(selector) {
    $timeout(function () {
      angular.element(selector).focus();
    }, 200);
  }

  /**
   * @desc Set tab title
   *
   * @param {string} title
   */
  function setTitle(title) {
    var finalTitle = "GoNevis Dash";

    if (title) {
      finalTitle = title + " - GoNevis Dash";
    }

    $window.document.title = finalTitle;
  }

  /**
   * @desc Check screen size to see if mobile or not
   *
   * @returns {boolean}
   */
  function isMobile() {
    return $window.matchMedia("only screen and (max-width: 760px)").matches;
  }

  /**
   * @desc Report error to sentry or console
   *
   * @param {string} message
   * @param {object} data
   */
  function reportSentry(message, data) {
    if (Raven.isSetup()) {
      throw new Error(JSON.stringify({
        message: message,
        data: data
      }));
    } else {
      $log.error(message, data);
    }
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
    setTitle: setTitle,
    isMobile: isMobile,
    reportSentry: reportSentry
  };
}

app.factory("Codekit", Codekit);
Codekit.$inject = [
  "$timeout",
  "$window"
];
