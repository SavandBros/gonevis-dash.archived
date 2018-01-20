"use strict";

function API($resource, ENV) {
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
      name: "SignupAccount",
      endpoint: "account/register-account-only/"
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
    }, {
      name: "EmailConfirmation",
      endpoint: "account/email-confirmation/:token/" // GET
    }, {
      name: "EmailConfirmationResend",
      endpoint: "account/resend-email-confirmation/" // GET
    }, {
      name: "AccountRefresh",
      endpoint: "account/refresh/" // POST
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
    }, {
      name: "EntryMetrics",
      endpoint: "website/entry/:entry_id/metrics/" // GET
    }, {
      name: "UploadUrl",
      endpoint: "website/site/:siteId/upload-url/" // POST
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
      endpoint: "website/site/:siteId/" // GET, PUT
    }, {
      name: "SiteSettings",
      endpoint: "website/site/:siteId/settings/" // GET
    }, {
      name: "SiteMetrics",
      endpoint: "website/site/:siteId/metrics/" // GET
    }, {
      name: "SiteTemplatesPublic",
      endpoint: "website/templates/" // GET
    }, {
      name: "SiteTemplateConfig",
      endpoint: "website/site/:siteId/template-config/" // GET
    }, {
      name: "SetSiteTemplateConfig",
      endpoint: "website/site/:siteId/set-template-config/" // PUT
    }, {
      name: "SiteTemplates",
      endpoint: "website/site/:siteId/templates/" // GET
    }, {
      name: "SiteSetTemplate",
      endpoint: "website/site/:siteId/set-template/" // PUT
    }, {
      name: "SetCustomDomain",
      endpoint: "website/site/:siteId/set-custom-domain/" // PUT
    }, {
      name: "SiteUpdate",
      endpoint: "website/site/:siteId/update-settings/" // GET, PUT
    }, {
      name: "Navigation",
      endpoint: "website/site/:siteId/navigation/" // GET
    }, {
      name: "UpdateNavigation",
      endpoint: "website/site/:siteId/update-navigation/" // GET, PUT
    }, {
      name: "Team",
      endpoint: "website/site/:siteId/team/" // GET
    }, {
      name: "TeamPromote",
      endpoint: "website/site/:siteId/promote-user/" // PUT
    }, {
      name: "RemoveTeam",
      endpoint: "website/site/:siteId/remove-team-member/" // PUT
    }, {
      name: "RemoveTeamPending",
      endpoint: "website/site/:siteId/remove-pending-member/" // PUT
    }, {
      name: "DomainCheck",
      endpoint: "website/domain-check/" // POST
    },
    // Tagool
    {
      name: "Tag",
      endpoint: "tagool/tag/:slug/" // GET, PUT
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
      endpoint: "dolphin/file/:fileId/" // GET, POST
    }
  ];

  function createResourceObject(attrName, endpoint) {
    apiData[attrName] = $resource(endpoint, {}, {
      put: {
        method: "PUT"
      },
      post: {
        method: "POST"
      },
      patch: {
        method: "PATCH"
      }
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
  "$resource",
  "ENV"
];
