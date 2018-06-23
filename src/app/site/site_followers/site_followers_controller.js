"use strict";

import app from "../../app";

function SiteFollowersController($scope, API, AuthService, Account, Pagination) {

  function constructor() {
    $scope.pageForm = {};
    $scope.followers = [];

    var payload = {
      siteId: AuthService.getCurrentSite(),
    };
    API.SiteFollowers.get(payload,
      function (data) {
        angular.forEach(data.results, function(follower) {
          $scope.followers.push(new Account(follower));
        });

        $scope.followers.count = data.count;
        $scope.initialled = true;
        $scope.pageForm = Pagination.paginate($scope.pageForm, data, payload);
      }
    );
  }

  /**
   * @desc Load more callback
   *
   * @param {Event} event
   * @param {object} data
   */
  $scope.$on("gonevisDash.Pagination:loadedMore", function(event, data) {
    if (data.success) {
      $scope.pageForm.page = data.page;
      angular.forEach(data.data.results, function(data) {
        $scope.followers.push(new Account(data));
      });
    }
  });

  constructor();
}

app.controller("SiteFollowersController", SiteFollowersController);
