/*global angular*/
'use strict'

function EntryEditService ($http, $window, ENV) {

  // Api call for getting entry
  function get (entryId) {
    return $http.get(ENV.apiEndpoint + 'website/entry/' + entryId + '/')
  }

  // Api call for deleting entry
  function del (entryId) {
    return $http.delete(ENV.apiEndpoint + 'website/entry/' + entryId + '/')
  }

  // Api call for updating entry
  function put (entry) {
    return $http.put(ENV.apiEndpoint + 'website/entry/' + entry.id + '/', entry)
  }
  // search        
  function search (site, query) {
    return $http.get(ENV.apiEndpoint + 'tagool/' + site + '/search/', { q: query })
  }

  // Api call for adding tag
  function add (site) {
    return $http.put(ENV.apiEndpoint + 'tagool/' + site + '/', site)
  }

  return {
    get: get,
    del: del,
    put: put,
    search: search,
    add: add
  }
}

app.factory('EntryEditService', EntryEditService)
EntryEditService.$inject = ['$http', '$window', 'ENV']
