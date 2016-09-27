"use strict";

/**
 * @ngdoc function
 * @name gonevisDash.controller:DolphinController
 *
 * @param $scope
 * @param $state
 * @param $stateParams
 * @param $mdToast
 * @param DolphinService
 * @param Codekit
 * @param API
 * @param ENV
 * @param AuthService
 * @param Upload
 */
function DolphinController($scope, $rootScope, $state, $stateParams, $mdToast,
  DolphinService, Codekit, API, ENV, AuthService, Upload) {

  var site = AuthService.getCurrentSite();

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.nothing = { text: "It's lonely here... Try adding some dolphins!" };
    $scope.dolphinService = DolphinService;

    if ($rootScope.selectionMode) {
      $scope.currentTab = 'dolphin';
    }

    API.Dolphins.get({},
      function (data) {
        $scope.dolphins = data.results;
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
   * uploadFile
   *
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
        file.upload = Upload.upload({
          url: ENV.apiEndpoint + "dolphin/file/",
          data: { file: file, site: site }
        });

        file.upload.then(
          function (data) {
            $mdToast.showSimple("Upload completed.");
            $scope.dolphins.unshift(data.data);
          },
          function () {
            $mdToast.showSimple("Upload failed.");
          },
          function (event) {
            file.progress = Math.min(100, parseInt(100.0 * event.loaded / event.total));

            if (file.progress == 100) {
              setTimeout(function () {
                file.dismiss = true;
                $scope.$apply();
              }, 3000);
            }
          }
        );
      }
    );
  };

  /**
   * update
   *
   * @method update
   *
   * @param event {Object}
   * @param data {Object}
   */
  function update(event, data) {
    if (data.success) {
      var index = Codekit.getIndex($scope.dolphins, data.dolphin);

      $scope.dolphins[index].meta_data.name = data.dolphin.meta_data.name;
      $scope.dolphins[index].meta_data.description = data.dolphin.meta_data.description;
      $scope.dolphins[index].isDeleted = data.dolphin.isDeleted;
    }
  }

  /**
   * action
   *
   * @method action
   * @desc Action is used to determine the action for the current state.
   *
   * @param dolphin {Object}
   */
  $scope.action = function (dolphin) {
    if ($rootScope.selectionMode) {
      return $rootScope.$broadcast("gonevisDash.DolphinService:select", dolphin);
    };
    DolphinService.view(dolphin);
  };

  $scope.$on("gonevisDash.DolphinService:update", update);
  $scope.$on("gonevisDash.DolphinService:remove", update);

  constructor();
}

app.controller("DolphinController", DolphinController);
DolphinController.$inject = [
  "$scope",
  "$rootScope",
  "$state",
  "$stateParams",
  "$mdToast",
  "DolphinService",
  "Codekit",
  "API",
  "ENV",
  "AuthService",
  "Upload"
];
