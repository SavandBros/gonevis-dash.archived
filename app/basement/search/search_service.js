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

  /**
   * submit
   *
   * @method submit
   * @desc Search data and broadcast
   *
   * @param form {Object} Main searchified variable
   */
  function submit(form) {
    var payload = angular.extend({ search: form.query }, form.payload);

    form.api(payload,
      function (data) {
        form.data = data;
        form.searchedQuery = form.query;

        if (!data.results.length) {
          form.noResult = true;
        } else {
          form.noResult = false;
        }

        $rootScope.$broadcast("gonevisDash.Search:submit", {
          success: true,
          data: data,
          pageForm: Pagination.paginate(form.pageForm, data, payload),
          form: form
        });
      }
    );
  };

  return {
    searchify: searchify,
    submit: submit
  };
}

app.factory("Search", Search);
Search.$inject = [
  "$rootScope",
  "$resource",
  "Pagination"
];
