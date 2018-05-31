"use strict";

/**
 * @desc Calculate time since from given date object.
 *       3 days, 1 month, one year...
 */
function TimeSinceFilter() {
  return function(date, reversed) {
    reversed = reversed || false;

    if (typeof date == "string") date = new Date(date);

    var seconds = reversed ? Math.floor((date - new Date()) / 1000) : Math.floor((new Date() - date) / 1000);
    var INTERVALS = {
      YEAR: {
        seconds: 31536000,
        tense: "year",
        tense_plural: "years"
      },
      MONTH: {
        seconds: 2592000,
        tense: "month",
        tense_plural: "months"
      },
      DAY: {
        seconds: 86400,
        tense: "day",
        tense_plural: "days"
      },
      HOUR: {
        seconds: 3600,
        tense: "hour",
        tense_plural: "hours"
      },
      MINUTE: {
        seconds: 60,
        tense: "minute",
        tense_plural: "minutes"
      }
    };

    for (var k in INTERVALS) {
      if (!INTERVALS.hasOwnProperty(k)) continue;

      var secondsDifference = Math.floor(seconds / INTERVALS[k].seconds);
      var tense = INTERVALS[k].tense;
      var tensePrefix;

      if (secondsDifference < 1 && secondsDifference > 0) {
        tensePrefix = "less than a";

        return "tensePrefix TenseType".replace("tensePrefix", tensePrefix).replace("TenseType", tense);
      } else if (secondsDifference === 1) {
        tensePrefix = 1;

        return "tensePrefix tense".replace("tensePrefix", tensePrefix).replace("tense", tense);
      } else if (secondsDifference > 1) {
        tense = INTERVALS[k].tense_plural;
        tensePrefix = secondsDifference;

        return "tensePrefix tense".replace("tensePrefix", tensePrefix).replace("tense", tense);
      }
    }
  }
}

app.filter("timesince", TimeSinceFilter);

module.exports = TimeSinceFilter;
