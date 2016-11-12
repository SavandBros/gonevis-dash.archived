"use strict";

describe("ChangePassController", function () {
  beforeEach(module("gonevisDash"));

  var $controller;
  var $scope;

  beforeEach(inject(function (_$controller_, _$rootScope_) {
    $controller = _$controller_;
    $scope = _$rootScope_;
  }));

  describe("$scope.changePassword", function () {
    beforeEach(function () {
      var controller = $controller("ChangePassController", { $scope: $scope });
    });

    it("error if not a new password", function () {
      var form = {
        old_password: "oldalireza",
        password: "oldalireza",
      };
      $scope.changePassword(form);
      expect(form.errors).toEqual({ non_field_errors: ["Please, choose a new password."] });
    });

    it("error if passwords don't match", function () {
      var form = {
        old_password: "oldalireza",
        password: "newPassword",
        confirm_password: "newPassword1"
      };
      $scope.changePassword(form);
      expect(form.errors).toEqual({ non_field_errors: ["Confirm password does not match."] });
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
