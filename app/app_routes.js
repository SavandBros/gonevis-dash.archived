"use strict";

/**
 * @desc Every child of dash state follows site id that user is into.
 *       States with s param don't require site index, so it is given to it for later navigation.
 */
app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  // Other states that are not a child of dash state
    .state("site-new", {
      url: "/new-site",
      controller: "SiteNewController",
      templateUrl: "site/site_new/site_new_view.html",
      auth: true,
      title: "New Site",
      params: {
        s: 0
      }
    })
    .state("user", {
      url: "/user",
      controller: "UserController",
      templateUrl: "account/user/user_view.html",
      auth: true,
      title: "Account",
      params: {
        s: 0
      }
    })
    .state("signin", {
      url: "/login/:action",
      controller: "SigninController",
      templateUrl: "account/signin/signin_view.html",
      auth: false,
      title: "Login"
    })
    .state("signup", {
      url: "/register",
      controller: "SignupController",
      templateUrl: "account/signup/signup_view.html",
      auth: false,
      title: "Register"
    })
    .state("collaborate", {
      // Same as Signup but different url
      url: "/start-collaborating/:token",
      controller: "SignupController",
      templateUrl: "account/signup/signup_view.html",
      auth: false,
      title: "Start Collaborating"
    })
    .state("reset-pass", {
      url: "/reset-password/:token",
      controller: "ResetPassController",
      templateUrl: "account/reset_pass/reset_pass_view.html",
      auth: -1,
      title: "Reset password"
    })
    .state("email-confirmation", {
      url: "/email-verification/:token",
      controller: "EmailConfirmationController",
      templateUrl: "account/email_confirmation/email_confirmation_view.html",
      auth: -1,
      title: "Email Verification"
    })
    // Dash states that require authentication and site index
    .state("dash", {
      url: "/:s",
      abstract: true,
      template: "<ui-view/>",
      auth: true
    })
    .state("dash.main", {
      url: "/",
      controller: "MainController",
      templateUrl: "main/main_view.html",
      auth: true
    })
    .state("dash.navigation", {
      url: "/navigation",
      controller: "NavigationController",
      templateUrl: "navigation/navigation_view.html",
      auth: true,
      title: "Navigations",
      params: {
        add: null
      }
    })
    .state("dash.dolphin", {
      url: "/files",
      controller: "DolphinController",
      templateUrl: "dolphin/dolphin_view.html",
      auth: true,
      title: "Dolphin",
      resolve: {
        // Used to determine source of selection
        source: function () {
          return null;
        }
      }
    })
    .state("dash.comment-list", {
      url: "/comments",
      controller: "CommentController",
      templateUrl: "comment/comment_view.html",
      auth: true,
      title: "Comments"
    })
    .state("dash.entry-new", {
      url: "/new",
      controller: "EntryNewController",
      templateUrl: "entry/entry_new/entry_new_view.html",
      auth: true,
      clickEvent: true,
      params: {
        lights: true,
      },
      title: "Nevis"
    })
    .state("dash.entry-edit", {
      url: "/entry/:entryId",
      controller: "EntryEditController",
      templateUrl: "entry/entry_edit/entry_edit_view.html",
      auth: true,
      clickEvent: true,
      params: {
        lights: true,
      },
      title: "Nevis"
    })
    .state("dash.entry-list", {
      url: "/entries",
      controller: "EntryController",
      templateUrl: "entry/entry_view.html",
      auth: true,
      title: "Entries"
    })
    .state("dash.site", {
      url: "/site",
      controller: "SiteController",
      templateUrl: "site/site_view.html",
      auth: true
    })
    .state("dash.tag-edit", {
      url: "/tag-list/:tagId",
      controller: "TagEditController",
      templateUrl: "tag/tag_edit/tag_edit_view.html",
      auth: true
    })
    .state("dash.tag-list", {
      url: "/tags",
      controller: "TagController",
      templateUrl: "tag/tag_view.html",
      auth: true,
      title: "Tags"
    })
    .state("dash.change-password", {
      url: "/change-password",
      controller: "ChangePassController",
      templateUrl: "account/change_pass/change_pass_view.html",
      auth: true,
      title: "Change Password"
    })
    .state("dash.team", {
      url: "/team",
      controller: "TeamController",
      templateUrl: "team/team_view.html",
      auth: true,
      title: "Team"
    });

  $urlRouterProvider.otherwise(function ($injector) {
    var state = $injector.get("$state");
    var AuthService = $injector.get("AuthService");

    if (AuthService.isAuthenticated()) {
      state.go("dash.main", { s: 0 });
    } else {
      state.go("signin");
    }
  });
});
