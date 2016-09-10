'use strict';

/**
 * API Service
 *
 * @returns {{Service: API.service}}
 */
function ModalsService(ModalService) {

  var templates = {
    dolphin: "dolphin/modals/dolphin/dolphin_view.html",
    comment: "comment/modals/comment/comment_view.html"
  };

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
