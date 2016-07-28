/*global angular*/
'use strict';

function EntriesService($http, $window, ENV) {

    function get(siteId) {
        return $http.get(ENV.apiEndpoint + 'website/site/' + siteId + '/entries/');
    }

    function del(entryId) {
        return $http.delete(ENV.apiEndpoint + 'website/entry/' + entryId + '/');
    }

    return {
        get: get,
        del: del
    }
}

app.factory('EntriesService', EntriesService);
EntriesService.$inject = ['$http', '$window', 'ENV'];
