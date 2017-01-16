"use strict";

/**
 * @class EmailConfirmationController
 *
 * @param $scope
 * @param $state
 * @param API
 * @param $mdToast
 */
function EmailConfirmationController($scope, $state, API, $mdToast) {

  /**
   * @method constructor
   * @desc Init function for controller
   */
  function constructor() {
    $scope.loading = true;
    API.EmailConfirmation.get({token: $state.params.token}, {},
      function () {
        $scope.loading = false;
        $mdToast.show(
          $mdToast.simple()
            .textContent('Thanks for confirming your email, please login with your credentials.')
            .hideDelay(10000)
        );
        $state.go("signin");
      }, function () {
        $scope.loading = false;
        $scope.error = true;
      }
    );
  }

  /**
   * @method resend
   * @desc Resend email confirmation
   *
   * @param form {Object}
   */
  $scope.resend = function (form) {
    API.EmailConfirmationResend.save({email: form.email},
      function () {
        $mdToast.showSimple("Email confirmation has been sent to you.");
        $state.go('signin');
      }, function (data) {
        form.errors = data.data;
      }
    )
  };

  constructor();
}

app.controller("EmailConfirmationController", EmailConfirmationController);
EmailConfirmationController.$inject = [
  "$scope",
  "$state",
  "API",
  "$mdToast"
];
