"use strict";

/**
 * @class EntryService
 *
 * @param $rootScope
 * @param API
 * 
 * @return [Factory]
 */
function EntryService($rootScope, API) {

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
      function(data) {
        entry[key] = value;
        entry.isSelected = true;
      }
    );
  }

  return {
    cache: cache,
    setProperty: setProperty
  };
}

app.factory("EntryService", EntryService);
EntryService.$inject = [
  "$rootScope",
  "API"
];