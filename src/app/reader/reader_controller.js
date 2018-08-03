"use strict";

import app from "../app";

function ReaderController($scope, API, Pagination, Codekit, $translate) {

  function constructor() {
    $scope.pageForm = {};

    $translate(["EXPLORE", "FEED"]).then(function (translations) {
      // List of tabs
      $scope.tabs = [{
        class: "first",
        icon: "search",
        label: translations.EXPLORE
      }, {
        class: "second",
        icon: "smile-o",
        label: translations.FEED
      }];

      // Set current tab
      $scope.setCurrentTab($scope.tabs[0]);
    });
  }

  /**
   * @desc Set current tab
   *
   * @param {object} tab
   */
  $scope.setCurrentTab = function(tab) {
    // Check current tab
    if ($scope.currentTab === tab) {
      return;
    }

    // Set current tab
    $scope.currentTab = tab;
    $scope.loading = true;
    let isFeed = tab.class !== "first";

    $scope.onTabChanged(isFeed);
  };

  /**
   * @desc Call API when tab changed.
   *
   * @param {boolean} isFeed
   */
  $scope.onTabChanged = (isFeed) => {
    let currentView = isFeed ? "Feed" : "Explore";

    API[currentView].get({},
      function (data) {
        $scope.explore = data.results;
        $scope.loading = false;
        $scope.pageForm = Pagination.paginate($scope.pageForm, data, {});
      }
    );
  };

  $scope.bottomImage = function(post) {
    if (post.user.media.thumbnail_48x48) {
      return post.user.media.thumbnail_48x48;
    } else if (post.site.media.cover_image) {
      return post.site.media.cover_image.thumbnail_48x48;
    }

    return Codekit.getDefaultImage('tiny');
  };

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
        $scope.explore.push(data);
      });
    }
  });

  constructor();
}

app.controller("ReaderController", ReaderController);
