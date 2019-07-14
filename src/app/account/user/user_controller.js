'use strict';

import app from "../../app";

function UserController($scope, $rootScope, $stateParams,
                        AuthService, API, DolphinService, Upload, ENV, Account, toaster, $translate) {

  var toasters = null;

  function constructor() {
    $scope.user = AuthService.getAuthenticatedUser(true);
    $scope.dolphinService = DolphinService;
    $scope.param = $stateParams;

    API.User.get({
        user_id: $scope.user.get.id
      },
      function (data) {
        $scope.user = AuthService.setAuthenticatedUser(data, true);
        $scope.viewLoaded = true;
      }
    );
  }

  /**
   * @desc update user profile via api call
   *
   * @param {boolean} removeAvatar
   */
  $scope.updateProfile = function (removeAvatar) {
    $translate("UPDATING_PROFILE").then(function (updating) {
      toasters = toaster.info("", updating, 30000);
    });

    let payload = {
      name: this.user.get.name,
      about: this.user.get.about,
      location: this.user.get.location,
      receive_email_notification: this.user.get.receive_email_notification
    };

    if (removeAvatar) {
      $scope.user.get.media.picture = null;
      $scope.user.get.media.thumbnail_48x48 = null;
      $scope.user.get.media.thumbnail_128x128 = null;
      $scope.user.get.media.thumbnail_256x256 = null;
      payload.picture = null;
    }

    API.UserUpdate.patch(payload,
      function (data) {
        if (!removeAvatar) {
          $scope.user.get.name = data.name;
          $scope.user.get.about = data.about;
          $scope.user.get.location = data.location;
          $scope.user.get.receive_email_notification = data.receive_email_notification;
        }
        $scope.user = AuthService.setAuthenticatedUser($scope.user.get, true);
        $rootScope.$broadcast("gonevisDash.UserController:update");

        toaster.clear(toasters);
        $translate(["DONE", "PROFILE_UPDATED"]).then(function (translations) {
          toaster.info(translations.DONE, translations.PROFILE_UPDATED, 3000);
        });
      },
      function () {
        $translate(["ERROR", "PROFILE_UPDATE_ERROR"]).then(function (translations) {
          toaster.error(translations.ERROR, translations.PROFILE_UPDATE_ERROR);
        });
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
  $scope.uploadFile = function (file) {
    Upload.upload({
      url: ENV.apiEndpoint + "account/update-profile/",
      data: {
        picture: file,
        key: file.name
      },
      method: "PATCH"
    }).then(function (data) {
      $translate(["DONE", "PROFILE_PICTURE_UPDATED"]).then(function (translations) {
        toaster.info(translations.DONE, translations.PROFILE_PICTURE_UPDATED);
      });
      $scope.user.get.media = data.data.media;
      $scope.user = AuthService.setAuthenticatedUser($scope.user.get, true);
      $rootScope.$broadcast("gonevisDash.UserController:update");
    }, function (data) {
      $scope.errors = data.data;
      $translate(["ERROR", "PROFILE_PICTURE_UPDATE_ERROR"]).then(function (translations) {
        toaster.error(translations.ERROR, translations.PROFILE_PICTURE_UPDATE_ERROR);
      });
    });
  };

  constructor();
}

app.controller("UserController", UserController);
