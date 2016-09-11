'use strict';

/**
 * API Service
 *
 * @class API
 * @namespace gonevisDash:API
 *
 * @param ModalService
 *
 * @returns [Factory]
 */
function ModalsService(ModalService) {

  var templates = {
    dolphin: "dolphin/modals/dolphin/dolphin_view.html",
    comment: "comment/modals/comment/comment_view.html",
    tag: "tag/modals/tag/tag_view.html",
  };

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
      modal.element.modal();
    });
  };

  return {
    open: open
  };
}

app.factory('ModalsService', ModalsService);
ModalsService.$inject = ['ModalService'];
