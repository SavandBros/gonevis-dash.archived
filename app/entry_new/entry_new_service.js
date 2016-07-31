/*global angular*/
'use strict';
function EntryNewService($http, $window, ENV) {

    function create(entry) {
        return $http.post(ENV.apiEndpoint + 'website/entry/', entry);
    }

    return {
        create: create,
    }
}

app.factory('EntryNewService', EntryNewService);
EntryNewService.$inject = ['$http', '$window', 'ENV'];
