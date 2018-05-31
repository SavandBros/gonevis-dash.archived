"use strict";

/**
 * @desc Update scope even with spaces
 *
 * @returns {function}
 */
function ngKeyStroke() {
  return {
    restrict: "A",
    link: function(scope, elem) {
      elem.bind("keyup", function() {
        scope.$digest();
      });
    }
  };
}

app.directive("ngKeyStroke", ngKeyStroke);


module.exports = ngKeyStroke;
