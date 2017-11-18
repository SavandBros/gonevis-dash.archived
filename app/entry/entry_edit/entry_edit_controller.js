"use strict";

function EntryEditController($scope, $rootScope, $state, $stateParams, $timeout, $q,
  Entry, Tag, Codekit, API, AuthService, DolphinService, toaster) {

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

    API.Tags.get({
        site: AuthService.getCurrentSite()
      },
      function(data) {
        angular.forEach(data.results, function(data) {
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

    API.Entry.get({
        entry_id: $scope.form.get.id
      },
      function(data) {
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
        angular.forEach($scope.form.get.tags, function(data) {
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

    // Add space from top for toolbar
    if (Codekit.isMobile()) {
      $timeout(function() {
        angular.element(".editor").css(
          'margin-top', angular.element(".ta-toolbar").height()
        );
      }, 1000);
    }
  }

  /**
   * @desc query tags
   */
  function load() {
    var deferred = $q.defer();
    deferred.resolve($scope.tags);
    return deferred.promise;
  }

  /**
   * @desc Load tags and filter them
   *
   * @param {string} query
   */
  $scope.loadTags = function(query) {
    return load().then(function(response) {
      $scope.tags = response;
      return $scope.tags.filter(function(tag) {
        return tag.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });
    });
  };

  /**
   * @desc Update entry API callback
   *
   * @param {object} form
   */
  $scope.update = function(form) {
    form.loading = true;

    var payload = form.get;
    payload.tag_ids = [];

    angular.forEach($scope.tagsToSubmit, function(tag) {
      payload.tag_ids.push(tag.id);
    });

    // Remove image placeholder
    payload.content = payload.content
      .replace(/<p><img src="assets\/img\/avatar.png"><\/p>/g, "")
      .replace(/<p><\/p>/g, "");

    API.Entry.put({
        entry_id: payload.id
      }, payload,
      function(data) {
        form.get = data;
        form.url = $scope.form.getUrl();
        Codekit.setTitle(form.get.title);
        toaster.info("Done", "Updated " + payload.title);
        form.loading = false;
        form.errors = null;
      },
      function(data) {
        toaster.error("Error", "Entry couldn't be updated, try again.");
        form.loading = false;
        form.errors = data.data;
      }
    );
  };

  /**
   * @desc Image selection callback
   *
   * @param {Event} event
   * @param {dolphin} dolphin
   * @param {string} source
   */
  $scope.$on("gonevisDash.Dolphin:select", function(event, dolphin, source) {
    if (source === "entryCover") {
      $scope.form.get.cover_image = dolphin ? dolphin.get.id : null;
    } else if (source === "editorAddImage") {
      $scope.form.get.content = $scope.form.get.content.replace("assets/img/avatar.png", dolphin.get.file);
    }
  });

  /**
   * @desc Go to entries on entry removal
   *
   * @param {Event} event
   * @param {object} data
   */
  $scope.$on("gonevisDash.Entry:remove", function(event, data) {
    if (data.success) {
      $state.go("dash.entry-list");
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
  "$timeout",
  "$q",
  "Entry",
  "Tag",
  "Codekit",
  "API",
  "AuthService",
  "DolphinService",
  "toaster"
];
