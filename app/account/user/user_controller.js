'use strict';

function UserController($scope, $rootScope, $stateParams,
  AuthService, API, DolphinService, Upload, ENV, Account, toaster) {

  var toasters = {};

  function constructor() {
    $scope.user = AuthService.getAuthenticatedUser(true);
    $scope.dolphinService = DolphinService;
    $scope.param = $stateParams;

    API.User.get({
        user_id: $scope.user.get.id
      },
      function(data) {
        $scope.user = AuthService.setAuthenticatedUser(data, true);
        $scope.viewLoaded = true;
      }
    );
  }

  /**
   * @desc update user profile via api call
   *
   * @param {string} key
   * @param {string} value
   */
  $scope.updateProfile = function(key, value) {

    var keyString = key.replace(/_/g, " ");

    toasters[key] = toaster.info("", "Updating " + keyString + "...");

    var payload = {};
    payload[key] = value;

    API.UserUpdate.put(payload,
      function(data) {
        if (key === "picture") {
          $scope.user.get.media[key] = data.media[null];
        } else {
          $scope.user[key] = data[key];
        }
        $scope.user = AuthService.setAuthenticatedUser($scope.user.get, true);
        $rootScope.$broadcast("gonevisDash.UserController:update");

        toaster.clear(toasters[key]);
        toaster.info("Done", "Profile " + keyString + " updated", 3000);
      },
      function() {
        toaster.error("Error", "An error has occurred while updating profile, try again.");
      }
    );
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

  /**
   * @desc Upload on file select
   *
   * @param {object} file
   */
  $scope.uploadFile = function(file) {
    Upload.upload({
      url: ENV.apiEndpoint + "account/update-profile/",
      data: {
        picture: file,
        key: file.name
      },
      method: "PUT"
    }).then(function(data) {
      toaster.info("Done", "Profile picture updated");
      $scope.user = new Account(data.data);
      $scope.user = AuthService.setAuthenticatedUser(data.data, true);
      $rootScope.$broadcast("gonevisDash.UserController:update");
    }, function(data) {
      $scope.errors = data.data;
      toaster.error("Error", "An error has occured while uploading profile picture, try again.");
    });
  };

  constructor();
}

app.controller("UserController", UserController);
UserController.$inject = [
  "$scope",
  "$rootScope",
  "$stateParams",
  "AuthService",
  "API",
  "DolphinService",
  "Upload",
  "ENV",
  "Account",
  "toaster"
];
