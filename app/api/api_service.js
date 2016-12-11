"use strict";

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
      name: "Signin",
      endpoint: "account/login/" // POST
    }, {
      name: "Signup",
      endpoint: "account/register/"
    }, {
      name: "Profile",
      endpoint: "profile/"
    }, {
      name: "User",
      endpoint: "account/users/:user_id/" // GET
    }, {
      name: "UserUpdate",
      endpoint: "account/update-profile/" // PUT
    }, {
      name: "ForgotPassword",
      endpoint: "account/forgot-password/" // POST
    }, {
      name: "ChangePassword",
      endpoint: "account/change-password/" // POST
    }, {
      name: "ResetPassword",
      endpoint: "account/password-reset/" // POST
    },
    // Entry
    {
      name: "Entry",
      endpoint: "website/entry/:entry_id/" // GET, PUT, DELETE
    }, {
      name: "EntryAdd",
      endpoint: "website/entry/" // POST
    }, {
      name: "Entries",
      endpoint: "website/entry/" // GET
    },
    // Sushial
    {
      name: "Comment",
      endpoint: "sushial/comment/:comment_id/" // GET, PUT, DELETE
    }, {
      name: "Comments",
      endpoint: "sushial/comment/" // GET
    },
    // Site
    {
      name: "SiteNew",
      endpoint: "website/site/" // POST
    }, {
      name: "Site",
      endpoint: "website/site/:site_id/" // GET, PUT
    }, {
      name: "SiteMetrics",
      endpoint: "website/site/:site_id/metrics/" // GET
    }, {
      name: "SiteTemplateConfig",
      endpoint: "website/site/:site_id/template-config/" // GET
    }, {
      name: "SetSiteTemplateConfig",
      endpoint: "website/site/:site_id/set-template-config/" // PUT
    }, {
      name: "SiteUpdate",
      endpoint: "website/site/:site_id/update-settings/" // GET, PUT
    }, {
      name: "Navigation",
      endpoint: "website/site/:site_id/navigation/" // GET
    }, {
      name: "UpdateNavigation",
      endpoint: "website/site/:site_id/update-navigation/" // GET, PUT
    }, {
      name: "Team",
      endpoint: "website/site/:site_id/team/" // GET
    }, {
      name: "TeamInvite",
      endpoint: "website/site/:site_id/promote-user/" // PUT
    }, {
      name: "RemoveTeam",
      endpoint: "website/site/:site_id/remove-team-member/" // PUT
    }, {
      name: "RemoveTeamPending",
      endpoint: "website/site/:site_id/remove-pending-member/" // PUT
    },
    // Tagool
    {
      name: "Tag",
      endpoint: "tagool/tag/:tag_id/" // GET, PUT
    }, {
      name: "Tags",
      endpoint: "tagool/tag/" // GET, POST
    },
    // Dolphin
    {
      name: "Dolphins",
      endpoint: "dolphin/file/" // GET, POST
    }, {
      name: "Dolphin",
      endpoint: "dolphin/file/:file_id/" // GET, PUT, DELETE
    }
  ];

  function createResourceObject(attrName, endpoint) {
    apiData[attrName] = $resource(endpoint, {}, {
      put: { method: "PUT" },
      post: { method: "POST" }
    });
  }

  function setAPIData() {
    for (var i in endpoints) {
      createResourceObject(endpoints[i].name, BASE_API + endpoints[i].endpoint);
    }
  }

  setAPIData();
  return apiData;
}

app.service("API", API);
API.$inject = [
  "$http",
  "$resource",
  "ENV"
];
