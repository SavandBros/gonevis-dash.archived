"use strict";

import app from '../../app';

/**
 * @desc Auto resize textarea
 *
 * @returns {function}
 */
function autoResize($window) {
  return {
    restrict: "A",
    link: (scope, element, attrs) => {
			let autoResize = () => {
        element.css('height', 'auto');

        var height = element[0].scrollHeight;

        if(height > 0){
          element.css('height', height + 'px');
        }
			};
			// When typing
			element.on('input', autoResize);
			// For initialization
      scope.$watch(attrs.ngModel, autoResize);
      // Auto resize textarea when resizing screen.
      angular.element($window).resize(() => {
        autoResize();
      });
    }
  };
}

app.directive("autoResize", autoResize);
