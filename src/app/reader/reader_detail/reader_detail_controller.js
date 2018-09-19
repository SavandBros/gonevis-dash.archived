"use strict";

import app from "../../app";
require('quill/dist/quill.snow.css');
require('../../entry/entry_edit/editor.css');

function ReaderDetailController($scope, $state, $sce, $stateParams, $timeout, $translate, $transitions, API, Codekit, $window) {
  let lastScroll;

  function constructor() {
    lastScroll = $window.pageYOffset;
    let postId = $stateParams.entryId;

    // Check param
    if (!postId) {
      return $state.go("reader.explore-feed", { view: "feed" });
    }

    // Check post's id length
    if (postId.length !== 36) return $scope.error = true;

    $scope.loading = true;

    // API call
    API.ReaderDetail.get({ entryId: postId },
      function (data) {
        $scope.loading = false;
        // Post data
        $scope.post = data;
        // Post logo
        $scope.siteLogo = data.site.media.logo ? data.site.media.logo.thumbnail_48x48 : Codekit.getDefaultImage('tiny');
        // Trust post content as HTML
        $scope.trustedContent = $sce.trustAsHtml(data.content);
        // Translation
        $translate(
          ["READER_DETAIL_INFO"], {
            site: { title: data.site.title, link: data.site.absolute_uri, subscribers: data.site.followers_count },
            author: { name: data.user.name, link: data.user.get_absolute_uri }
          }
        ).then(function (translations) {
          $scope.bottomInfo = translations.READER_DETAIL_INFO;
        });

        $translate(["DARK_MODE", "BRIGHT_MODE", "FULL_SCREEN", "EXIT_FULL_SCREEN"]).then(function (translations) {
          $scope.tooltips = {
            theme: {
              dark: translations.DARK_MODE,
              bright: translations.BRIGHT_MODE,
            },
            size: {
              full: translations.FULL_SCREEN,
              normal: translations.EXIT_FULL_SCREEN
            }
          };
        });

        // Scroll event
        angular.element($window).bind("scroll", onScroll);
      },
      function () {
        $scope.error = true;
        $scope.loading = false;
      }
    );
  }

  $scope.fullScreen = () => {
    $scope.full = !$scope.full;
  }

  // $scope.subscribe = function (siteId) {
  // 	console.log(siteId)

  //   API.Subscribe.save({ siteId: siteId },
  //     function (data) {
  // 			console.log(data);
  // 		}
  //   );
  // };

  /**
   * @desc Auto hide bottom bar when scrolling.
   *
   * @returns {void}
   */
  function onScroll() {
    let scrollLimit = $scope.post.media.cover_image ? 400 : 0;
    let bottom = "-70px";

    // If user scrolled 400 pixles down.
    if (!$scope.full) {
      if ($window.scrollY >= scrollLimit) {
        let currentScroll = $window.scrollY;

        if (lastScroll > currentScroll) bottom = "0";

        angular.element(".bottom-bar").css({ 'bottom': bottom });
        lastScroll = currentScroll;
      }
    }

    angular.element(".reader-cover")
      .css({ 'background-position': 'center calc(50% + ' + (0 - $window.scrollY / 2) + 'px)' });
  }

  /**
   * @desc Cancel events on state change
   */
  $scope.$on("$destroy", function () {
    angular.element($window).off('scroll', onScroll);
  });

  constructor();
}

app.controller("ReaderDetailController", ReaderDetailController);