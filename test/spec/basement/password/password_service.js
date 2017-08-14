"use strict";

describe("Password", function () {
  beforeEach(module("gonevisDash"));

  var Password;
  var password;
  var localStorageService;
  var store = {};

  beforeEach(inject(function (_localStorageService_, _Password_) {
    Password = _Password_;
    localStorageService = _localStorageService_;

    spyOn(localStorageService, "get").and.callFake(function (key) {
      return store[key];
    });

    spyOn(localStorageService, "set").and.callFake(function (key, value) {
      store[key] = value.toString();
    });

    password = new Password();
  }));
});
