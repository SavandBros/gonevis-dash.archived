"use strict";
/* global AuthService */

describe("EntryController", function () {
  beforeEach(module("gonevisDash"));

  var $controller;
  var $httpBackend;
  var $rootScope;
  var AuthService;

  beforeEach(inject(function (_$controller_, _$httpBackend_, _$rootScope_, _AuthService_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    AuthService = _AuthService_;
  }));

  describe("constructor", function () {
    beforeEach(inject(function () {
      var authService = AuthService;
      authService.getCurrentSite = function () {
        return [];
      };

      var data = {
        results: {
          id: "759f7e29-3de0-4323-9542-8f4e4e7bb2d5",
          tags: [{
            id: "e721b964-728c-4cb1-bb7a-8dfe8236fbf2",
            name: "Good day",
            slug: "good-day",
            description: "",
            meta_title: null,
            meta_description: null,
            site: "572b822b-4d2a-4c8b-bbc5-ff226e269481",
          }],
          title: "Test title",
          slug: "test-title",
          lead: "",
          excerpt: "",
          content: "",
          meta_title: null,
          meta_description: null,
          status: 0,
          comment_enabled: true,
          featured: false,
          password: "",
          publication_date: "2016-10-06T14:14:07.913517Z",
          start_publication: null,
          end_publication: null,
          created: "2016-10-06T14:14:07.917145Z",
          user: "e0144f2a-3018-4b41-96e1-5c4d66b90e9d",
          site: "572b822b-4d2a-4c8b-bbc5-ff226e269481"

        }
      };

      $httpBackend.expectGET("http://127.0.0.1:8000/api/v1/website/entry/").respond(data);
    }));

    it("get data exactly as it is", function () {
      var $scope = $rootScope;
      var authService = AuthService;
      var controller = $controller("EntryController", {
        $scope: $scope,
        AuthService: authService
      });

      $httpBackend.flush();
      expect($scope.nothing).toEqual({ text: "It's lonely here... Try adding some entries!" });
    });
  });
});
