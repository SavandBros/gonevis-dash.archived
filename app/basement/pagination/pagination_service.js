"use strict";

var app = require("../../app_module");


function Pagination($resource, $rootScope) {

  /**
   * @desc Add pagination vars for given form
   *
   * @param {object} form Form data for API
   * @param {object} data Data response of API
   * @param {object} payload
   */
  function paginate(form, data, payload) {
    form.page = {
      next: data.next,
      prev: data.prev,
      payload: payload,
      loading: false,
      noMore: true,
    };
    if (data.next) form.page.noMore = false;
    return form;
  }

  /**
   * @desc Loadmore function based on pagination vars in form data
   *
   * @param {object} form Form data for API
   */
  function loadMore(form) {
    $resource(form.page.next).get(form.page.payload,
      function(data) {
        form = paginate(form, data, form.page.payload);
        $rootScope.$broadcast("gonevisDash.Pagination:loadedMore", {
          success: true,
          data: data,
          page: form.page
        });
      }
    );
    form.page.loading = true;
    return form;
  }

  return {
    paginate: paginate,
    loadMore: loadMore
  };
}

app.factory("Pagination", Pagination);
Pagination.$inject = [
  "$resource",
  "$rootScope"
];

module.exports = Pagination;
