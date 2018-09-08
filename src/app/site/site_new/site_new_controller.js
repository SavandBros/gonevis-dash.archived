"use strict";

import app from "../../app";

function SiteNewController($scope, $rootScope, $state, $stateParams, API, AuthService, toaster, $translate) {

  function constructor() {
    $scope.user = AuthService.getAuthenticatedUser(false);

    // Get site from param
    if ($stateParams.site) {
      var name = $stateParams.site.split(".")[0];
      if (name.length >= 3) {
        $scope.form = {
          url: name
        };
      }
    }
  }

  /**
   * @desc create site via api call
   *
   * @param {object} form
   */
  $scope.createSite = function(form) {
    form.loading = true;

    API.SiteNew.save(form,
      function(data) {
        form.loading = false;
        $scope.user.sites.unshift(data);
        AuthService.setAuthenticatedUser($scope.user);
        $rootScope.$broadcast("gonevisDash.SiteNewController:Create");

        $translate(["AWESOME", "BLOG_CREATED"], {"title": data.title}).then(function(translations) {
          toaster.success(translations.AWESOME, translations.BLOG_CREATED);
        });
        $state.go("dash.main", {
          s: 0
        });
      },
      function(data) {
        form.errors = data.data;
        form.loading = false;
      }
    );
  };

  constructor();
}

app.controller("SiteNewController", SiteNewController);
