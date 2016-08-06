/*global angular*/
'use strict';

function SiteSettingsService($http, $window, ENV) {

    // Api call for getting site
    function get(site) {
        return $http.get(ENV.apiEndpoint + 'website/site/' + site + '/');
    }

    // Api call for updating site
    function update(site) {
        return $http.put(ENV.apiEndpoint + 'website/site/' + site + '/settings/');
    }

    return {
        get: get,
        update: update
    }
}

app.factory('SiteSettingsService', SiteSettingsService);
SiteSettingsService.$inject = ['$http', '$window', 'ENV'];
