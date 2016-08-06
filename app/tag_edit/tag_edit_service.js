/*global angular*/
'use strict';

function TagEditService($http, $window, ENV) {

  // Api call for getting tags
  function get(tag) {
    return $http.get(ENV.apiEndpoint + 'tagool/' + tag.site + '/tag/' + tag.id + '/');
  }

  // Api call for updating tags
  function put(tag) {
    return $http.put(ENV.apiEndpoint + 'tagool/' + tag.site + '/tag/' + tag.id + '/', tag);
  }

  return {
    get: get,
    put: put,
  }
}

app.factory('TagEditService', TagEditService);
TagEditService.$inject = ['$http', '$window', 'ENV'];
