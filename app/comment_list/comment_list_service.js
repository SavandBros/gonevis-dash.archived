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

  /**
   * del
   *
   * @method del
   * @desc an API call for deleting comments
   * 
   * @param del {string}
   */
  function del(commentId) {
    return $http.delete(ENV.apiEndpoint + 'sushial/comment/' + commentId + '/');
  }

  return {
    get: get,
    del: del,
  }
}

app.factory('CommentListService', CommentListService);
CommentListService.$inject = ['$http', '$window', 'ENV'];
