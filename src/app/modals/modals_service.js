"use strict";

import app from "../app";
import DolphinModalView from "../dolphin/dolphin_modal/dolphin_modal_view.html";
import TagModalView from "../tag/tag_modal/tag_modal_view.html";
import DolphinSelectionView from "../dolphin/dolphin_selection.html";
import CommentModalView from "../comment/comment_modal/comment_modal_view.html";
import InviteModalView from "../team/invite_modal/invite_modal_view.html";
import ForgotPasswordModalView from "../account/forgot_modal/forgot_modal_view.html";
import PaymentValidationModalView from "../site/payment_validation_modal/payment_validation_modal_view.html";
import SiteFollowersModalView from "../site/site_followers/site_followers_view.html";
import SiteTemplatesModalView from "../site/site_templates_modal/site_templates_modal_view.html";
import TeamModalView from "../team/team_modal/team_modal_view.html";
import EmailConfirmationModalView from "../account/email_confirmation/email_confirmation_modal.html";
import PostPreview from "../entry/preview_modal/preview_modal_view.html";
import FeedbackModalView from "../feedback/feedback_view.html";


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
  const templates = {
    dolphin: DolphinModalView,
    dolphinSelection: DolphinSelectionView,
    comment: CommentModalView,
    tag: TagModalView,
    invite: InviteModalView,
    forgotPassword: ForgotPasswordModalView,
    paymentValidation: PaymentValidationModalView,
    siteFollowers: SiteFollowersModalView,
    siteTemplates: SiteTemplatesModalView,
    team: TeamModalView,
    emailConfirmation: EmailConfirmationModalView,
    postPreview: PostPreview,
    feedback: FeedbackModalView
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
      template: templates[template],
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
