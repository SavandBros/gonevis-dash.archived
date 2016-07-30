/*global angular*/
'use strict';

/**
 * Settings Service
 *
 * @class SettingsService
 * @param $http
 * @param ENV
 * @namespace tiwun.account.services.UserService
 */
function UserService($http, ENV) {
    /**
     * Gets the account with username `username`
     */
    function get(userId) {
        return $http.get(ENV.apiEndpoint + 'account/users/' + userId + '/');
    }

    /**
     * Update the account with username `username`
     */
    function update(user) {
        return $http.put(ENV.apiEndpoint + 'account/update-profile/', user);
    }

    return {
        get: get,
        update: update
    };
}


app.factory('UserService', UserService);
UserService.$inject = ['$http', 'ENV'];
