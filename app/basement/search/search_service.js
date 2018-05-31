"use strict";

var app = require("../../app_module");


/**
 * @desc Search service for controllers:
 *       Inject the Search to controller
 *       Define a scope var to use its search property
 *       Use that variable after getting the initial items via API using Search.searchify()
 *       Include the search form template in the view
 *       Include the search noresult template in the view
 *       Watch the gonevisDash.Search:submit to update the current data
 *       Also update controller's pageForm variable to data.form.pageForm
 */
function Search($rootScope, Pagination) {

  /**
   * @desc Turn a variable to a search var and return it
   *
   * @param {object} form Variable to searchify
   * @param {api} api Api label to query
   * @param {pagination} pageForm Pagination form
   * @param {object} data API response data
   * @param {object} payload
   *
   * @returns {object}
   */
  function searchify(form, pageForm, api, data, payload) {
    data = data || {
      results: []
    };
    payload = payload || {};

    form = {
      api: api,
      data: data,
      pageForm: pageForm,
      noResult: false,
      payload: payload
    };

    if (!data.results) {
      form.noResult = true;
    }

    return form;
  }

  /**
   * @desc Search data and broadcast
   *
   * @param {object} form Main searchified variable
   */
  function submit(form) {
    var payload = angular.extend({
      search: form.query
    }, form.payload);

    form.api(payload,
      function(data) {
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
  }

  return {
    searchify: searchify,
    submit: submit
  };
}

app.factory("Search", Search);
Search.$inject = [
  "$rootScope",
  "Pagination"
];

module.exports = Search;
