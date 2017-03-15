"use strict";

/**
 * @class Tag
 *
 * @param $rootScope
 * @param $state
 * @param $mdToast
 * @param API
 * @param ModalsService
 */
function Tag($rootScope, $state, $mdToast, API, ModalsService) {
  return function (data) {
    /**
     * @name self
     * @desc Super variable for getting this in functions
     *
     * @type {Tag}
     */
    var self = this;

    /**
     * @name data
     * @desc Backend data
     *
     * @type {Object}
     */
    this.get = data;

    /**
     * @name isDeleted
     * @type {Boolean}
     */
    this.isDeleted = false;

    /**
     * @method update
     * @desc Update tag, notify and broadcast for controllers to use.
     *
     * @param form {Object}
     * @param toast {Boolean}
     */
    this.update = function (form) {
      form.loading = true;
      var slug = form.oldSlug || form.data.slug;

      API.Tag.put({ slug: slug, site: this.get.site }, form.data,
        function (data) {
          self.get = data;
          form.loading = false;
          form.oldSlug = data.slug;
          $mdToast.showSimple("Tag updated.");
          $rootScope.$broadcast("gonevisDash.Tag:update", {
            data: data,
            tag: self,
            success: true,
          });
        },
        function (data) {
          form.loading = false;
          $mdToast.showSimple("Tag update failed.");
          $rootScope.$broadcast("gonevisDash.Tag:update", {
            data: data,
            tag: self,
            success: false,
          });
        }
      );
    };

    /**
     * @method remove
     * @desc Remove tag, notify and broadcast for controllers to use.
     */
    this.remove = function () {
      API.Tag.remove({ slug: this.get.slug, site: this.get.site },
        function (data) {
          this.isDeleted = true;
          $mdToast.showSimple("Tag " + this.get.name + " removed.");
          $rootScope.$broadcast("gonevisDash.Tag:remove", {
            data: data,
            tag: this,
            success: false,
          });
        }
      );
    };

    /**
     * @method view
     * @desc View tag as modal (detailed mode).
     */
    this.view = function () {
      ModalsService.open("tag", "TagModalController", {
        tag: angular.copy(this)
      });
    };

    /**
     * @method addToNavigation
     * @desc Add tag to navigation
     */
    this.addToNavigation = function () {
      $state.go("dash.navigation", {
        add: {
          label: this.get.name,
          url: "/tag/" + this.get.slug
        }
      });
    };

    /**
     * @method viewCreate
     * @desc Tag creation modal
     */
    this.viewCreate = function () {
      ModalsService.open("tagCreate", "TagNewModalController");
    };

    /**
     * @method create
     * @desc Tag creation via backend
     *
     * @param form {Object}
     */
    this.create = function (form) {
      form.loading = true;
      form.errors = null;

      form.data.slug = form.data.slug ? form.data.slug : "";

      API.Tags.save({ site: form.data.site }, form.data,
        function (data) {
          form.loading = false;
          form.data.tagged_items_count = 0;
          ModalsService.close("tagCreate");
          $mdToast.showSimple("Tag " + data.name + " created.");
          $rootScope.$broadcast("gonevisDash.Tag:create", {
            success: true,
            data: data
          });
        },
        function (data) {
          form.loading = false;
          form.errors = data.data;
          $mdToast.showSimple("Failed to create tag.");
          $rootScope.$broadcast("gonevisDash.Tag:create", {
            success: false,
            data: data
          });
        }
      );
    };
  };
}

app.service("Tag", Tag);
Tag.$inject = [
  "$rootScope",
  "$state",
  "$mdToast",
  "API",
  "ModalsService"
];
