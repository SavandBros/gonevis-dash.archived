/*global angular*/
'use strict';

function CommentListService($http, $window, ENV) {

  /**
   * get
   *
   * @method get
   * @desc an API call for getting site comments
   * 
   * @param get {object}
   */
  function get() {
    return $http.get(ENV.apiEndpoint + 'sushial/comments/1/');
  }

  return {
    get: get,
  }
}

app.factory('CommentListService', CommentListService);
CommentListService.$inject = ['$http', '$window', 'ENV'];
