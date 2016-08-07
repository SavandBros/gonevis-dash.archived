/*global angular*/
'use strict';

function TagNewService($http, $window, ENV) {

  /**
   * post
   *
   * @method post
   * @desc an API call for creating new tags
   * 
   * @param post {object}
   */
  function post(tag) {
    return $http.post(ENV.apiEndpoint + 'tagool/' + tag.site + '/tag/', tag);
  }

  return {
    post: post,
  }
}

app.factory('TagNewService', TagNewService);
TagNewService.$inject = ['$http', '$window', 'ENV'];
