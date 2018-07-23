"use strict";

import app from "../app";

function DolphinController($scope, $rootScope, Dolphin, Codekit, API, AuthService, $state,
                          Upload, Pagination, Search, toaster, source, localStorageService, $translate, ENV) {

  var site = AuthService.getCurrentSite();
  let isDev = ENV.name === 'development' ? true : false;

  function constructor() {
    $scope.fileSelection = !$state.includes("dash.dolphin");
    $scope.view = localStorageService.get("dolphinView") || "list";
    $scope.dolphins = [];
    $scope.dolphinForm = {};
    $scope.search = Search;
    var payload = {
      site: site
    };

    if ($scope.fileSelection) {
      $scope.currentTab = "dolphin";
      payload.ext = "image";
    }
    API.Dolphins.get(payload,
      function(data) {
        angular.forEach(data.results, function(data) {
          $scope.dolphins.push(new Dolphin(data));
        });
        $scope.initialled = true;
        $scope.dolphinForm = Pagination.paginate(
          $scope.dolphinForm, data, {}
        );
        $scope.searchForm = Search.searchify($scope.searchForm, $scope.dolphinForm, API.Dolphins.get, data, payload);
        // Tour is ready
        $rootScope.$broadcast("gonevisDash.Tour.readyToCheck", "files");
      }
    );

    $scope.upload = {
      files: [],
      accept: "",
      acceptList: [
        "image/jpeg",
        "image/pjpeg",
        "image/png",
        "image/gif",
        "application/pdf",
        "application/msword",
        "application/x-iwork-keynote-sffkey",
        "application/mspowerpoint",
        "application/powerpoint",
        "application/vnd.ms-powerpoint",
        "application/x-mspowerpoint",
        "application/vnd.oasis.opendocument.text",
        "application/excel",
        "application/vnd.ms-excel",
        "application/x-excel",
        "application/x-msexcel",
        "application/x-compressed",
        "application/x-zip-compressed",
        "application/zip",
        "multipart/x-zip",
        "audio/mpeg3",
        "audio/x-mpeg-3",
        "video/mpeg",
        "video/x-mpeg",
        "audio/x-m4a",
        "audio/ogg",
        "audio/wav",
        "audio/x-wav",
        "video/mp4",
        "video/x-m4v",
        "video/quicktime",
        "video/x-ms-wmv",
        "video/avi",
        "video/msvideo",
        "video/x-msvideo",
        "video/mpeg",
        "video/ogg",
        "video/3gp",
        "video/3gpp2",
      ]
    };
    $scope.upload.accept = $scope.upload.acceptList.join(",");
  }

  /**
   * @desc Handle for file uploads
   *
   * @param {array} files
   * @param {array} errorFiles
   */
  $scope.uploadFile = function(files, errorFiles) {
    // If there was error, show toaster
    if (errorFiles.length) {
      angular.forEach(errorFiles, function(file) {
        return $translate(
          ["ERROR", "FILE_UPLOAD_TYPE_ERROR"], {"type": file.name.slice(file.name.lastIndexOf("."))}
        ).then(function(translations) {
          toaster.error(translations.ERROR, translations.FILE_UPLOAD_TYPE_ERROR);
        });
      });
    }
    $scope.upload.files = files;
    $scope.errorFiles = errorFiles;

    angular.forEach($scope.upload.files,
      function(file) {
        // UploadUrl payload
        var payload = {
          file_name: file.name,
          file_size: file.size,
          mime_type: file.type
        };
        // Get data from UploadUrl
        API.UploadUrl.post({
            siteId: site
          }, payload,
          function(data) {
            data.post_data.fields.file = file;

            let uploadPayload = {
              url: data.post_data.url,
              data: data.post_data.fields
            };

            // If `site` is in the data of the backend for UploadURL
            // Than means we are dealing with LocalFileSystem uploads and the file
            // object should be send to the backend as well.
            // As usual, backend needs the `site` in post data.
            // In this case we add the `site` to the POST data alongside file blog.
            if ('site' in data.post_data) {
              uploadPayload.data.site = data.post_data.site;
            }

            // Upload the file
            file.upload = Upload.upload(uploadPayload);

            // Store data
            file.isImage = file.type.indexOf("image") === 0;
            file.key = data.post_data.fields.key;

            payload = {
              file_key: file.key,
              site: site
            };

            file.upload.then(
              function() {
                // TODO: If local file system upload is being used, therefore the file has
                // been already uploaded to the server and uploading it via `API.Dolphins.post` would either
                // duplicate the file or raise an unexpected error from API.
                API.Dolphins.post(payload,
                  function(data) {
                    file.done = true;
                    toaster.success($translate.instant('UPLOAD_COMPLETED'), file.name);
                    $scope.dolphins.unshift(new Dolphin(data));
                    $scope.currentTab = "dolphin";
                  }
                );
              },
              function() {
                $translate(["ERROR", "UPLOAD_ERROR"]).then(function(translations) {
                  toaster.error(translations.ERROR, translations.UPLOAD_ERROR);
                });
              },
              function(event) {
                file.progress = Math.min(100, parseInt(100.0 * event.loaded / event.total));
              }
            );
          }
        );
      }
    );
  };

  /**
   * @desc Handler for dolphin changes
   */
  function update() {
    Codekit.timeoutSlice($scope.dolphins);
  }

  /**
   * @desc Action is used to determine the action for the current state.
   *
   * @param {Dolphin} dolphin
   */
  $scope.action = function(dolphin) {
    if ($scope.fileSelection) {
      return $rootScope.$broadcast("gonevisDash.Dolphin:select", dolphin, source);
    }
    dolphin.view();
  };

  /**
   * @desc Load more function for controller
   */
  $scope.loadMore = Pagination.loadMore;

  $scope.$on("gonevisDash.Dolphin:update", update);
  $scope.$on("gonevisDash.Dolphin:remove", update);

  /**
   * @desc Load more callback
   *
   * @param {Event} event
   * @param {object} data
   */
  $scope.$on("gonevisDash.Pagination:loadedMore", function(event, data) {
    if (data.success) {
      $scope.dolphinForm.page = data.page;
      angular.forEach(data.data.results, function(data) {
        $scope.dolphins.push(new Dolphin(data));
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
      $scope.dolphinForm = data.pageForm;
      $scope.dolphins = [];
      angular.forEach(data.data.results, function(data) {
        $scope.dolphins.push(new Dolphin(data));
      });
      $scope.searchForm = data.form;
    }
  });

  // If current state is dolphin view
  if (!$scope.fileSelection) {
    let dropElement = angular.element(".dolphin-drop");

    angular.element(window.document).bind({
      // When file enters the drag area
      dragover: (event) => {
        // Check if the thing is being dragged is a string
        if (event.originalEvent.dataTransfer.items[0].kind === "string") {
          return;
        }

        dropElement.addClass("drag-over");
        event.preventDefault();
      },

      // When file leaves the drag area
      dragleave: () => dropElement.removeClass("drag-over"),
      // When file is dropped
      drop: () => dropElement.removeClass("drag-over")
    });
  }

  constructor();
}

app.controller("DolphinController", DolphinController);
