"use strict";

import app from "../../app";
require('quill/dist/quill.snow.css');
require('../../entry/entry_edit/editor.css');

function ReaderDetailController($scope, $state, $sce, $stateParams, $timeout, $translate, $transitions, API, Codekit, $window) {
	let lastScroll;
	let header;
	let headerTopOffset;

	function constructor() {
		lastScroll = $window.pageYOffset;
		let postId = $stateParams.entryId;

		// Check param
		if (!postId) {
			return $state.go("reader.explore-feed", {view: "feed"});
		}

		// Check post's id length
		if (postId.length !== 36) return $scope.error = true;

		$scope.loading = true;

		console.log(postId)

		// API call
		API.ReaderDetail.get({ entryId: postId},
			function (data) {
				$scope.post = data;
				$scope.authorPicture = data.updated_by.media.picture ? data.updated_by.media.thumbnail_48x48 : Codekit.getDefaultImage('avatar')
				$scope.trustedContent = $sce.trustAsHtml(data.content);
				$scope.loading = false;

				$timeout(() => {
					header = angular.element(".reader-info");
					headerTopOffset = header[0].offsetTop;
				})
			},
			function () {
				$scope.error = true;
				$scope.loading = false;
			}
		);
	}

  angular.element($window).scroll(() => {
    let bottom = "-70px";

    // If user scrolled 400 pixles down.
    if ($window.scrollY >= 400) {
      let currentScroll = $window.scrollY;

      if (lastScroll > currentScroll) bottom = "0";

      angular.element(".bottom-bar").css({'bottom': bottom});
      lastScroll = currentScroll;
    }

    if (($window.pageYOffset + 60) > headerTopOffset) {
      header.addClass("sticky");
    } else {
      header.removeClass("sticky");
    }

    angular.element(".reader-cover").css({'background-position': 'center calc(50% + ' + (0 - $window.scrollY / 2) + 'px)'});
  });

	constructor();
}

app.controller("ReaderDetailController", ReaderDetailController);
