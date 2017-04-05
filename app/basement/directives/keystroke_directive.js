"use strict";

/**
 * @class ngKeystroke
 * @desc Update scope even with spaces
 *
 * @returns {Function}
 */
function ngKeyStroke() {
  return {
    restrict: "A",
    link: function (scope, elem) {
      elem.bind("keyup", function () {
        scope.$digest();
      });
    }
  };
}

app.directive("ngKeyStroke", ngKeyStroke);
