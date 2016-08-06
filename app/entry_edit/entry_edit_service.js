/*global angular*/
'use strict';

function EntryEditService($http, $window, ENV) {

    // Api call for getting entry
    function get(entryId) {
        return $http.get(ENV.apiEndpoint + 'website/entry/' + entryId + '/');
    }

    // Api call for deleting entry
    function del(entryId) {
        return $http.delete(ENV.apiEndpoint + 'website/entry/' + entryId + '/');
    }
    
    // Api call for updating entry
    function put(entry) {
        return $http.put(ENV.apiEndpoint + 'website/entry/' + entry.id + '/', entry);
    }

    return {
        get: get,
        del: del,
        put: put,
    }
}

app.factory('EntryEditService', EntryEditService);
EntryEditService.$inject = ['$http', '$window', 'ENV'];
