/*global angular*/
'use strict';

function DolphinService($http, $window, ENV) {

  /**
   * get
   *
   * @method get
   * @desc an API call for getting files
   * 
   * @param site {string}
   */
  function get(site) {
    return $http.get(ENV.apiEndpoint + 'dolphin/' + site + '/file/');
  }  

  function post(file) {
    return $http.post(ENV.apiEndpoint + 'dolphin/' + file.site + '/file/', file);
  }

  return {
    get: get,
    post: post
  }
}

app.factory('DolphinService', DolphinService);
DolphinService.$inject = ['$http', '$window', 'ENV'];
