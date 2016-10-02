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

  /**
   * loadMore
   *
   * @method loadMore
   * @desc Loadmore function based on pagination vars in form data
   *
   * @param form {Object} Form data for API
   */
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
