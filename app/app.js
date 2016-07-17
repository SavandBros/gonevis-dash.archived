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
        .state('new-post', {
            url: '/post',
            controller: 'NewPostController',
            templateUrl: 'new_post/new_post_view.html'
        })
        .state('signin', {
            url: '/login',
            controller: 'SigninController',
            templateUrl: 'signin/signin_view.html'
        });
    $urlRouterProvider.otherwise('/');
});
