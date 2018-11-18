import app from '../../app';

/**
 * @desc Disable element on API/promise call
 *
 * @returns {function}
 */
app.directive('disableOnRequest', () => {
  return {
    scope: {
      disableOnRequest: '&'
    },
    link: (scope, element) => {
      element.bind('click', () => {
        // Disable element
        element.prop('disabled', true);
        // Wait for request to be done, then enable element
        scope.disableOnRequest()['$promise'].finally(() => {
          element.prop('disabled', false);
        })
      });
    }
  };
});
