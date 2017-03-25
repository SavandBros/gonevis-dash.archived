"use strict";

/**
 * @class ModalsService
 * @desc Modal service to work with bootstrap's modal
 *       Each modal should have an id same as its template name
 *
 * @param ModalService
 */
function ModalsService(ModalService) {

  var templates = {
    dolphin: "dolphin/dolphin_modal/dolphin_modal_view.html",
    dolphinSelection: "dolphin/dolphin_selection.html",
    comment: "comment/comment_modal/comment_modal_view.html",
    tag: "tag/tag_modal/tag_modal_view.html",
    tagCreate: "tag/tag_new_modal/tag_new_modal_view.html",
    invite: "team/invite_modal/invite_modal_view.html",
    forgotPassword: "account/forgot_modal/forgot_modal_view.html",
    siteTemplates: "site/site_templates_modal/site_templates_modal_view.html",
    team: "team/team_modal/team_modal_view.html"
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
    angular.element("#" + template + " [data-dismiss=modal]").trigger("click");
    // Make sure backdrop is gone
    setTimeout(function () {
      if (!angular.element(".modal.fade.in").length) {
        angular.element("body.backdrop").removeClass("backdrop");
      }
    }, 500);
  }

  return {
    open: open,
    close: close,
  };
}

app.factory("ModalsService", ModalsService);
ModalsService.$inject = ["ModalService"];
