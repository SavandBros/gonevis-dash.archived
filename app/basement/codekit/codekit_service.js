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
  function getIndex(master, search, key) {
    var key = key || "id";

    for (i in master) {
      if (master[i][key] == search[key]) {
        return i;
      };
    };
    return -1;
  };

  return {
    getIndex: getIndex,
  };
};

app.factory("Codekit", Codekit);
