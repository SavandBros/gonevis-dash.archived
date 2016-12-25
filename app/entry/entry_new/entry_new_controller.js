"use strict";

/**
 * @class EntryNewController
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $mdToast
 * @param Codekit
 * @param AuthService
 * @param API
 */
function EntryNewController($scope, $rootScope, $state, $mdToast, Codekit, AuthService, API, DolphinService, $q) {

  /**
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.tags = [];
    $scope.dolphinService = DolphinService;
    $scope.tagsToSubmit = [];
    $scope.statuses = Codekit.entryStatuses;
    $scope.form = {
      status: $scope.statuses[0].id
    };

    API.Tags.get({ site: AuthService.getCurrentSite() },
      function (data) {
        for (var i in data.results) {
          $scope.tags.push({
            slug: data.results[i].slug,
            id: data.results[i].id,
            name: data.results[i].name,
            count: data.results[i].tagged_items_count,
          });
        }
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
    form.site = AuthService.getCurrentSite();
    form.user = AuthService.getAuthenticatedUser();

    var payload = form;
    payload.tag_ids = [];

    for (var i = 0; i < $scope.tagsToSubmit.length; i++) {
      payload.tag_ids.push($scope.tagsToSubmit[i].id);
    }

    API.EntryAdd.save(payload,
      function (data) {
        $mdToast.showSimple("Entry added.");
        $state.go("dash.entry-edit", { entryId: data.id });
      },
      function (data) {
        $mdToast.showSimple("Failed to add entry.");
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
  "$mdToast",
  "Codekit",
  "AuthService",
  "API",
  "DolphinService",
  "$q"
];
