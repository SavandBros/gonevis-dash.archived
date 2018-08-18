"use strict";

import app from "../app";

function ReaderController($scope, API, $state, Pagination, Codekit, $translate, $window, $timeout, $stateParams) {

  let bodyHeight;
  let currentView;

  function constructor() {
    currentView = "feed";
    if ($stateParams.view === "explore") {
      currentView = "explore";
    }

    $scope.pageForm = {};

    $translate(["EXPLORE", "FEED"]).then(function (translations) {
      // List of tabs
      $scope.tabs = [{
        class: "feed",
        label: translations.FEED
      }, {
        class: "explore",
        label: translations.EXPLORE
      }];

      // Set current tab
      angular.forEach($scope.tabs, (tab, index) => {
        if (tab.class === currentView) {
          $scope.setCurrentTab($scope.tabs[index]);
        }
      });
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

    // Change URL
    $state.go('reader.explore-feed', { view: tab.class });

    // Set current tab
    $scope.currentTab = tab;
    $scope.loading = true;
    currentView = tab.class;

    $scope.onTabChanged(tab);
  };

  /**
   * @desc Call API when tab changed.
   *
   * @param {boolean} isFeed
   * @param {object} tab
   */
  $scope.onTabChanged = (tab) => {
    let api = currentView.charAt(0).toUpperCase() + currentView.substr(1).toLowerCase();

    API[api].get({},
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

  /**
   * @desc Infinite scroll
   */
  function infiniteScroll() {
    if ($window.scrollY >= (bodyHeight - 2000)) {
      // Check if page is requesting for API
      // Check if there is a next URL
      // Check if there is a cooldown
      if (!$scope.pageForm.page.loading && $scope.pageForm.page.next && !$scope.coolDown) {
        Pagination.loadMore($scope.pageForm);
      }
    }
  }

  // Scroll event
  angular.element($window).bind("scroll", infiniteScroll);

  /**
   * @desc Stop infinite scroll event on controller destroy.
   */
  $scope.$on('$destroy', function () {
    angular.element($window).off('scroll', infiniteScroll);
  });

  constructor();
}

app.controller("ReaderController", ReaderController);
