'use strict'

/**
 * @ngdoc function
 * @name gonevisDash.controller:DolphinController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $state
 * @param $stateParams
 * @param $mdToast
 * @param API
 * @param ENV
 * @param AuthenticationService
 * @param Upload
 */
function DolphinController($scope, $state, $stateParams, $mdToast, API, ENV, AuthenticationService, Upload) {

  var site = AuthenticationService.getCurrentSite();

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.form = {
      site: site,
      file: null,
    }

    API.Dolphins.get({ site_id: site },
      function (data) {
        $scope.dolphins = data.results;
      }
    );

    $scope.upload = {
      file: null,
      done: false,
      accept: "",
      acceptList: [
        'image/jpeg',
        'image/pjpeg',
        'image/png',
        'image/gif',
        'application/pdf',
        'application/msword',
        'application/x-iwork-keynote-sffkey',
        'application/mspowerpoint',
        'application/powerpoint',
        'application/vnd.ms-powerpoint',
        'application/x-mspowerpoint',
        'application/vnd.oasis.opendocument.text',
        'application/excel',
        'application/vnd.ms-excel',
        'application/x-excel',
        'application/x-msexcel',
        'application/x-compressed',
        'application/x-zip-compressed',
        'application/zip',
        'multipart/x-zip',
        'audio/mpeg3',
        'audio/x-mpeg-3',
        'video/mpeg',
        'video/x-mpeg',
        'audio/x-m4a',
        'audio/ogg',
        'audio/wav',
        'audio/x-wav',
        'video/mp4',
        'video/x-m4v',
        'video/quicktime',
        'video/x-ms-wmv',
        'video/avi',
        'video/msvideo',
        'video/x-msvideo',
        'video/mpeg',
        'video/ogg',
        'video/3gp',
        'video/3gpp2',
      ]
    }

    $scope.upload.accept = $scope.upload.acceptList.join(',');
  }

  /**
   *
   *
   */
      });
  }

  constructor()
}

app.controller('DolphinController', DolphinController)
DolphinController.$inject = [
  '$scope', '$state', '$stateParams', '$mdToast', 'API', 'ENV', 'AuthenticationService', 'Upload'
]
