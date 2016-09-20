"use strict";

/**
 * @ngdoc function
 * @name gonevisDash.controller:TagController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $mdToast
 * @param API
 * @param AuthService
 */
function TagController($scope, $rootScope, $state, $mdToast, TagService, API, AuthService) {

  var site = AuthService.getCurrentSite();

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.user = AuthService.getAuthenticatedUser();
    $scope.tagService = TagService;
    $scope.nothing = {
      text: "It's lonely here... Try adding some tags!"
    };

    API.Tags.get({ site: site },
      function (data) {
        $scope.tags = data.results;
      }
    );
  }

  /**
   * create
   *
   * @method create
   * @desc Create a new tag
   *
   * @param form {object}
   */
  $scope.create = function (form) {
    form.loading = true;
    form.errors = null;

    form.data.slug = form.data.slug || "";

    API.Tags.save({ site: site }, form.data,
      function (data) {
        form.loading = false;
        form.data = null;
        $scope.tags.unshift(data);
        $mdToast.showSimple("Tag " + data.name + " created.");
      },
      function (data) {
        form.loading = false;
        form.data = null;
        form.errors = data.data;
        $mdToast.showSimple("Tag creaton failed.");
      }
    );
  };

  $rootScope.$on("gonevisDash.TagService:remove", function (event, data) {
    for (var i = 0; i < $scope.tags.length; i++) {
      if ($scope.tags[i].id === data.id) {
        $scope.tags[i].isDeleted = true;
      }
    }
  });

  $rootScope.$on("gonevisDash.TagService:create", function (event, data) {
    var tag = data.tag;
    tag.slug = data.data.slug;
    tag.site = data.data.site;
    $scope.tags.unshift(tag);
  });

  constructor();
}

app.controller("TagController", TagController);
TagController.$inject = [
  "$scope",
  "$rootScope",
  "$state",
  "$mdToast",
  "TagService",
  "API",
  "AuthService"
];
