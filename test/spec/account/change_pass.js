"use strict";


describe("ChangePassController", function () {
  beforeEach(angular.mock.module("gonevisDash"));

  var $controller;
  var $scope;
  var $translate;

  beforeEach(inject(function (_$controller_, _$rootScope_, _$translate_) {
    $controller = _$controller_;
    $scope = _$rootScope_;
    $translate = _$translate_;
  }));

  describe("$scope.changePassword", function () {
    beforeEach(function () {
      var controller = $controller("ChangePassController", { $scope: $scope, $translate: $translate });
    });

    it("error if not a new password", function () {
      var form = {
        old_password: "oldalireza",
        password: "oldalireza",
      };
      $scope.changePassword(form);
      expect(form.errors).toEqual({
        non_field_errors: [$translate.instant("CHANGE_PASSWORD_ERROR_SAME")]
      });
    });

    it("error if passwords don't match", function () {
      var form = {
        old_password: "oldalireza",
        password: "newPassword",
        confirm_password: "newPassword1"
      };
      $scope.changePassword(form);
      expect(form.errors).toEqual({
        non_field_errors: [$translate.instant("CHANGE_PASSWORD_ERROR_MATCH")]
      });
    });

    it("change password successfully", function () {
      var form = {
        old_password: "oldalireza",
        password: "newPassword",
        confirm_password: "newPassword"
      };
      $scope.changePassword(form);

      expect(form.errors).toBe(null);
      expect(form.loading).toBeTruthy();
    });
  });
});
