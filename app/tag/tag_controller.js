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
function TagController($scope, $rootScope, $state, $mdToast, Tag, API, AuthService, Pagination, Search, Codekit) {

  var site = AuthService.getCurrentSite();

  /**
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.user = AuthService.getAuthenticatedUser();
    $scope.view = localStorage.tagView || "list";
    $scope.filters = { name: "" };
    $scope.search = Search;
    $scope.pageForm = {};
    $scope.tags = [];
    $scope.Tag = new Tag();

    var payload = {
      site: site
    };

    API.Tags.get(payload,
      function (data) {
        angular.forEach(data.results, function (data) {
          $scope.tags.push(new Tag(data));
        });
        $scope.initialled = true;
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
   * @method loadMore
   * @desc Load more function for controller
   */
  $scope.loadMore = Pagination.loadMore;

  $scope.$on("gonevisDash.Tag:remove", function (event, data) {
    var index = Codekit.getIndex($scope.tags, data.tag);
    $scope.tags[index].isDeleted = true;
    Codekit.timeoutSlice($scope.tags);
  });

  $scope.$on("gonevisDash.Tag:create", function (event, data) {
    if (data.success) {
      $scope.tags.push(new Tag(data.data));
    }
  });

  $scope.$on("gonevisDash.Tag:update", function (event, data) {
    if (data.success) {
      var index = Codekit.getIndex($scope.tags, data.tag);
      $scope.tags[index] = data.tag;
    }
  });

  $scope.$on("gonevisDash.Pagination:loadedMore", function (event, data) {
    if (data.success) {
      $scope.pageForm.page = data.page;
      angular.forEach(data.data.results, function (data) {
        $scope.tags.push(new Tag(data));
      });
    }
  });

  $scope.$on("gonevisDash.Search:submit", function (event, data) {
    if (data.success) {
      $scope.pageForm = data.pageForm;
      $scope.searchForm = data.form;
      angular.forEach(data.data.results, function (data) {
        $scope.tags.push(new Tag(data));
      });
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
  "Tag",
  "API",
  "AuthService",
  "Pagination",
  "Search",
  "Codekit"
];
