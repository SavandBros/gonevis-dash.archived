"use strict";

import app from "../app";

function ReaderController($scope, API, Pagination, Codekit, $translate, $window, $timeout) {

  let bodyHeight;

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

    $scope.onTabChanged(isFeed, tab);
  };

  /**
   * @desc Call API when tab changed.
   *
   * @param {boolean} isFeed
   * @param {object} tab
   */
  $scope.onTabChanged = (isFeed, tab) => {
    let currentView = isFeed ? "Feed" : "Explore";

    API[currentView].get({},
      function (data) {
        // Check current tab before storing data.
        if ($scope.currentTab !== tab) {
          return;
        }
        $scope.explore = data.results;
        $scope.loading = false;
        $scope.pageForm = Pagination.paginate($scope.pageForm, data, {});
        $scope.updateHeight();
      }
    );
  };

  /**
   * @desc Bottom image in explore/feed.
   *
   * @param {object} post
   *
   * @returns {string}
   */
  $scope.bottomImage = function(post) {
    if (post.user.media.thumbnail_48x48) {
      return post.user.media.thumbnail_48x48;
    } else if (post.site.media.cover_image) {
      return post.site.media.cover_image.thumbnail_48x48;
    }

    return Codekit.getDefaultImage('tiny');
  };

  /**
   * @desc Update body height
   */
  $scope.updateHeight = () => {
    $timeout(() => bodyHeight = angular.element(document).height());
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
      $scope.updateHeight();
      $scope.coolDown = true;
      $timeout(() => $scope.coolDown = false, 500);
    }
  });

  // Infinite scroll
  angular.element($window).bind("scroll", () => {
    if ($window.scrollY >= (bodyHeight - 2000)) {
      // Check if page is requesting for API
      // Check if there is a next URL
      // Check if there is a cooldown
      if (!$scope.pageForm.page.loading && $scope.pageForm.page.next && !$scope.coolDown) {
        Pagination.loadMore($scope.pageForm);
      }
    }
  });

  constructor();
}

app.controller("ReaderController", ReaderController);
