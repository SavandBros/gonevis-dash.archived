function EntryService($rootScope) {
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
