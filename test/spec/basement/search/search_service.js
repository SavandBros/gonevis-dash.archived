"use strict";

describe("search service", function () {
  var search;

  beforeEach(module("gonevisDash"));

  beforeEach(inject(function (_Search_) {
    search = _Search_;
  }));

  it("should searchify and have no result", function () {
    var searchForm = search.searchify(searchForm, {}, {}, {}, {});
    expect(searchForm.noResult).toEqual(true);
  });

  it("should searchify and have result", function () {
    var data = { results: ["item"] };
    var searchForm = search.searchify(searchForm, {}, {}, data, {});
    expect(searchForm.noResult).toEqual(false);
    expect(searchForm.data.results.length).toEqual(1);
  });
});
