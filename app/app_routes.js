"use strict";

/**
 * @desc Every child of dash state follows site id that user is into
 */
app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state("dash", {
      url: "/:s",
      abstract: true,
      controller: "DashController",
      template: "<ui-view/>",
      auth: true
    })
    .state("dash.main", {
      url: "/",
      controller: "MainController",
      templateUrl: "main/main_view.html",
      auth: true
    })
    .state("dash.site-new", {
      url: "/site-create",
      controller: "SiteNewController",
      templateUrl: "site/site_new/site_new_view.html",
      auth: true
    })
    .state("dash.navigation", {
      url: "/navigation",
      controller: "NavigationController",
      templateUrl: "navigation/navigation_view.html",
      auth: true
    })
    .state("dash.dolphin", {
      url: "/dolphin",
      controller: "DolphinController",
      templateUrl: "dolphin/dolphin_view.html",
      auth: true
    })
    .state("dash.comment-list", {
      url: "/comments",
      controller: "CommentController",
      templateUrl: "comment/comment_view.html",
      auth: true
    })
    .state("dash.entry-new", {
      url: "/new",
      controller: "EntryNewController",
      templateUrl: "entry/entry_new/entry_new_view.html",
      auth: true,
      editor: true,
      mousemoveEvent: true,
      clickEvent: true
    })
    .state("dash.entry-list", {
      url: "/entries",
      controller: "EntryController",
      templateUrl: "entry/entry_view.html",
      auth: true
    })
    .state("dash.entry-edit", {
      url: "/entry/:entryId",
      controller: "EntryEditController",
      templateUrl: "entry/entry_edit/entry_edit_view.html",
      auth: true,
      editor: true,
      mousemoveEvent: true,
      clickEvent: true
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
      auth: true
    })
    .state("dash.tag-new", {
      url: "/tag-new",
      controller: "TagNewController",
      templateUrl: "tag/tag_new/tag_new_view.html",
      auth: true
    })
    .state("dash.user", {
      url: "/user",
      controller: "UserController",
      templateUrl: "account/user/user_view.html",
      auth: true
    })
    .state("dash.change-password", {
      url: "/change-password",
      controller: "ChangePassController",
      templateUrl: "account/change_pass/change_pass_view.html",
      auth: true
    })
    .state("email-confirmation", {
      url: "/email-verification/:token",
      controller: "EmailConfirmationController",
      templateUrl: "account/email_confirmation/email_confirmation_view.html",
      auth: -1
    })
    .state("dash.team", {
      url: "/team",
      controller: "TeamController",
      templateUrl: "team/team_view.html",
      auth: true,
    })
    // Other states that are not a child of dash state
    .state("signin", {
      url: "/login",
      controller: "SigninController",
      templateUrl: "account/signin/signin_view.html",
      auth: false
    })
    .state("signup", {
      url: "/register",
      controller: "SignupController",
      templateUrl: "account/signup/signup_view.html",
      auth: false
    })
    .state("reset-pass", {
      url: "/reset-password/:token",
      controller: "ResetPassController",
      templateUrl: "account/reset_pass/reset_pass_view.html",
      auth: -1
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
