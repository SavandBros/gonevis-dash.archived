"use strict";

/**
 * Pagination
 *
 * @class Pagination
 * @namespace gonevisDash.Pagination
 *
 * @param $resource
 * @param $rootScope
 *
 * @returns [Factory]
 */

  /**
   * paginate
   *
   * @method paginate
   * @desc Add pagination vars for given form
   *
   * @param form {Object} Form data for API
   * @param data {Object} Data response of API
   * @param payload {Object}
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

  function loadMore(form) {
    $resource(form.page.next).get(form.page.payload,
      function (data) {
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
}

app.factory("Pagination", Pagination);
Pagination.$inject = [
  "$resource",
  "$rootScope"
];
