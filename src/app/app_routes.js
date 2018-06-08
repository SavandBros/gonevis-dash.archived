"use strict";

import app from "./app";

/**
 * @desc Every child of dash state follows site id that user is into.
 *       States with s param don't require site index, so it is given to it for later navigation.
 */
app.config(function($stateProvider, $urlRouterProvider) {
  // Other states that are not a child of dash state
  $stateProvider
    .state("start", {
      url: "/",
      controller: "StartController",
      template: require("./start/start_view.html"),
      auth: false,
      title: "Get Started"
    })
    .state("site-new", {
      url: "/new-site?site",
      controller: "SiteNewController",
      template: require("./site/site_new/site_new_view.html"),
      auth: true,
      title: "New Site",
      params: {
        s: 0
      }
    })
    .state("user", {
      url: "/user",
      controller: "UserController",
      template: require("./account/user/user_view.html"),
      auth: true,
      title: "Account",
      params: {
        s: 0
      }
    })
    .state("action", {
      url: "/actions/:action/:actionParam",
      controller: "ActionsController",
    })
    .state("change-password", {
      url: "/change-password",
      controller: "ChangePassController",
      template: require("./account/change_pass/change_pass_view.html"),
      auth: true,
      title: "Change Password",
      params: {
        s: 0
      }
    })
    .state("signin", {
      url: "/login/:action",
      controller: "SigninController",
      template: require("./account/signin/signin_view.html"),
      auth: false,
      title: "Login",
      params: {
        action: null
      }
    })
    .state("signup", {
      url: "/register?username",
      controller: "SignupController",
      template: require("./account/signup/signup_view.html"),
      auth: false,
      title: "Register"
    })
    // Same as Signup but different url
    .state("collaborate", {
      url: "/start-collaborating/:token",
      controller: "SignupController",
      template: require("./account/signup/signup_view.html"),
      auth: false,
      title: "Start Collaborating",
      params: {
        token: null
      }
    })
    .state("reset-pass", {
      url: "/reset-password/:token",
      controller: "ResetPassController",
      template: require("./account/reset_pass/reset_pass_view.html"),
      auth: -1,
      title: "Reset password",
      params: {
        s: 0,
        token: null
      }
    })
    .state("email-confirmation", {
      url: "/email-verification/:token",
      controller: "EmailConfirmationController",
      template: require("./account/email_confirmation/email_confirmation_view.html"),
      auth: -1,
      title: "Email Verification",
      params: {
        s: 0,
        token: null
      }
    });

  // Dash states that require authentication and site index
  $stateProvider
    .state("dash", {
      url: "/:s",
      abstract: true,
      template: "<ui-view/>",
      auth: true,
      params: {
        s: null
      }
    })
    .state("dash.main", {
      url: "/",
      controller: "MainController",
      template: require("./main/main_view.html"),
      auth: true,
    })
    .state("dash.navigation", {
      url: "/navigation",
      controller: "NavigationController",
      template: require("./navigation/navigation_view.html"),
      auth: true,
      title: "Navigations",
      params: {
        add: null
      }
    })
    .state("dash.dolphin", {
      url: "/files",
      controller: "DolphinController",
      template: require("./dolphin/dolphin_view.html"),
      auth: true,
      title: "Dolphin",
      resolve: {
        // Used to determine source of selection
        source: function() {
          return null;
        }
      }
    })
    .state("dash.comment-list", {
      url: "/comments",
      controller: "CommentController",
      template: require("./comment/comment_view.html"),
      auth: true,
      title: "Comments"
    })
    .state("dash.entry-edit", {
      url: "/write/:entryId",
      controller: "EntryEditController",
      template: require("./entry/entry_edit/entry_edit_view.html"),
      auth: true,
      clickEvent: true,
      editor: true,
      params: {
        entryId: null,
        lights: true,
        isPage: false
      },
      title: "Nevis"
    })
    .state("dash.entry-list", {
      url: "/posts",
      controller: "EntryController",
      template: require("./entry/entry_view.html"),
      auth: true,
      title: "Posts"
    })
    .state("dash.page-list", {
      url: "/pages",
      controller: "EntryController",
      template: require("./entry/entry_view.html"),
      auth: true,
      title: "Pages"
    })
    .state("dash.site", {
      url: "/site",
      controller: "SiteController",
      template: require("./site/site_view.html"),
      auth: true
    })
    // .state("dash.tag-edit", {
    //   url: "/tag-list/:tagId",
    //   controller: "TagEditController",
    //   template: require("./tag/tag_edit/tag_edit_view.html"),
    //   auth: true,
    //   params: {
    //     tagId: null
    //   }
    // })
    .state("dash.tag-list", {
      url: "/tags",
      controller: "TagController",
      template: require("./tag/tag_view.html"),
      auth: true,
      title: "Tags"
    })
    .state("dash.team", {
      url: "/team",
      controller: "TeamController",
      template: require("./team/team_view.html"),
      auth: true,
      title: "Team"
    });

  $urlRouterProvider.otherwise(function($injector) {
    var state = $injector.get("$state");
    var AuthService = $injector.get("AuthService");

    if (AuthService.isAuthenticated()) {
      state.go("dash.main", {
        s: 0
      });
    } else {
      state.go("start");
    }
  });
});
