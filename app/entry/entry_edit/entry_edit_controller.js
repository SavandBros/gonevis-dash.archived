"use strict";

/**
 * @name EntryEditController
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $stateParams
 * @param $mdToast
 * @param $q
 * @param Codekit
 * @param API
 * @param AuthService
 * @param DolphinService
 */
function EntryEditController($scope, $rootScope, $state, $stateParams, $mdToast, $q,
  Codekit, API, AuthService, DolphinService) {

  /**
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.dolphinService = DolphinService;
    $scope.editing = true;
    $scope.tags = [];
    $scope.tagsToSubmit = [];
    $scope.statuses = Codekit.entryStatuses;

    $scope.form = $rootScope.cache.entry ? $rootScope.cache.entry : {};
    $scope.form.id = $stateParams.entryId;
    $scope.form.site = AuthService.getCurrentSite();

    API.Tags.get({ site: $scope.form.site },
      function (data) {
        for (var i in data.results) {
          $scope.tags.push({
            slug: data.results[i].slug,
            id: data.results[i].id,
            name: data.results[i].name,
            count: data.results[i].tagged_items_count,
            cover_image: data.results[i].media.cover_image
          });
        }
      }
    );

    API.Entry.get({ entry_id: $scope.form.id },
      function (data) {
        if (data.start_publication) {
          data.start_publication = new Date(data.start_publication);
        }
        if (data.end_publication) {
          data.end_publication = new Date(data.end_publication);
        }
        $scope.form = data;
        for (var i = 0; i < $scope.form.tags.length; i++) {
          $scope.tagsToSubmit.push($scope.form.tags[i]);
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
   * @method update
   * @desc Update entry API callback
   *
   * @param form {Object}
   */
  $scope.update = function (form) {
    form.loading = true;

    var payload = form;
    payload.tag_ids = [];

    for (var i = 0; i < $scope.tagsToSubmit.length; i++) {
      payload.tag_ids.push($scope.tagsToSubmit[i].id);
    }

    API.Entry.put({ entry_id: payload.id }, payload,
      function () {
        $mdToast.showSimple("Entry updated!");
        form.loading = false;
        form.errors = null;
      },
      function (data) {
        $mdToast.showSimple("Sorry, entry couldn't be updated. Try again.");
        form.loading = false;
        form.errors = data.data;
      }
    );
  };

  /**
   * @method remove
   * @desc remove entry via api call
   *
   * @param id {String} UUID of entry
   */
  $scope.remove = function (id) {
    API.Entry.delete({ entry_id: id },
      function () {
        $mdToast.showSimple("Entry has been deleted !");
        $state.go("dash.entry-list");
      },
      function () {
        $mdToast.showSimple("Something went wrong... We couldn't delete entry!");
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

app.controller("EntryEditController", EntryEditController);
EntryEditController.$inject = [
  "$scope",
  "$rootScope",
  "$state",
  "$stateParams",
  "$mdToast",
  "$q",
  "Codekit",
  "API",
  "AuthService",
  "DolphinService"
];
