/*global angular*/
'use strict';

function ModalService($scope, ModalService) {

  var show = function (controller, template) {
    ModalService.showModal({
      templateUrl: template,
      controller: controller
    }).then(function (modal) {
      modal.element.modal();
      modal.close.then(function (result) {
        $rootScope.$broadcast(result.broadcast);
      });
    });
  };

  return {
    show: show
  };
}

app.factory('ModalService', ModalService);
ModalService.$inject = ['$scope', 'ModalService'];
