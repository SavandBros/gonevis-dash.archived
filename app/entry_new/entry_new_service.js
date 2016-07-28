/*global angular*/
'use strict';

function NewEntryService($http, $window, ENV) {

    function create(post) {
        return $http.post(ENV.apiEndpoint + 'website/entry/', post);
    }

    return {
        create: create,
    }
}

app.factory('NewEntryService', NewEntryService);
NewEntryService.$inject = ['$http', '$window', 'ENV'];
