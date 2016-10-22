"use strict";
/* global AuthService */

describe("EntryEditController", function () {
  beforeEach(module("gonevisDash"));

  var $controller;
  var $httpBackend;
  var $rootScope;
  var AuthService;
  var data;

  beforeEach(inject(function (_$controller_, _$httpBackend_, _$rootScope_, _AuthService_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    AuthService = _AuthService_;
  }));

  describe("$scope.update", function () {
    beforeEach(inject(function () {
      var authService = AuthService;
      authService.getCurrentSite = function () {
        return [];
      };

      data = {
        id: "99756cbd-e392-410b-8f57-a34107933604",
        title: "Updated title",
        tags: [],
        slug: "Updated-title",
        content: "",
        meta_title: "Updated meta title",
        meta_description: null,
        status: 0,
        comment_enabled: false,
        featured: true,
        created: "2016-10-21T14:18:40.610218Z",
        user: "ddeb5bf0-8bc3-4999-856c-43d6fbd98001",
        site: "697a224d-942d-42ea-b482-436b82c26fc8"
      };

      $httpBackend.expectGET("http://127.0.0.1:8000/api/v1/tagool/tag/").respond();
      $httpBackend.expectGET("http://127.0.0.1:8000/api/v1/website/entry/").respond();
      $httpBackend.expectPUT("http://127.0.0.1:8000/api/v1/website/entry/99756cbd-e392-410b-8f57-a34107933604/").respond(data);
    }));

    it("should update entry", function () {
      var $scope = $rootScope;
      var authService = AuthService;
      var controller = $controller("EntryEditController", {
        $scope: $scope,
        AuthService: authService
      });
      var form = { id: "99756cbd-e392-410b-8f57-a34107933604" };
      $scope.update(form);
      $httpBackend.flush();

      expect(form.errors).toBe(null);
      expect(form.loading).toBe(false);
      expect(form.id).toEqual("99756cbd-e392-410b-8f57-a34107933604");
    });
  });
});
