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
 * @param Pagination
 */
function TagController($scope, $rootScope, $state, $mdToast, TagService, API, AuthService, Pagination) {

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
    $scope.tagForm = {};
    $scope.nothing = { text: "It's lonely here... Try adding some tags!" };

    var payload = { site: site };
    API.Tags.get(payload,
      function (data) {
        $scope.tags = data.results;
        $scope.tagForm = Pagination.paginate($scope.tagForm, data, payload);
      }
    );
  }

  $scope.filters = { name: "" };

  /**
   * search
   *
   * @method search
   * @desc Search through tags
   */
  $scope.search = function () {
    API.Tags.get({ search: $scope.filters.name },
      function (data) {
        $scope.tags = data.results;
        if (!data.count) {
          $scope.noResults = true;
        } else {
          $scope.noResults = false;
        }
      }
    );
  };

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

  /**
   * loadMore
   *
   * @method loadMore
   * @desc Load more function for controller
   */
  $scope.loadMore = Pagination.loadMore;

  $scope.$on("gonevisDash.TagService:remove", function (event, data) {
    for (var i = 0; i < $scope.tags.length; i++) {
      if ($scope.tags[i].id === data.id) {
        $scope.tags[i].isDeleted = true;
      }
    }
  });

  $scope.$on("gonevisDash.TagService:create", function (event, data) {
    var tag = data.tag;
    tag.slug = data.data.slug;
    tag.site = data.data.site;
    $scope.tags.unshift(tag);
  });

  $scope.$on("gonevisDash.Pagination:loadedMore", function (event, data) {
    if (data.success) {
      $scope.tagForm.page = data.page;
      $scope.tags = $scope.tags.concat(data.data.results);
    }
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
  "AuthService",
  "Pagination"
];
