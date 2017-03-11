"use strict";

/**
 * @class EntryService
 *
 * @param $rootScope
 * @param API
 * @param Codekit
 *
 * @return [Factory]
 */
function EntryService($rootScope, API, Codekit) {

  /**
   * @method cache
   * @desc Cache entry
   */
  function cache(entry) {
    $rootScope.cache.entry = entry;
  }

  function setProperty(entry, key, value) {
    var payload = {};
    payload[key] = value;

    API.Entry.patch({ entry_id: entry.id }, payload,
      function() {
        entry[key] = value;
        entry.isSelected = true;
      }
    );
  }

  /**
   * @method getEntryUrl
   * @desc Add draft parameters if entry is draft
   */
  function getEntryUrl(entry) {
    var params = "";

    if (entry.status === Codekit.entryStatuses[0].id) {
      params = "?view=preview";
    }

    return entry.absolute_uri + params;
  }

  return {
    cache: cache,
    setProperty: setProperty,
    getEntryUrl: getEntryUrl
  };
}

app.factory("EntryService", EntryService);
EntryService.$inject = [
  "$rootScope",
  "API",
  "Codekit"
];