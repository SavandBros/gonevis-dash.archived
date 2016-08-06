/*global angular*/
'use strict';

function TagEditService($http, $window, ENV) {

  /**
   * get
   *
   * @method get
   * @desc an API call for getting tags
   * 
   * @param tag {object}
   */
  function get(tag) {
    return $http.get(ENV.apiEndpoint + 'tagool/' + tag.site + '/tag/' + tag.id + '/');
  }

  /**
   * put
   *
   * @method put
   * @desc an API call for updating tags
   * 
   * @param put {object}
   */
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
