/*global angular*/
'use strict';

function UserSitesService($http, $window, ENV) {

    function get() {
        return $http.get(ENV.apiEndpoint + 'website/user-sites/');
    }

    return {
        get: get,
    }
}

app.factory('UserSitesService', UserSitesService);
UserSitesService.$inject = ['$http', '$window', 'ENV'];
