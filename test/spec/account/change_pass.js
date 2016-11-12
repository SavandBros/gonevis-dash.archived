"use strict";

describe("ChangePassController", function () {
  beforeEach(
    module("gonevisDash")
  );

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

    it("is a new password", function () {
      var form = {
        old_password: "oldalireza",
        password: "oldalireza",
      };
      var result = $scope.changePassword(form);
      expect(result).toEqual({ non_field_errors: ["Please, choose a new password."] });
    });

    it("check if Confirm new password and new password were matched, if so raise an error", function () {
      var form = {
        old_password: "oldalireza",
        password: "newPassword",
        confirm_password: "newPassword1"
      };
      var result = $scope.changePassword(form);

      expect(result).toEqual({ non_field_errors: ["Confirm password does not match."] });
    });

    it("change password successfully", function () {
      var form = {
        old_password: "oldalireza",
        password: "newPassword",
        confirm_password: "newPassword"
      };
      var result = $scope.changePassword(form);

      expect(result).toBe(undefined);
      expect(form.errors).toBe(null);
      expect(form.loading).toBe(true);
    });
  });
});
