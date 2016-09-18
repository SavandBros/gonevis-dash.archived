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
function TagService($rootScope, $mdToast, API, ModalsService, AuthService) {
  var site = AuthService.getCurrentSite();

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
   * remove
   *
   * @method remove
   * @desc Remove tag, notify and broadcast for controllers to use.
   *
   * @param tag {Object}
   * @param toast {Boolean}
   */
  function remove(tag, toast) {
    var toast = toast || true;

    API.Tag.remove({ tag_site: tag.site, tag_id: tag.id },
      function (data) {
        if (toast) $mdToast.showSimple("Tag " + tag.name + " removed.");
        tag.isDeleted = true;
        $rootScope.$broadcast("gonevisDash.TagService:remove", {
          data: data,
          tag: tag,
          success: true,
        });
      },
      function (data) {
        if (toast) $mdToast.showSimple("Deleting tag failed.");
        $rootScope.$broadcast("gonevisDash.TagService:remove", {
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
    ModalsService.open('tag', 'TagModalController', { tag: tag });
  };

  /**
   * viewCreate
   *
   * @method viewCreate
   * @desc Tag creation modal
   */
  function viewCreate() {
    ModalsService.open('tagCreate', 'TagCreateModalController');
  };

  /**
   * create
   *
   * @method create
   * @desc Tag creation for broadcast and toast
   *
   * @param form {Object}
   * @param data {Object}
   */
  function create(form, data) {
    $rootScope.$broadcast("gonevisDash.TagService:create", {
      success: true,
      data: data,
      tag: form.data
    });

    $mdToast.showSimple("Tag " + data.name + " created.");
  }

  return {
    update: update,
    remove: remove,
    view: view,
    viewCreate: viewCreate,
    create,
  };
}

app.factory('TagService', TagService);
TagService.$inject = [
  '$rootScope',
  '$mdToast',
  'API',
  'ModalsService',
  'AuthService'
];
