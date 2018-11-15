"use strict";

import app from '../../app';

function UndoService($timeout, $translate, $state, toaster) {

  /**
   * @desc Store param item.
   */
  let paramItem = null;

  /**
   * @desc Store in progress items.
   * @type {array}
   */
  let inProgressItems = [];

  /**
   * @desc Clear in progress items.
   *
   * @param {string} id
   */
  function clearInProgressItems(id) {
    inProgressItems = inProgressItems.filter(e => e !== id);
  }

  /**
   * @desc Check if given item id is included.
   *
   * @param {string} id
   */
  function validateParam(id) {
    if (!inProgressItems.length) {
      return;
    }

    return inProgressItems.includes(id);
  }

  /**
   * @desc Handle item deletion.
   *
   * @param {object} item
   */
  function remove(item) {
    inProgressItems.push(item.get.id);
    paramItem = item;
    item.isSelected = false;
    item.isDeleted = true;

    // Clear last toasters.
    toaster.clear();
    $translate(['UNDO_DELETE', 'UNDO_DELETE_MESSAGE']).then((trans) => {
      item.toaster = toaster.pop("success", trans.UNDO_DELETE, trans.UNDO_DELETE_MESSAGE, 5000, 'trustedHtml', () => {
        item.isDeleted = false;
        clearInProgressItems(item.get.id);
        return true;
      });
    });

    // If item already has a timeout, then cancel it.
    if (item.timeout) {
      $timeout.cancel(item.timeout);
    }
    // Proceed to deletion After 5 seconds.
    item.timeout = $timeout(() => {
      // Clear undo toaster
      if (item.toaster) {
        toaster.clear(item.toaster);
      }
      // Delete item if there were no undo.
      if (item.isDeleted === true) {
        clearInProgressItems(item.get.id);
        return item.remove(true);
      }
    }, 5500);
  }

  /**
   * @desc Handle deletion prompt.
   *
   * @param {string} promptText
   * @param {string} stateName
   * @param {string} paramName
   * @param {object} item
   */
  function prompt(promptText, stateName, paramName, item) {
    let routeParam = {};
    routeParam[paramName] = item.get.id;

    if (confirm($translate.instant(promptText)) === true) {
      remove(item, true);
      $state.go(stateName, routeParam);
    } else {
      return;
    }
  }

  /**
   * @desc Handle param.
   *
   * @param {array} master
   */
  function onParamProvided(master) {
    angular.forEach(master, (item, index) => {
      if (paramItem && item.get.id === paramItem.get.id || inProgressItems.includes(item.get.id)) {
        master[index] = paramItem;
      }
    });
  }

  return {
    validateParam: validateParam,
    remove: remove,
    prompt: prompt,
    onParamProvided: onParamProvided
  };
}

app.factory("UndoService", UndoService);
