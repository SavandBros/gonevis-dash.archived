/*global angular*/
'use strict';

function TagListService($http, $window, ENV) {

  // Api call for comments
  function get(site) {
    return $http.get(ENV.apiEndpoint + 'tagool/' + site + '/tag/');
  }


  return {
    get: get,
  }
}

app.factory('TagListService', TagListService);
TagListService.$inject = ['$http', '$window', 'ENV'];
