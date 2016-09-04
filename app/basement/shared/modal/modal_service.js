/*global angular*/
'use strict';

function ModalService($scope, ModalService) {

  var show = function (controller, template) {
    ModalService.showModal({
      templateUrl: template,
      controller: controller
    }).then(function (modal) {
      modal.element.modal();
    });
  };

  return {
    show: show
  };
}

app.service('ModalService', ModalService);
ModalService.$inject = ['$scope', 'ModalService'];
