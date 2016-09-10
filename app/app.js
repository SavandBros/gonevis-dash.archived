'use strict'

/**
 * @ngdoc overview
 * @name gonevisDash
 * @description
 * # gonevisDash
 *
 * Main module of the application.
 */
app.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, $resourceProvider) {
  $httpProvider.interceptors.push('AuthenticationInterceptorService')

  $stateProvider
    // Every child of dash state follows site id that user is into
    .state('dash', {
      url: '/:s',
      abstract: true,
      controller: 'DashController',
      template: '<ui-view/>'
    })
    .state('dash.main', {
      url: '/',
      controller: 'MainController',
      templateUrl: 'main/main_view.html'
    })
    .state('dash.navigation', {
      url: '/navigation',
      controller: 'NavigationController',
      templateUrl: 'navigation/navigation_view.html'
    })
    .state('dash.dolphin', {
      url: '/dolphin',
      controller: 'DolphinListController',
      templateUrl: 'dolphin_list/dolphin_list_view.html'
    })
    .state('dash.comment-list', {
      url: '/comment-list',
      controller: 'CommentListController',
      templateUrl: 'comment_list/comment_list_view.html'
    })
    .state('dash.entry-new', {
      url: '/new',
      controller: 'EntryNewController',
      templateUrl: 'entry_new/entry_new_view.html'
    })
    .state('dash.entry-list', {
      url: '/entries',
      controller: 'EntryListController',
      templateUrl: 'entry_list/entry_list_view.html'
    })
    .state('dash.entry-edit', {
      url: '/entry/:entryId',
      controller: 'EntryEditController',
      templateUrl: 'entry_edit/entry_edit_view.html'
    })
    .state('dash.site-new', {
      url: '/site-create',
      controller: 'SiteNewController',
      templateUrl: 'site_new/site_new_view.html'
    })
    .state('dash.site-settings', {
      url: '/site-settings',
      controller: 'SiteSettingsController',
      templateUrl: 'site_settings/site_settings_view.html'
    })
    .state('dash.tag-edit', {
      url: '/tag-list/:tagId',
      controller: 'TagEditController',
      templateUrl: 'tag_edit/tag_edit_view.html'
    })
    .state('dash.tag-list', {
      url: '/tag-list',
      controller: 'TagListController',
      templateUrl: 'tag_list/tag_list_view.html'
    })
    .state('dash.tag-new', {
      url: '/tag-new',
      controller: 'TagNewController',
      templateUrl: 'tag_new/tag_new_view.html'
    })
    .state('dash.user', {
      url: '/user',
      controller: 'UserController',
      templateUrl: 'user/user_view.html'
    })
    .state('dash.change-password', {
      url: '/change-password',
      controller: 'ChangePasswordController',
      templateUrl: 'change_password/change_password_view.html'
    })
    // Other states that are not a child of dash state
    .state('signin', {
      url: '/login',
      controller: 'SigninController',
      templateUrl: 'signin/signin_view.html'
    })
    .state('signup', {
      url: '/register',
      controller: 'SignupController',
      templateUrl: 'signup/signup_view.html'
    })
  $urlRouterProvider.otherwise('/')
  $resourceProvider.defaults.stripTrailingSlashes = false
})

app.run(function (editableOptions) {
  editableOptions.theme = 'bs3'
})
