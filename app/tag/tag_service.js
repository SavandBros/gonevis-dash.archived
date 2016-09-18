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
   * create
   *
   * @method create
   * @desc Create a new tag
   *
   * @param form {object}
   */
  function create(form) {
    form.loading = true;
    form.errors = null;

    API.Tags.save({ tag_site: site }, form,
      function (data) {
        form.loading = false;
        form.data = null;
        $rootScope.$broadcast("gonevisDash.TagService:create", data);
        $mdToast.showSimple("Tag " + data.name + " created.");
      },
      function (data) {
        form.loading = false;
        form.data = null;
        form.errors = data.data;
        $mdToast.showSimple("Tag creaton failed.");
      }
    );
  }

  /**
   * remove
   *
   * @method remove
   * @desc delete tag, notify and broadcast for controllers to use.
   *
   * @param tag {Object}
   * @param toast {Boolean}
   */
  function remove(tag, toast) {
    var toast = toast || true;

    API.Tag.delete({ tag_site: tag.site, tag_id: tag.id },
      function (data) {
        if (toast) $mdToast.showSimple("Tag " + tag.name + " Deleted.");
        tag.isDeleted = true;
        $rootScope.$broadcast("gonevisDash.TagService:delete", {
          data: data,
          tag: tag,
          success: true,
        });
      },
      function (data) {
        if (toast) $mdToast.showSimple("Deleting tag failed.");
        $rootScope.$broadcast("gonevisDash.TagService:delete", {
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
   * @desc create tag.
   */
  function viewCreate() {
    ModalsService.open('viewCreate', 'TagCreateModalController');
  };

  return {
    update: update,
    create: create,
    remove: remove,
    view: view,
    viewCreate: viewCreate
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
