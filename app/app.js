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
        })
        .state('signup', {
          url:'/register',
          controller: 'SignupController',
          templateUrl: 'signup/signup_view.html'
        })
        .state('settings', {
          url: '/settings',
          controller: 'SettingsController',
          templateUrl: 'settings/settings.html'
        })
        .state('profile', {
          url: '/profile',
          controller: 'UserProfileController',
          templateUrl: 'user_profile/user_profile.html'
        });
    $urlRouterProvider.otherwise('/');
});
