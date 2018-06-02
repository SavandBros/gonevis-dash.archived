"use strict";
/* global AuthService */

describe("Dolphin", function () {
  beforeEach(angular.mock.module("gonevisDash"));

  var Dolphin, AuthService;
  var data = { ext: "application/zip" };

  beforeEach(inject(function (_Dolphin_, _AuthService_) {
    Dolphin = _Dolphin_;
    AuthService = _AuthService_;
    AuthService.getCurrentSite = function () {
      return [];
    };
  }));

  it("constructs", function () {
    var dolphin = new Dolphin(data);

    expect(dolphin.extension).toEqual("ZIP");
    expect(dolphin.isDeleted).not.toBeTruthy();
  });
});
