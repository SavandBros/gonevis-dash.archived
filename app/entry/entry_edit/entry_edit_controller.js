"use strict";

/**
 * @ngdoc function
 * @name gonevisDash.controller:EntryEditController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $stateParams
 * @param $mdToast
 * @param Codekit
 * @param API
 * @param AuthService
 * @oaram DolphinService
 */
function EntryEditController($scope, $rootScope, $state, $stateParams, $mdToast,
  Codekit, API, AuthService, DolphinService, $q) {

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.dolphinService = DolphinService;
    $scope.editing = true;
    $scope.tags = [];
    $scope.tagsToSubmit = [];
    $scope.statuses = Codekit.entryStatuses;
    $scope.form = {
      id: $stateParams.entryId,
      site: AuthService.getCurrentSite(),
    };

    API.Tags.get({ tag_site: AuthService.getCurrentSite() },
      function (data) {
        for (var i in data.results) {
          $scope.tags.push({ slug: data.results[i].slug, id: data.results[i].id, name: data.results[i].name, });
        }
      }
    );

    API.Entry.get({ entry_id: $scope.form.id },
      function (data) {
        if (data.start_publication) {
          data.start_publication = new Date(data.start_publication);
        }
        if (data.end_publication) {
          data.end_publication = new Date(data.end_publication);
        }
        $scope.form = data;
      }
    );
  }

  $scope.loadTags = function (query) {
    return load();
  };

  function load() {
    var deferred = $q.defer();
    deferred.resolve($scope.tags);
    return deferred.promise;
  }

  /**
   * update
   *
   * @method update
   * @desc Update entry API callback
   * 
   * @param form {object}
   */
  $scope.update = function (form) {
    form.loading = true;

    var payload = form;
    payload.tag_ids = [];


    for (var i = 0; i < $scope.tagsToSubmit.length; i++) {
      payload.tag_ids.push($scope.tagsToSubmit[i].id);
    }

    API.Entry.put({ entry_id: payload.id }, payload,
      function () {
        $mdToast.showSimple("Entry updated!");
        form.loading = false;
        form.errors = null;
      },
      function (data) {
        $mdToast.showSimple("Sorry, entry couldn't be updated. Try again.");
        form.loading = false;
        form.errors = data.data;
      }
    );
  }

  /**
   * remove
   *
   * @method remove
   * @desc remove entry via api call
   * 
   * @param id {string} UUID of entry
   */
  $scope.remove = function (id) {
    API.Entry.delete({ entry_id: id },
      function () {
        $mdToast.showSimple("Entry has been deleted !");
        $state.go("dash.entry-list");
      },
      function () {
        $mdToast.showSimple("Something went wrong... We couldn't delete entry!");
      }
    );
  };

  $scope.$on("gonevisDash.DolphinService:select", function (data, dolphin) {
    $scope.form.cover_image = dolphin.id;
  });

  constructor()
}

app.controller("EntryEditController", EntryEditController);
EntryEditController.$inject = [
  "$scope",
  "$rootScope",
  "$state",
  "$stateParams",
  "$mdToast",
  "Codekit",
  "API",
  "AuthService",
  "DolphinService",
  "$q"
];
