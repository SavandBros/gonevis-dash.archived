"use strict";

/**
 * @class DolphinController
 *
 * @param $scope
 * @param $state
 * @param $stateParams
 * @param $resource
 * @param Dolphin
 * @param Codekit
 * @param API
 * @param ENV
 * @param AuthService
 * @param Upload
 * @param Pagination
 * @param toaster
 * @param source
 */
function DolphinController($scope, $rootScope, $state, $stateParams, $resource,
  Dolphin, Codekit, API, ENV, AuthService, Upload, Pagination, Search, toaster, source) {

  var site = AuthService.getCurrentSite();

  /**
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.view = localStorage.dolphinView || "list";
    $scope.dolphins = [];
    $scope.dolphinForm = {};
    $scope.search = Search;
    $scope.nothingText = "It's lonely here... Go ahead and upload some files.";

    if ($rootScope.selectionMode) {
      $scope.currentTab = "dolphin";
    }

    var payload = { site: site };
    API.Dolphins.get(payload,
      function (data) {
        $scope.initialled = true;
        angular.forEach(data.results, function (data) {
          $scope.dolphins.push(new Dolphin(data));
        });
        $scope.dolphinForm = Pagination.paginate(
          $scope.dolphinForm, data, {}
        );
        $scope.searchForm = Search.searchify($scope.searchForm, $scope.dolphinForm, API.Dolphins.get, data, payload);
      }
    );

    /**
     * @method setView
     * @desc Set item view style
     *
     * @param view {String}
     */
    $scope.setView = function (view) {
      $scope.view = view;
      localStorage.dolphinView = view;
    };

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
   * @method uploadFile
   * @desc Handle for file uploads
   *
   * @param files {File}
   * @param errFiles {File}
   */
  $scope.uploadFile = function (files, errFiles) {
    $scope.upload.files = files;
    $scope.errFiles = errFiles;

    angular.forEach($scope.upload.files,
      function (file) {
        // UploadUrl payload
        var payload = {
          file_name: file.name,
          file_size: file.size,
          mime_type: file.type
        };

        // Get data from UploadUrl
        API.UploadUrl.post({ siteId: site }, payload,
          function (data) {
            data.post_data.fields.file = file;

            // Upload the file
            file.upload = Upload.upload({
              url: data.post_data.url,
              data: data.post_data.fields,
            });

            // Store data
            file.isImage = file.type.indexOf("image") === 0;
            file.key = data.post_data.fields.key;

            payload = {
              file_key: file.key,
              site: site
            };

            file.upload.then(
              function () {
                API.Dolphins.post(payload,
                  function (data) {
                    file.done = true;
                    toaster.success("Upload Complete", file.name);
                    $scope.dolphins.unshift(new Dolphin(data));
                  }
                );
              },
              function () {
                toaster.error("Error", "Something went wrong, couldn't upload file.");
              },
              function (event) {
                file.progress = Math.min(100, parseInt(100.0 * event.loaded / event.total));
              }
            );
          }
        );
      }
    );
  };

  /**
   * @method update
   * @desc Handler for dolphin changes
   */
  function update() {
    Codekit.timeoutSlice($scope.dolphins);
  }

  /**
   * @method action
   * @desc Action is used to determine the action for the current state.
   *
   * @param dolphin {Dolphin}
   */
  $scope.action = function (dolphin) {
    if ($rootScope.selectionMode) {
      $rootScope.$broadcast("gonevisDash.Dolphin:select", dolphin, source);
      $rootScope.selectionMode = false;
      return;
    }
    dolphin.view();
  };

  /**
   * @method loadMore
   * @desc Load more function for controller
   */
  $scope.loadMore = Pagination.loadMore;

  $scope.$on("gonevisDash.Dolphin:update", update);
  $scope.$on("gonevisDash.Dolphin:remove", update);

  $scope.$on("gonevisDash.Pagination:loadedMore", function (event, data) {
    if (data.success) {
      $scope.dolphinForm.page = data.page;
      angular.forEach(data.data.results, function (data) {
        $scope.dolphins.push(new Dolphin(data));
      });
    }
  });

  $scope.$on("gonevisDash.Search:submit", function (event, data) {
    if (data.success) {
      $scope.dolphinForm = data.dolphinForm;
      $scope.dolphins = [];
      angular.forEach(data.data.results, function (data) {
        $scope.dolphins.push(new Dolphin(data));
      });
      $scope.searchForm = data.form;
    }
  });

  constructor();
}

app.controller("DolphinController", DolphinController);
DolphinController.$inject = [
  "$scope",
  "$rootScope",
  "$state",
  "$stateParams",
  "$resource",
  "Dolphin",
  "Codekit",
  "API",
  "ENV",
  "AuthService",
  "Upload",
  "Pagination",
  "Search",
  "toaster",
  "source"
];
