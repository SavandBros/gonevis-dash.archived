"use strict";

describe("Password", function () {
  beforeEach(angular.mock.module("gonevisDash"));

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

  describe("isValid", function () {
    it("should validate password", function () {
      password.password = "hello, I'm valid and long";
      expect(password.isValid()).toBeTruthy();

      password.password = "short";
      expect(password.isValid()).toBeFalsy();

      password.password = null;
      expect(password.isValid()).toBeFalsy();
    });
  });

  describe("getColor", function () {
    it("should get color based on strength", function () {
      password.strength = 4;
      expect(password.getColor()).toBe("info");

      password.strength = 1;
      expect(password.getColor()).toBe("danger");

      password.strength = 5;
      expect(password.getColor()).toBe("success");
    });
  });

  describe("getPercentage", function () {
    it("should return strength percentage", function () {
      password.password = "pass";
      expect(password.getPercentage()).toEqual(20);

      password.password = "password";
      expect(password.getPercentage()).toEqual(40);

      password.password = "password1";
      expect(password.getPercentage()).toEqual(60);

      password.password = "Password1";
      expect(password.getPercentage()).toEqual(80);

      password.password = "Password1$";
      expect(password.getPercentage()).toEqual(100);
    });
  });
  
  describe("getStrength", function () {
    it("should return password strength", function () {
      password.password = "";
      expect(password.getStrength()).toEqual(null);

      password.password = "long and simple password";
      expect(password.getStrength()).toEqual("Weak");

      password.password = "Long & excellent passw0rd";
      expect(password.getStrength()).toEqual("Excellent");
    });
  });
});
