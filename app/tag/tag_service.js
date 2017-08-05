"use strict";

function Tag($rootScope, $state, toaster, API, ModalsService) {
  return function (data) {
    /**
     * @desc Super variable for getting this in functions
     *
     * @type {Tag}
     */
    var self = this;

    /**
     * @readonly
     * @desc Backend data
     *
     * @type {object}
     */
    this.get = data;

    /**
     * @type {boolean}
     */
    this.isDeleted = false;

    /**
     * @desc Update tag, notify and broadcast for controllers to use.
     *
     * @param {object} form
     */
    this.update = function (form) {
      form.loading = true;
      var slug = form.oldSlug || form.data.slug;

      API.Tag.put({ slug: slug, site: this.get.site }, form.data,
        function (data) {
          self.get = data;
          form.loading = false;
          form.oldSlug = data.slug;
          toaster.info("Done", "Tag updated");
          $rootScope.$broadcast("gonevisDash.Tag:update", {
            data: data,
            tag: self,
            success: true
          });
        },
        function (data) {
          form.loading = false;
          toaster.error("Error", "Something went wrong, we couldn't update tag.");
          $rootScope.$broadcast("gonevisDash.Tag:update", {
            data: data,
            tag: self,
            success: false
          });
        }
      );
    };

    /**
     * @desc Remove tag, notify and broadcast for controllers to use.
     */
    this.remove = function () {
      API.Tag.remove({ slug: this.get.slug, site: this.get.site },
        function (data) {
          self.isDeleted = true;
          toaster.success("Done", "Tag " + self.get.name + " removed.");
          $rootScope.$broadcast("gonevisDash.Tag:remove", {
            data: data,
            tag: self,
            success: false
          });
        }
      );
    };

    /**
     * @desc View tag as modal (detailed mode).
     */
    this.view = function () {
      ModalsService.open("tag", "TagModalController", {
        tag: angular.copy(this)
      });
    };

    /**
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
     * @desc Tag creation modal
     */
    this.viewCreate = function () {
      ModalsService.open("tagCreate", "TagNewModalController");
    };

    /**
     * @desc Tag creation via backend
     *
     * @param {object} form
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
          toaster.success("Done", "Tag " + data.name + " created.");
          $rootScope.$broadcast("gonevisDash.Tag:create", {
            success: true,
            data: data
          });
        },
        function (data) {
          form.loading = false;
          form.errors = data.data;
          toaster.error("Oops", "Failed to create tag");
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
  "toaster",
  "API",
  "ModalsService"
];
