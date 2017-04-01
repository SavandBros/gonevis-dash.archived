"use strict";

/**
 * @name EntryEditController
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $stateParams
 * @param $q
 * @param Entry
 * @param Tag
 * @param Codekit
 * @param API
 * @param AuthService
 * @param DolphinService
 * @param toaster
 */
function EntryEditController($scope, $rootScope, $state, $stateParams, $q,
  Entry, Tag, Codekit, API, AuthService, DolphinService, toaster) {

  /**
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.dolphinService = DolphinService;
    $scope.statuses = Codekit.entryStatuses;
    $scope.formats = Codekit.entryFormats;
    $scope.editing = true;
    $scope.tags = [];
    $scope.tagsToSubmit = [];

    // Load from cache if available
    if ($rootScope.cache.entry) {
      $scope.form = $rootScope.cache.entry;
      Codekit.setTitle($scope.form.get.title);
    } else {
      $scope.form = new Entry({
        site: AuthService.getCurrentSite(),
        id: $stateParams.entryId
      });
    }

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

    API.Entry.get({ entry_id: $scope.form.get.id },
      function (data) {
        if (data.start_publication) {
          data.start_publication = new Date(data.start_publication);
        }
        if (data.end_publication) {
          data.end_publication = new Date(data.end_publication);
        }
        // Get entry data
        $scope.form.get = data;
        $scope.form.url = $scope.form.getUrl();
        Codekit.setTitle($scope.form.get.title);

        // Get entry tags
        angular.forEach($scope.form.get.tags, function (data) {
          var tag = new Tag({
            slug: data.slug,
            id: data.id,
            name: data.name,
            count: data.tagged_items_count
          });
          $scope.tagsToSubmit.push(tag.get);
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
   * @method update
   * @desc Update entry API callback
   *
   * @param form {Object}
   */
  $scope.update = function (form) {
    form.loading = true;

    var payload = form.get;
    payload.tag_ids = [];

    angular.forEach($scope.tagsToSubmit, function (tag) {
      payload.tag_ids.push(tag.id);
    });

    API.Entry.put({ entry_id: payload.id }, payload,
      function (data) {
        form.get = data;
        Codekit.setTitle(form.get.title);
        toaster.info("Done", "Entry updated");
        form.loading = false;
        form.errors = null;
      },
      function (data) {
        toaster.error("Error", "Entry couldn't be updated, try again.");
        form.loading = false;
        form.errors = data.data;
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
  $scope.$on("gonevisDash.DolphinService:select", function (event, dolphin) {
    if (Codekit.isEmptyObj($rootScope.set.editor)) {
      $scope.form.cover_image = dolphin ? dolphin.id : null;
    } else if ($scope.form.content.length < 20) {
      $rootScope.set.editor.scope.displayElements.text.focus();
      $rootScope.set.editor.this.$editor().wrapSelection("insertImage", $rootScope.set.editor.dolphin.file, false);
      $rootScope.set.editor = {};
    }
  });

  /**
   * @event gonevisDash.DolphinService:select
   * @desc Image selection callback
   *
   * @param event {Event}
   * @param dolphin {Object}
   */
  $scope.$on("gonevisDash.Entry:remove", function (event, dolphin) {
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
  "$q",
  "Entry",
  "Tag",
  "Codekit",
  "API",
  "AuthService",
  "DolphinService",
  "toaster"
];
