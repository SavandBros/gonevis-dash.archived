'use strict';

/**
 * @ngdoc overview
 * @name gonevisDash
 * @description
 * # gonevisDash
 *
 * Main module of the application.
 */
app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.interceptors.push('AuthenticationInterceptorService');

    $stateProvider
        .state('main', {
            url: '/',
            controller: 'MainController',
            templateUrl: 'main/main_view.html'
        })
        .state('entry-new', {
            url: '/new',
            controller: 'EntryNewController',
            templateUrl: 'entry_new/entry_new_view.html'
        })
        .state('entry-list', {
            url: '/site/:siteId',
            controller: 'EntryListController',
            templateUrl: 'entry_list/entry_list.html'
        })
        .state('entry-edit', {
            url: '/site/:siteId/:entryId',
            controller: 'EntryEditController',
            templateUrl: 'entry_edit/entry_edit_view.html'
        })
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
        .state('sites', {
            url: '/site',
            controller: 'SitesController',
            templateUrl: 'sites/sites.html'
        })
        .state('user', {
            url: '/user',
            controller: 'UserController',
            templateUrl: 'user/user_view.html'
        });
    $urlRouterProvider.otherwise('/');
});

app.run(function(editableOptions) {
    editableOptions.theme = 'bs3';
});
