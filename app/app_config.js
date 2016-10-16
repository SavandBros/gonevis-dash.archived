"use strict";

 var app = angular.module('gonevisDash', ['ngMaterial', 'ngAnimate', 'ui.router', 'ngAnimate', 'ngCookies', 'ngMessages', 'ngResource', 'ngSanitize', 'gettext', 'xeditable', 'textAngular', 'angularModalService', 'ngTagsInput', 'ngFileUpload', 'slugifier', 'angular-sortable-view'])

.constant('ENV', {googleAnalyticsID:'UA-XXXXXXX-X',name:'development',apiEndpoint:'http://127.0.0.1:8000/api/v1/'})

;