"use strict";

/**
 * @class EntryNewController
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $q
 * @param Entry
 * @param Tag
 * @param Codekit
 * @param AuthService
 * @param API
 * @param toaster
 */
function EntryNewController($scope, $rootScope, $state, $q,
  Entry, Tag, Codekit, AuthService, API, DolphinService, toaster) {

  /**
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.tags = [];
    $scope.dolphinService = DolphinService;
    $scope.tagsToSubmit = [];
    $scope.statuses = Codekit.entryStatuses;
    $scope.form = new Entry({
      status: $scope.statuses[0].id
    });

    API.Tags.get({ site: AuthService.getCurrentSite() },
      function (data) {
        angular.forEach(data.results, function (data) {
          var tag = new Tag({
            slug: data.slug,
            id: data.id,
            name: data.name,
            count: data.tagged_items_count
          });
          $scope.tags.push(tag.get);
        });
      }
    );
  }

  /**
   * @method load
   * @desc query tags
   */
  function load() {
    var deferred = $q.defer();
    deferred.resolve($scope.tags);
    return deferred.promise;
  }

  /**
   * @method loadTags
   * @desc Load tags and filter them
   *
   * @param query {String}
   */
  $scope.loadTags = function (query) {
    return load().then(function (response) {
      $scope.tags = response;
      return $scope.tags.filter(function (tag) {
        return tag.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });
    });
  };


  /**
   * @method newPost
   * @desc Submit newPost form
   *
   * @param form {object} Form data to submit
   */
  $scope.newPost = function (form) {
    form.loading = true;
    form.get.site = AuthService.getCurrentSite();
    form.get.user = AuthService.getAuthenticatedUser();

    var payload = form.get;
    payload.tag_ids = [];

    angular.forEach($scope.tagsToSubmit, function (tag) {
      payload.tag_ids.push(tag.id);
    });

    API.EntryAdd.save(payload,
      function (data) {
        toaster.success("Done", "Entry added");
        $state.go("dash.entry-edit", { entryId: data.id });
      },
      function (data) {
        toaster.error("Error", "Failed to add entry");
        form.loading = false;
        form.errors = data;
      }
    );
  };

  /**
   * @event gonevisDash.DolphinService:select
   * @desc Image selection callback
   *
   * @param event {Event}
   * @param dolphin {Object}
   */
  $scope.$on("gonevisDash.DolphinService:select", function (data, dolphin) {
    if (Codekit.isEmptyObj($rootScope.set.editor)) {
      $scope.form.cover_image = dolphin ? dolphin.id : null;
    } else if ($scope.form.content.length < 20) {
      $rootScope.set.editor.scope.displayElements.text.focus();
      $rootScope.set.editor.this.$editor().wrapSelection("insertImage", $rootScope.set.editor.dolphin.file, false);
      $rootScope.set.editor = {};
    }
  });

  constructor();
}

app.controller("EntryNewController", EntryNewController);
EntryNewController.$inject = [
  "$scope",
  "$rootScope",
  "$state",
  "$q",
  "Entry",
  "Tag",
  "Codekit",
  "AuthService",
  "API",
  "DolphinService",
  "toaster"
];
