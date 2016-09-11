'use strict';

/**
 * Tag Service
 *
 * @class TagService
 * @namespace gonevisDash.TagService
 *
 * @param $rootScope
 * @param $mdToast
 * @param API
 * @param ModalsService
 *
 * @returns [Factory]
 */
function TagService($rootScope, $mdToast, API, ModalsService) {


  /**
   * update
   *
   * @method update
   * @desc Update tag, notify and broadcast for controllers to use.
   *
   * @param tag {Object}
   * @param toast {Boolean}
   */
  function update(tag, toast) {
    var toast = toast || true;

    API.Tag.put({ tag_site: tag.site, tag_id: tag.id }, tag,
      function (data) {
        if (toast) $mdToast.showSimple("Tag updated.");
        $rootScope.$broadcast("gonevisDash.TagService:update", {
          data: data,
          tag: tag,
          success: true,
        });
      },
      function (data) {
        if (toast) $mdToast.showSimple("Tag update failed.");
        $rootScope.$broadcast("gonevisDash.TagService:update", {
          data: data,
          tag: tag,
          success: false,
        });
      }
    );
  };

  /**
   * view
   *
   * @method view
   * @desc View tag as modal (detailed mode).
   *
   * @param tag {Object}
   */
  function view(tag) {
    ModalsService.open('tag', 'TagController', { tag: tag });
  };


  return {
    update: update,
    view: view,
  };
}

app.factory('TagService', TagService);
TagService.$inject = [
  '$rootScope',
  '$mdToast',
  'API',
  'ModalsService'
];
