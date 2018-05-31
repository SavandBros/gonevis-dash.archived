"use strict";

var app = require("../../app_module");


function TimeUntilFilter($filter) {
  return function(date) {
    return $filter("timesince")(date, true);
  }
}

app.filter("timeuntil", TimeUntilFilter);
TimeUntilFilter.$inject = [
  "$filter"
];

module.exports = TimeUntilFilter;
