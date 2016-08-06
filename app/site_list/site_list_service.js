/*global angular*/
'use strict';

function SiteListService($http, $window, ENV) {

  // Get sites
  function get() {
    return json.Parse($window.sites);
  }

  return {
    get: get,
  }
}

app.factory('SiteListService', SiteListService);
SiteListService.$inject = ['$http', '$window', 'ENV'];
