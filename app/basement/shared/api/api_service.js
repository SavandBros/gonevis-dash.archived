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

  var endpoints = [

    // Account
    {
      "name": "Profile",
      "endpoint": "profile/"
    }, {
      "name": "User",
      "endpoint": "account/users/:user_id/" // GET, OPTIONS
    }, {
      "name": "UserUpdate",
      "endpoint": "account/update-profile/" // PUT, OPTIONS
    }, {
      "name": "PasswordReset",
      "endpoint": "account/password-reset/" // POST, OPTIONS
    }, {
      "name": "ChangePassword",
      "endpoint": "account/change-password/" // POST, OPTIONS
    },

    // Entry
    {
      "name": "Entry",
      'endpoint': "website/entry/:entry_id/" // GET, PUT, PATCH, DELETE, OPTIONS
    }, {
      "name": "EntryAdd",
      "endpoint": "website/entry/" // POST, OPTIONS
    }, {
      "name": "Entries",
      "endpoint": "website/site/:site_id/entries/" // GET, OPTIONS
    },

    // Sushial
    {
      "name": "Comment",
      "endpoint": "sushial/comment/:comment_id/" // GET, PUT, PATCH, DELETE, OPTIONS
    }, {
      "name": "Comments",
      "endpoint": "sushial/comments/:site_id/:object_type/" // GET, OPTIONS
    },

    // Site
    {
      "name": "SiteNew",
      "endpoint": "website/site/" // POST, OPTIONS
    }, {
      "name": "Site",
      "endpoint": "website/site/:site_id/" // GET, PUT, PATCH, OPTIONS
    }, {
      "name": "SiteUpdate",
      "endpoint": "website/site/:site_id/settings/" // GET, PUT, PATCH, OPTIONS
    }, {
      "name": "Navigation",
      "endpoint": "website/site/:site_id/navigation/" // GET, PUT, PATCH, OPTIONS
    },

    // Tagool
    {
      "name": "Tag",
      "endpoint": "tagool/:tag_site/tag/:tag_id/" // GET, PUT, PATCH, OPTIONS
    }, {
      "name": "Tags",
      "endpoint": "tagool/:tag_site/tag/" // GET, POST, OPTIONS 
    },


    // Dolphin
    {
      "name": "Dolphins",
      "endpoint": "dolphin/file/" // GET, POST, OPTIONS
    }, {
      "name": "Dolphin",
      "endpoint": "dolphin/file/:file_id/" // GET, PUT, PATCH, DELETE, OPTIONS
    },
  ];

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
