"use strict";
import avatar from "../../../public/img/avatar.png";
import tinyImage from "../../../public/img/default/48x48.png";
import smallImage from "../../../public/img/default/128x128.png";
import mediumImage from "../../../public/img/default/256x256.png";
import largeImage from "../../../public/img/default/512x512.png";

import app from '../../app';

/**
 * @desc Codekit service is a basement filled with useful function and constant data,
 *       It stops repeating code such as functions, static variables, etc...
 *       Using this provider is highly recommended, even got a short name to be used quickly :P
 */
function Codekit($timeout, $window, $log, $translate) {

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
  var entryStatuses = [];

  /**
   * @desc All formats available for entries.
   *
   * @type {array}
   */
  var entryFormats = [];

  /**
   * @desc All statuses available for comments.
   *
   * @type {array}
   */
  var commentStatuses = [];

  /**
   * @desc All roles for team.
   *
   * @type {array}
   */
  var teamRoles = [];

  $translate([
    'DRAFT', 'SET_DRAFT', 'PUBLISHED', 'SET_PUBLISHED', "TEXT", 'IMAGE', 'VIDEO', "AUDIO", 'STATUS', "PENDING_APPROVAL",
    "ACTIVE", "HIDDEN", "OWNER", "ADMINISTRATOR", "EDITOR"
  ]).then(function (translation) {

    entryStatuses.push({
      label: translation.DRAFT,
      id: 0,
      icon: "edit",
      color: "warning",
      title: translation.SET_DRAFT
    }, {
      label: translation.PUBLISHED,
      id: 1,
      icon: "globe",
      color: "success",
      title: translation.SET_PUBLISHED
    });

    entryFormats.push({
      text: {
        id: 0,
        label: translation.TEXT,
        icon: "file-text-o"
      },
      image: {
        id: 1,
        label: translation.IMAGE,
        icon: "picture-o"
      },
      video: {
        id: 2,
        label: translation.VIDEO,
        icon: "film",
        disabled: true
      },
      audio: {
        id: 3,
        label: translation.AUDIO,
        icon: "headphones",
        disabled: true
      },
      status: {
        id: 4,
        label: translation.STATUS,
        icon: "smile-o",
        disabled: true
      }
    });

    commentStatuses.push({
      label: translation.PENDING_APPROVAL,
      icon: "clock-o",
      property: "status",
      value: 0,
      class: "b-color-0"
    }, {
      label: translation.ACTIVE,
      icon: "globe",
      property: "status",
      value: 1,
      class: "b-color-2"
    }, {
      label: translation.HIDDEN,
      icon: "user-secret",
      property: "status",
      value: 2,
      class: "b-color-1"
    });

    teamRoles.push({
      id: 0,
      color: "text-primary",
      label: translation.OWNER
    }, {
      id: 1,
      color: "text-info",
      label: translation.ADMINISTRATOR
    }, {
      id: 2,
      color: "text-warning",
      label: translation.EDITOR
    });
  });

  /**
   * @desc All default images.
   *
   * @type {object}
   */
  var defaultImages = {
    avatar: avatar,
    tiny: tinyImage,
    small: smallImage,
    medium: mediumImage,
    large: largeImage
  };

  /**
   * @desc Return default images
   *
   * @param {string} size
   */
  function getDefaultImage(size) {
    return defaultImages[size];
  }

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
    getDefaultImage: getDefaultImage,
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
