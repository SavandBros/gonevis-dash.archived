"use strict";

describe("Account", function () {
  beforeEach(module("gonevisDash"));

  var Account;
  var account;
  var data;
  var localStorageService;
  var store = {};

  beforeEach(inject(function (_localStorageService_, _Account_) {
    Account = _Account_;
    localStorageService = _localStorageService_;

    spyOn(localStorageService, "get").and.callFake(function (key) {
      return store[key];
    });

    spyOn(localStorageService, "set").and.callFake(function (key, value) {
      store[key] = value.toString();
    });

    data = {
      name: "Arsalan Savand",
      get_absolute_uri: "fake-uri",
      username: "arsalan",
      media: {
        picture: "fake-url-picture",
        thumbnail_256x256: "fake-url-256",
        thumbnail_128x128: "fake-url-128",
        thumbnail_48x48: "fake-url-48"
      },
      sites: [{
        id: "fake-id",
        role: 0,
        title: "Fake Title",
        url: "fake-url"
      }]
    };

    account = new Account(data);
  }));

  describe("url", function () {
    it("should return url", function () {
      expect(account.url).toBe("fake-uri");
    });
  });
  
  describe("hasMedia", function () {
    it("should return image url", function () {
      expect(account.hasMedia).toBeTruthy();
    });

    it("should return null", function () {
      data.media.picture = null;
      data.media.thumbnail_256x256 = null;
      data.media.thumbnail_128x128 = null;
      data.media.thumbnail_48x48 = null;

      account = new Account(data);

      expect(account.hasMedia).toBeFalsy();
    });
  });

  describe("getMedia", function () {
    it("should return image url by size", function () {
      expect(account.getMedia("full")).toBe("fake-url-picture");
      expect(account.getMedia("medium")).toBe("fake-url-256");
      expect(account.getMedia("small")).toBe("fake-url-128");
      expect(account.getMedia("tiny")).toBe("fake-url-48");
    });

    it("should return default image", function () {
      data.media.picture = null;
      data.media.thumbnail_256x256 = null;
      data.media.thumbnail_128x128 = null;
      data.media.thumbnail_48x48 = null;

      account = new Account(data);

      expect(account.getMedia("full")).toBe("assets/img/avatar.png");
      expect(account.getMedia("medium")).toBe("assets/img/avatar.png");
      expect(account.getMedia("small")).toBe("assets/img/avatar.png");
      expect(account.getMedia("tiny")).toBe("assets/img/avatar.png");
    });
  });

  describe("getFirstName", function () {
    it("should return first part of the name", function () {
      expect(account.getFirstName()).toEqual("Arsalan");
    });

    it("should return false", function () {
      delete data.name;
      account = new Account(data);

      expect(account.getFirstName()).toBeFalsy();
    });
  });

  describe("getFullName", function () {
    it("should return name", function () {
      expect(account.getFullName()).toEqual("Arsalan Savand");
    });

    it("should return username", function () {
      delete data.name;
      account = new Account(data);

      expect(account.getFullName()).toBe("arsalan");
    });
  });

  describe("getDisplayName", function () {
    it("should return first name", function () {
      expect(account.getDisplayName()).toEqual("Arsalan");
    });

    it("should return username", function () {
      delete data.name;
      account = new Account(data);

      expect(account.getDisplayName()).toBe("arsalan");
    });
  });

  describe("getSites", function () {
    it("should return sites", function () {
      expect(account.getSites()).toEqual([{
        id: "fake-id",
        role: 0,
        title: "Fake Title",
        url: "fake-url"
      }]);
    });

    it("should return empty list", function () {
      data.sites = [];
      account = new Account(data);

      expect(account.getSites().length).toBe(0);
    });
  });
});
