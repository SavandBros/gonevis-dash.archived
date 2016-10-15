"use strict";

/**
 * Search
 *
 * @class Search
 * @namespace gonevisDash.Search
 *
 * @param $rootScope
 * @param $resource
 * @param Pagination
 *
 * @returns [Factory]
 */
function Search($rootScope, $resource, Pagination) {
  function searchify(form, pageForm, api, data, payload) {
    data = data || {};
    payload = payload || {};

    form = {
      api: api,
      data: data,
      pageForm: pageForm,
      noResult: false,
      payload: payload,
    };

    return form;
  };
}

app.factory("Search", Search);
Search.$inject = [
  "$rootScope",
  "$resource",
  "Pagination"
];
