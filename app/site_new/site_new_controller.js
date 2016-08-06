'use strict';

/**
 * @ngdoc function
 * @name gonevisDash.controller:SiteNewController
 * Controller of the gonevisDash
 *
 * @param $scope
 * @param $rootScope
 * @param $state
 * @param $mdToast
 * @param SiteNewService
 * @param AuthenticationService
 */
function SiteNewController($scope, $rootScope, $state, $mdToast, SiteNewService, AuthenticationService) {

    // Create Site form
    $scope.form = {};


    /**
     * constructor
     *
     * @method constructor
     * @desc Init function for controller
     */
    function constructor() {
        $scope.user = AuthenticationService.getAuthenticatedUser();
    };

    /**
     * createSite
     *
     * @method createSite
     * @desc create site via api call
     *
     * @param form {object}
     */
    $scope.createSite = function(form) {
        form.loading = true;

        SiteNewService.post(form).then(
            function(data, status, headers, config) {
                form.loading = false;
                // Update sites
                $scope.user.sites.push(data.data);

                // Update current user's data
                AuthenticationService.updateAuthentication($scope.user);

                // Show success message
                $mdToast.showSimple('Site ' + data.data.title + ' created');

                // Redirect user to the site that just have been created
                $state.go('dash.entry-new', {s: $scope.user.sites.length -1});
            },
            function(data, status, headers, config) {
                console.log(data.data);
            }
        );
    };

    constructor();
}

app.controller("SiteNewController", SiteNewController);
SiteNewController.$inject = ['$scope', '$rootScope', '$state', '$mdToast', 'SiteNewService', 'AuthenticationService'];
