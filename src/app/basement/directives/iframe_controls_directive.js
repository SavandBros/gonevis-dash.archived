"use strict";

import app from '../../app';

/**
 * @desc Disable element on API/promise call
 *
 * @returns {function}
 */
app.directive('iframeControls', () => {
  return {
    restrict: 'EA',
    link: (scope, element, attr) => {
      console.log('aaaa');
      // let check = function (iframe) {
      //   if (iframe.hasClass(attr.ngDataControlClass)) {
      //     console.log('aaaaa');
      //   }
      // };
      // // on Click
      // element.bind('click', () => {
      //   let iframeContainer = angular.element('.selected');
      //   // console.log();
      //   angular.element(iframeContainer[0].firstChild).addClass(attr.ngDataControlClass);
      //   check(angular.element(iframeContainer[0].firstChild));
      // });
    }
  };
});
