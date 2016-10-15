"use strict";
/* global AuthService */

describe("DolphinController", function () {
  beforeEach(module("gonevisDash"));

  var $controller;
  var $rootScope;

  beforeEach(inject(function (_$controller_, _$rootScope_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
  }));

  describe("$scope.updateDolphins", function () {
      var authService = AuthService;
      authService.getCurrentSite = function () {
        return [];
      };

    it("slice and set new data", function () {
      var $scope = $rootScope;
      $scope.dolphins = [
        { ext: "application/zip" },
      ];

      var controller = $controller("DolphinController", { // jshint ignore:line
        $scope: $scope,
        AuthService: authService
      });

      $scope.updateDolphins();
      expect($scope.dolphins[0].extRaw).toEqual("ZIP");
    });
  });
});
