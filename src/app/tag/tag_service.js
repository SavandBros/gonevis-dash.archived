"use strict";

import app from "../app";

function Tag($rootScope, $state, toaster, API, ModalsService, $translate) {
  return function(data) {
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
    this.update = function(form) {
      form.loading = true;
      var slug = form.oldSlug || form.data.slug;

      API.Tag.put({
          slug: slug,
          site: this.get.site
        }, form.data,
        function(data) {
          self.get = data;
          form.loading = false;
          form.oldSlug = data.slug;
          $translate(["DONE", "TAG_UPDATED"]).then(function(translations) {
            toaster.info(translations.DONE, translations.TAG_UPDATED);
          });
          $rootScope.$broadcast("gonevisDash.Tag:update", {
            data: data,
            tag: self,
            success: true
          });
        },
        function(data) {
          form.loading = false;
          $translate(["ERROR", "TAG_UPDATE_ERROR"]).then(function(translations) {
            toaster.error(translations.ERROR, translations.TAG_UPDATE_ERROR);
          });
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
    this.remove = function() {
      API.Tag.remove({
          slug: this.get.slug,
          site: this.get.site
        },
        function(data) {
          self.isDeleted = true;
          $translate(["DONE", "TAG_REMOVED"]).then(function(translations) {
            toaster.success(translations.DONE, translations.TAG_REMOVED);
          });
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
     *
     * @param {boolean} editing
     */
    this.view = function(editing) {
      var param = {};

      if (editing) {
        param.paramTag = angular.copy(this);
      } else {
        param.paramTag = null;
      }

      ModalsService.open("tag", "TagModalController", param);
    };

    /**
     * @desc Add tag to navigation
     */
    this.addToNavigation = function() {
      $state.go("dash.navigation", {
        add: {
          label: this.get.name,
          url: "/tag/" + this.get.slug
        }
      });
    };

    /**
     * @desc Tag creation via backend
     *
     * @param {object} form
     */
    this.create = function(form) {
      form.loading = true;
      form.errors = null;

      form.data.slug = form.data.slug ? form.data.slug : "";

      API.Tags.save({
          site: form.data.site
        }, form.data,
        function(data) {
          form.loading = false;
          form.data.tagged_items_count = 0;
          ModalsService.close("tag");
          $translate(["DONE", "TAG_CREATED"]).then(function(translations) {
            toaster.success(translations.DONE, translations.TAG_CREATED);
          });
          $rootScope.$broadcast("gonevisDash.Tag:create", {
            success: true,
            data: data
          });
        },
        function(data) {
          form.loading = false;
          form.errors = data.data;
          $translate(["OOPS", "TAG_CREATION_ERROR"]).then(function(translations) {
            toaster.error(translations.OOPS, translations.TAG_CREATION_ERROR);
          });
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
