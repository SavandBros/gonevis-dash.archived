"use strict";

/**
 * @ngdoc function
 * @name gonevisDash.controller:EntryNewController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $state
 * @param $mdToast
 * @param $q
 * @param AuthService
 * @param API
 * @param Codekit
 */
function EntryNewController($scope, $state, $mdToast, $q, AuthService, API, DolphinService, Codekit) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   *
   * @memberOf EntryNewController
   */
  function constructor() {
    $scope.dolphinService = DolphinService;
    $scope.tags = [];
    $scope.tagsToSubmit = [];
    $scope.form = {};
    $scope.statuses = Codekit.entryStatuses;

    API.Tags.get({ site: AuthService.getCurrentSite() },
      function (data, status, headers, config) {
        $scope.tags = data.results;
      }
    );
  };

  /**
   * loadTags
   *
   * @method loadTags
   * @desc Load tags via load() function
   *
   * @param query {String}
   */
  $scope.loadTags = function (query) {
    return load();
  };

  /**
   * load
   *
   * @method load
   * @desc Get tags from var and return a promise
   *
   * @returns {Promise}
   */
  function load() {
    var deferred = $q.defer();
    deferred.resolve($scope.tags);
    return deferred.promise;
  };


  /**
   * newPost
   *
   * @method newPost
   * @desc Submit newPost form
   *
   * @param form {object} Form data to submit
   */
  $scope.newPost = function (form) {
    form.loading = true;
    form.site = AuthService.getCurrentSite();
    form.user = AuthService.getAuthenticatedUser();

    var payload = form;
    payload.tag_ids = [];

    for (var i = 0; i < $scope.tagsToSubmit.length; i++) {
      payload.tag_ids.push($scope.tagsToSubmit[i].id);
    }

    API.EntryAdd.save(payload,
      function (data, status, headers, config) {
        $mdToast.showSimple("Entry added.");
        $state.go("dash.entry-edit", { entryId: data.id });
      },
      function (data, status, headers, config) {
        $mdToast.showSimple("Failed to add entry.");
        form.loading = false;
        form.errors = data;
      }
    );
  };

  constructor();

  $scope.$on("gonevisDash.DolphinService:select", function (data, dolphin) {
    $scope.form.cover_image = dolphin.id;
  });
}

app.controller("EntryNewController", EntryNewController);
EntryNewController.$inject = [
  "$scope",
  "$state",
  "$mdToast",
  "$q",
  "AuthService",
  "API",
  "DolphinService",
  "Codekit"
];
