/*global app*/
'use strict';


/**
 * Time Until Filter
 * @class TimeUntilFilter
 * @namespace timeuntil
 * @returns {Function}
 */
function TimeUntilFilter($filter) {
  return function(date) {
    return $filter('timesince')(date, true);
  }
}

app.filter('timeuntil', TimeUntilFilter);
TimeUntilFilter.$inject = ['$filter'];