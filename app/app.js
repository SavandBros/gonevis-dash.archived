'use strict';

/**
 * @ngdoc overview
 * @name gonevisDash
 * @description
 * # gonevisDash
 *
 * Main module of the application.
 */
app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
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
        .state('user', {
            url: '/user',
            controller: 'UserController',
            templateUrl: 'user/user_view.html'
        });
    $urlRouterProvider.otherwise('/');
});

app.run(function (editableOptions) {
    editableOptions.theme = 'bs3';
});
