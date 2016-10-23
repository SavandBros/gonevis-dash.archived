"use strict";

describe("search service", function () {
  var search;
  var $httpBackend;
  var apiToQuery;

  beforeEach(module("gonevisDash"));

  beforeEach(inject(function (_Search_, _$httpBackend_, _$resource_) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/search').respond({ results: ["item"] });
    search = _Search_;
    apiToQuery = _$resource_('/search');
  }));

  it("should searchify without result", function () {
    var searchForm = search.searchify(searchForm, {}, {}, {}, {});
    expect(searchForm.noResult).toEqual(true);
  });

  it("should searchify with result", function () {
    var data = { results: ["item"] };
    var searchForm = search.searchify(searchForm, {}, {}, data, {});
    expect(searchForm.noResult).toEqual(false);
    expect(searchForm.data.results.length).toEqual(1);
  });
});
