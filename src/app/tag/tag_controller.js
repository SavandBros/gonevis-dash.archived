"use strict";

import app from "../app";

function TagController($scope, Tag, API, AuthService, Pagination, Search, localStorageService) {

  function constructor() {
    $scope.view = localStorageService.get("tagView") || "list";
    $scope.filters = {
      name: ""
    };
    $scope.search = Search;
    $scope.pageForm = {};
    $scope.tags = [];
    $scope.Tag = new Tag();

    var payload = {
      site: AuthService.getCurrentSite()
    };

    API.Tags.get(payload,
      function(data) {
        angular.forEach(data.results, function(data) {
          $scope.tags.push(new Tag(data));
        });
        $scope.initialled = true;
        $scope.pageForm = Pagination.paginate($scope.pageForm, data, payload);
        $scope.searchForm = Search.searchify($scope.searchForm, $scope.pageForm, API.Tags.get, data, payload);
      }
    );
  }

  /**
   * @desc Set item view style
   *
   * @param {string} view
   */
  $scope.setView = function(view) {
    $scope.view = view;
    localStorageService.set("tagView", view);
  };

  /**
   * @desc Search through tags
   */
  $scope.search = function() {
    API.Tags.get({
        search: $scope.filters.name
      },
      function(data) {
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
   * @desc Load more function for controller
   */
  $scope.loadMore = Pagination.loadMore;

  /**
   * @desc Tag create callback
   *
   * @param {Event} event
   * @param {object} data
   */
  $scope.$on("gonevisDash.Tag:create", function(event, data) {
    if (data.success) {
      $scope.tags.push(new Tag(data.data));
    }
  });

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
        $scope.tags.push(new Tag(data));
      });
    }
  });

  /**
   * @desc Search callback
   *
   * @param {Event} event
   * @param {object} data
   */
  $scope.$on("gonevisDash.Search:submit", function(event, data) {
    if (data.success) {
      $scope.pageForm = data.pageForm;
      $scope.tags = [];
      angular.forEach(data.data.results, function(data) {
        $scope.tags.push(new Tag(data));
      });
      $scope.searchForm = data.form;
    }
  });

  constructor();
}

app.controller("TagController", TagController)
