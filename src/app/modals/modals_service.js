"use strict";

import app from "../app";

/**
 * @desc Modal service to work with bootstrap's modal
 *       Each modal should have an id same as its template name
 */
function ModalsService($rootScope, ModalService) {

  /**
   * @desc All modal templates are defined here
   *
   * @type {object}
   */
  var templates = {
    dolphin: "dolphin/dolphin_modal/dolphin_modal_view.html",
    dolphinSelection: "dolphin/dolphin_selection.html",
    comment: "comment/comment_modal/comment_modal_view.html",
    tag: "tag/tag_modal/tag_modal_view.html",
    tagCreate: "tag/tag_new_modal/tag_new_modal_view.html",
    invite: "team/invite_modal/invite_modal_view.html",
    forgotPassword: "account/forgot_modal/forgot_modal_view.html",
    siteTemplates: "site/site_templates_modal/site_templates_modal_view.html",
    team: "team/team_modal/team_modal_view.html",
    emailConfirmation: "account/email_confirmation/email_confirmation_modal.html"
  };

  /**
   * @desc Modal instances
   *
   * @type {object}
   */
  var modals = {};

  /**
   * @desc Open up a modal with a template and a controller
   * @example ModalsService.open("dolphin", DolphinModalController)
   *
   * @param {string} template Name of the modal template
   * @param {string} controller Controller of modal
   * @param {object} data
   */
  function open(template, controller, data) {
    ModalService.showModal({
      templateUrl: templates[template],
      controller: controller,
      inputs: data
    }).then(function(modal) {
      modals[template] = modal;
      modals[template].element.modal();

      angular.element("#" + template).on("hidden.bs.modal", function() {
        $rootScope.$broadcast("goNevis.ModalsService.close", template);
      });
    });
  }

  /**
   * @desc Close a modal by it's instance
   *
   * @param {string} template Name of the modal template (instance)
   */
  function close(template) {
    // Trigger the close button
    angular.element("#" + template + " [data-dismiss=modal]").trigger("click");
    // Make sure backdrop is gone
    setTimeout(function() {
      if (!angular.element(".modal.fade.in").length) {
        angular.element("body.backdrop").removeClass("backdrop");
      }
    }, 500);
  }

  return {
    open: open,
    close: close
  };
}

app.factory("ModalsService", ModalsService);
