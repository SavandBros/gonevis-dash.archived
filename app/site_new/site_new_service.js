/*global angular*/
'use strict';

function SiteNewService($http, $window, ENV) {

    function post(post) {
        return $http.post(ENV.apiEndpoint + 'website/site/', post);
    }

    return {
        post: post,
    }
}

app.factory('SiteNewService', SiteNewService);
SiteNewService.$inject = ['$http', '$window', 'ENV'];
