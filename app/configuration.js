"use strict";

 var app = angular.module("gonevisDash", ["ngMaterial", "ngAnimate", "ui.router", "ngAnimate", "ngCookies", "ngMessages", "ngResource", "ngSanitize", "gettext", "xeditable", "textAngular", "angularModalService", "ngTagsInput", "ngFileUpload", "slugifier", "angular-sortable-view"])

.constant("ENV", {googleAnalyticsID:"UA-XXXXXXX-X",name:"staging",apiEndpoint:"http://draft.gonevis.com/api/v1/"})

;