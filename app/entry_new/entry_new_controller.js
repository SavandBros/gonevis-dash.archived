'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:EntryNewController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $state
 * @param $mdToast
 * @param AuthenticationService
 * @param API
 */
function EntryNewController($scope, $state, $mdToast, AuthenticationService, API, $q) {

  var tags = [];

  /**
   * constructor
   *
   * @method constructor
   * @desc Init function for controller
   *
   * @memberOf EntryNewController
   */
  function constructor() {

    API.Tags.get({ tag_site: AuthenticationService.getCurrentSite() },
      function (data, status, headers, config) {

        for (var i in data.results) {

          tags.push({ text: data.results[i].slug });
        }
        console.log(tags);

      }
    );
    // Check auth
    if (!AuthenticationService.isAuthenticated()) {
      return $state.go('signin');
    }

    $scope.form = {};

    $scope.statuses = [
      { name: "Draft", id: 0 },
      { name: "Hidden", id: 1 },
      { name: "Published", id: 2 }
    ];
  };

  /**
   * loadTags
   *
   * @method loadTags
   * @desc Load tags via load() function
   */
  $scope.loadTags = function (query) {
    return load();
  };

  /**
   * load
   *
   * @method load
   * @desc get tags from var tags and return a promise
   */
  function load() {
    var deferred = $q.defer();
    deferred.resolve(tags);
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
    form.site = AuthenticationService.getCurrentSite();
    form.tags = tags;

    API.EntryAdd.save(form,
      function (data, status, headers, config) {
        $mdToast.showSimple("Entry added.");
        $state.go('dash.entry-edit', {
          entryId: data.id
        });
      },
      function (data, status, headers, config) {
        $mdToast.showSimple("Failed to add entry.");
        form.loading = false;
        form.errors = data;
      }
    );
  }

  constructor();
}

app.controller("EntryNewController", EntryNewController);
EntryNewController.$inject = ['$scope', '$state', '$mdToast', 'AuthenticationService', 'API', '$q'];
