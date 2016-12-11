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
 * @param Search
 */
function TagController($scope, $rootScope, $state, $mdToast, TagService, API, AuthService, Pagination, Search, Codekit) {

  var site = AuthService.getCurrentSite();

  /**
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.view = localStorage.tagView || "list";
    $scope.user = AuthService.getAuthenticatedUser();
    $scope.tagService = TagService;
    $scope.filters = { name: "" };
    $scope.search = Search;
    $scope.pageForm = {};
    $scope.nothing = { text: "It's lonely here... Try adding some tags!" };

    var payload = { site: site };
    API.Tags.get(payload,
      function (data) {
        $scope.initialled = true;
        $scope.tags = data.results;
        $scope.pageForm = Pagination.paginate($scope.pageForm, data, payload);
        $scope.searchForm = Search.searchify($scope.searchForm, $scope.pageForm, API.Tags.get, data, payload);
      }
    );
  }

  /**
   * @method setView
   * @desc Set item view style
   *
   * @param view {String}
   */
  $scope.setView = function (view) {
    $scope.view = view;
    localStorage.tagView = view;
  };

  /**
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
   * @method create
   * @desc Create a new tag
   *
   * @param form {Object}
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

  $scope.$on("gonevisDash.TagService:update", function (event, data) {
    if (data.success) {
      var index = Codekit.getIndex($scope.tags, data.tag);
      $scope.tags[index] = data.data;
    }
  });

  $scope.$on("gonevisDash.Pagination:loadedMore", function (event, data) {
    if (data.success) {
      $scope.pageForm.page = data.page;
      $scope.tags = $scope.tags.concat(data.data.results);
    }
  });

  $scope.$on("gonevisDash.Search:submit", function (event, data) {
    if (data.success) {
      $scope.pageForm = data.pageForm;
      $scope.tags = data.data.results;
      $scope.searchForm = data.form;
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
  "Pagination",
  "Search",
  "Codekit"
];
