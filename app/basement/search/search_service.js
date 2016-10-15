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

  /**
   * searchify
   *
   * @method searchify
   * @desc Turn a variable to a search var and return it
   *
   * @param form {Object} Variable to searchify
   * @param api {API} Api label to query
   * @param pageForm {Pagination} Pagination form
   * @param data {Object} API response data
   *
   * @returns {Object}
   */
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
