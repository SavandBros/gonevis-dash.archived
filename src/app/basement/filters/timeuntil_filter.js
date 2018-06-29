"use strict";

import app from '../../app';

function TimeUntilFilter($filter) {
  return function(date) {
    return $filter("timesince")(date, true);
  };
}

app.filter("timeuntil", TimeUntilFilter);
