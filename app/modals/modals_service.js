"use strict";

/**
 * Modals Service
 *
 * @class ModalsService
 * @namespace gonevisDash.ModalsService
 *
 * @param ModalService
 *
 * @returns [Factory]
 */
function ModalsService(ModalService) {

  var templates = {
    dolphin: "dolphin/dolphin_modal/dolphin_modal_view.html",
    dolphinSelection: "dolphin/dolphin_selection.html",
    comment: "comment/comment_modal/comment_modal_view.html",
    tag: "tag/tag_modal/tag_modal_view.html",
    tagCreate: "tag/tag_create_modal/tag_create_modal_view.html",
    sites: "site/sites_modal/site_modal_view.html",
  };

  var modals = {};

  /**
   * open
   *
   * @method open
   * @desc Open up modal with a template and a controller
   *
   * @param template {String} Name of the modal template
   * @param controller {String} Controller of modal
   */
  function open(template, controller, data) {
    ModalService.showModal({
      templateUrl: templates[template],
      controller: controller,
      inputs: data
    }).then(function (modal) {
      modals[template] = modal;
      modals[template].element.modal();
    });
  }

  /**
   * close
   *
   * @method close
   * @desc Close a modal by it's instance
   *
   * @param template {String} Name of the modal template
   */
  function close(template) {
    // Trigger the close button
    angular.element("#" + template + " .close").trigger("click");
    // Make sure backdrop is gone
    setTimeout(function () {
      if (!angular.element(".modal.fade.in").length) {
        angular.element("body.backdrop").removeClass("backdrop");
      };
    }, 500);
  }

  return {
    open: open,
    close: close,
  };
}

app.factory("ModalsService", ModalsService);
ModalsService.$inject = ["ModalService"];
