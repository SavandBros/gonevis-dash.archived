"use strict";

require('medium-editor');
require('../../basement/medium_editor/medium_editor');

function EntryEditController($scope, $rootScope, $state, $stateParams, $timeout, $q,
  Entry, Tag, Codekit, API, AuthService, DolphinService, toaster, Slug, $translate) {
  var payload;
  var tagsToCreate = [];
  var noneTagsCount = 0;

  function constructor() {
    $scope.tags = [];
    $scope.dolphinService = DolphinService;
    $scope.tagsToSubmit = [];
    $scope.statuses = Codekit.entryStatuses;
    $scope.formats = Codekit.entryFormats;

    // Get tags from API
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

    if ($stateParams.entryId) {
      $scope.editing = true;
      // Load from cache if available
      if ($rootScope.cache.entry && $rootScope.cache.entry.get.id === $stateParams.entryId) {
        $scope.form = $rootScope.cache.entry;
        Codekit.setTitle($scope.form.get.title);
      } else {
        $scope.form = new Entry({
          site: AuthService.getCurrentSite(),
          id: $stateParams.entryId
        });
      }

      // Get entry from API
      API.Entry.get({
          entry_id: $scope.form.get.id
        },
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
        },
        function () {
          $state.go("dash.entry-edit", { entryId: null });
          $translate(["OOPS", "ENTRY_GET_ERROR"]).then(function(translations) {
            toaster.error(translations.OOPS, translations.ENTRY_GET_ERROR);
          });
        }
      );
    } else {
      $scope.editing = false;
      $scope.form = new Entry({
        content: "<p><br></p>", // Start with an empty paragraph (for editor)
        status: $scope.statuses[0].id,
        format: Codekit.entryFormats[0].text.id
      });
      $scope.form.get.is_page = $stateParams.isPage;
    }

    // Add space from top for toolbar
    if (Codekit.isMobile()) {
      $timeout(function () {
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
  $scope.loadTags = function (query) {
    return load().then(function (response) {
      $scope.tags = response;
      return $scope.tags.filter(function (tag) {
        return tag.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });
    });
  };

  /**
   * @desc Save form
   *
   * @param {object} form Form data to submit
   * @param {number} status
   */
  $scope.save = function (form, status) {
    form.loading = true;
    form.get.site = AuthService.getCurrentSite();
    form.get.user = AuthService.getAuthenticatedUser(false);

    payload = form.get;

    payload.tag_ids = [];
    payload.status = status || payload.status;


    angular.forEach($scope.tagsToSubmit, function (tag) {
      // Check if tags have ids
      if (!tag.id) {
        noneTagsCount = noneTagsCount + 1;

        tagsToCreate.push({
          data: {
            site: AuthService.getCurrentSite(),
            name: tag.name,
            slug: Slug.slugify(tag.name)
          }
        });

      } else {
        payload.tag_ids.push(tag.id);
      }
    });

    // Remove image placeholder
    payload.content = payload.content
      .replace(/<p><img src="assets\/img\/avatar.png"><\/p>/g, "")
      .replace(/<p><\/p>/g, "");

    // Check if there are tags that doesn't exit
    if (noneTagsCount) {
      const tagInstance = new Tag({ site: AuthService.getCurrentSite() });

      // Create each tag
      angular.forEach(tagsToCreate, function (tag) {
        tagInstance.create(tag);
      });
    } else {
      if ($scope.editing) {
        $scope.updateEntry(form);
      } else {
        $scope.addEntry(form);
      }
    }

  };

  $scope.updateEntry = function (form) {
    API.Entry.put({
        entry_id: payload.id
      }, payload,
      function (data) {
        form.get = data;
        form.url = $scope.form.getUrl();
        Codekit.setTitle(form.get.title);

        $translate(["DONE", "ENTRY_UPDATED"], {"title": payload.title}).then(function (translations) {
          toaster.info(translations.DONE, translations.ENTRY_UPDATED);
        });
        form.loading = false;
        form.errors = null;
      },
      function (data) {
        $translate(["ERROR", "ENTRY_UPDATE_ERROR"]).then(function (translations) {
          toaster.error(translations.ERROR, translations.ENTRY_UPDATE_ERROR);
        });
        form.loading = false;
        form.errors = data.data;
      }
    );
  };

  $scope.addEntry = function (form) {
    API.EntryAdd.save(payload,
      function (data) {
        $scope.form.cache(true);
        $translate(["DONE", "ENTRY_CREATED_API"], {"title": payload.title}).then(function (translations) {
          toaster.success(translations.DONE, translations.ENTRY_CREATED_API);
        });
        $state.go("dash.entry-edit", {
          entryId: data.id
        });
      },
      function (data) {
        $translate(["ERROR", "ENTRY_CREATE_ERROR"]).then(function (translations) {
          toaster.error(translations.ERROR, translations.ENTRY_CREATE_ERROR);
        });
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
  $scope.$on("gonevisDash.Dolphin:select", function (event, dolphin, source) {
    // Cover image
    if (source ===/** @type {string} */ "entryCover") {
      // Store ID to uplodad
      $scope.form.get.cover_image = dolphin ? dolphin.get.id : null;
      // If selected a file
      if (dolphin) {
        // Already has a cover image
        if ($scope.form.hasCoverImage()) {
          $scope.form.get.media.cover_image.thumbnail_256x256 = dolphin.get.thumbnail_256x256;
        }
        // Create cover image object for preview
        else {
          $scope.form.get.media = {
            cover_image: { thumbnail_256x256: dolphin.get.thumbnail_256x256 }
          };
        }
      } else {
        $scope.form.get.media = null;
      }
    }
    // Inserting an image to editor
    else if (source === "editorAddImage") {
      // Get the modified content (inserted image)
      $scope.form.get.content = angular.element("[medium-editor][name=editor]").html();
      // If has no cover image, set this image as cover image
      if (!$scope.form.hasCoverImage()) {
        // Store to upload
        $scope.form.cover_image = dolphin.get.id;
        // Store to preview
        $scope.form.get.media = {
          cover_image: { thumbnail_256x256: dolphin.get.thumbnail_256x256 }
        };
      }
    }
  });

  /**
   * @desc Go to entries on entry removal
   *
   * @param {Event} event
   * @param {object} data
   */
  $scope.$on("gonevisDash.Entry:remove", function (event, data) {
    if (data.success) {
      $state.go("dash.entry-list");
    }
  });

  /**
   * @desc Tag create callback
   *
   * @param {Event} event
   * @param {object} data
   */
  $scope.$on("gonevisDash.Tag:create", function (event, data) {
    noneTagsCount = noneTagsCount - 1;

    if (data.success) {
      payload.tag_ids.push(data.data.id);
    }

    // Update tags
    angular.forEach($scope.tagsToSubmit, function (tag, index) {
      if (data.success) {
        if (tag.name === data.data.name) {
          tag.id = data.data.id;
        }
      } else {
        if (tag.name === data.data.resource.name) {
          $scope.tagsToSubmit.splice(index, 1);
        }
      }
    });

    // If all APIs were called, proceed to update/add entry.
    if (noneTagsCount === 0) {
      if ($scope.editing) {
        $scope.updateEntry($scope.form);
      } else {
        $scope.addEntry($scope.form);
      }
      tagsToCreate = [];
    }
  });

  /**
   * @desc Go to entries on entry removal
   *
   * @param {Event} event
   * @param {object} data
   */
  $scope.$on("gonevisDash.Entry:remove", function (event, data) {
    if (data.success) {
      $state.go("dash.entry-list");
    }
  });


  constructor();
}

const EDIT_ENTRY_MODULE = angular.module('gonevisDash').controller("EntryEditController", EntryEditController);
export { EDIT_ENTRY_MODULE };
