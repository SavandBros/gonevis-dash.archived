'use strict';

/**
 * API Service
 *
 * @param $http
 * @param $resource
 * @param ENV
 *
 * @returns {{Service: API.service}}
 */
function API($http, $resource, ENV) {

  var BASE_API = ENV.apiEndpoint;
  var apiData = {};

  var endpoints = [{
    "name": "Profile",
    "endpoint": "profile/"
  }, {
    "name": "Comment",
    "endpoint": "sushial/comment/:comment_id/"
  }, {
    "name": "Comments",
    "endpoint": "sushial/comments/:object_type/"
  }];

  function createResourceObject(attrName, endpoint) {
    apiData[attrName] = $resource(endpoint, {}, {
      put: { method: 'PUT' }
    });
  }

  function setAPIData() {
    for (var i in endpoints) {
      createResourceObject(endpoints[i].name, BASE_API + endpoints[i].endpoint)
    }
  }

  setAPIData();
  return apiData;
}

app.service('API', API);
API.$inject = ['$http', '$resource', 'ENV'];
