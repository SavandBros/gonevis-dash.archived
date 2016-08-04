/*global angular*/
'use strict';

function EntryListService($http, $window, ENV) {

    // Api call for getting site entries
    function get(s) {
        return $http.get(ENV.apiEndpoint + 'website/site/' + s + '/entries/');
    }

    // Api call for deleting entry
    function del(entryId) {
        return $http.delete(ENV.apiEndpoint + 'website/entry/' + entryId + '/');
    }

    return {
        get: get,
        del: del
    }
}

app.factory('EntryListService', EntryListService);
EntryListService.$inject = ['$http', '$window', 'ENV'];
