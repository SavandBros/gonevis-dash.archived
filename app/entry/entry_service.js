"use strict";

/**
 * @class EntryService
 *
 * @param $rootScope
 *
 * @return [Factory]
 */
function EntryService($rootScope) {

  /**
   * @method cache
   * @desc Cache entry
   */
  function cache (entry) {
    $rootScope.cache.entry = entry;
  }

  return {
    cache: cache,
  };
}

app.factory("EntryService", EntryService);
EntryService.$inject = [
  "$rootScope"
];
