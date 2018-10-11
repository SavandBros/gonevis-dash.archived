"use strict";


describe("FeedbackController", function () {
  beforeEach(angular.mock.module("gonevisDash"));

  var $controller;
  var $scope;
  var $translate;
  var controller;

  beforeEach(inject(function (_$controller_, _$rootScope_, _$translate_) {
    $controller = _$controller_;
    $scope = _$rootScope_;
    $translate = _$translate_;
  }));

  describe("$scope.send", function () {
    beforeEach(function () {
      controller = $controller("FeedbackController", { $scope: $scope, $translate: $translate });
      spyOn(controller, 'raiseError');
    });

    it("should raise error if form message is empty or null or undefined", function () {
      $scope.form = {
        data: {
          message: "",
        },
        sending: false,
        error: null
      };
      $scope.send($scope.form);

      expect(controller.raiseError).toHaveBeenCalled();
      expect($scope.send($scope.form)).toBeFalsy();
    });

    it("should raise error if form message length is less than 10 characters", function () {
      $scope.form = {
        data: {
          message: "123456789",
        },
        sending: false,
        error: null
      };
      $scope.send($scope.form);

      expect(controller.raiseError).toHaveBeenCalled();
      expect($scope.send($scope.form)).toBeFalsy();
    });
  });
});
