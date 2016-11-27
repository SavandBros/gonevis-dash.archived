"use strict";

/**
 * @class TimeUntilFilter
 *
 * @param $filter
 *
 * @returns {Function}
 */
function TimeUntilFilter($filter) {
  return function (date) {
    return $filter("timesince")(date, true);
  }
}

app.filter("timeuntil", TimeUntilFilter);
TimeUntilFilter.$inject = [
  "$filter"
];
