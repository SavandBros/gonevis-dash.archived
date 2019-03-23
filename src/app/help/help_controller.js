"use strict";

import app from "../app";

function HelpController($scope) {

  function constructor() {

    /**
     * Links related to getting started on GoNevis
     * @type {{link: string, label: string}[]}
     */
    $scope.getStartedLinks = [{
      label: "Update your blog settings",
      link: "https://support.gonevis.com/1-update-your-blog-settings-getting-started-on-gonevis/",
    }, {
      label: "Start writing",
      link: "https://support.gonevis.com/2-start-writing-getting-started-on-gonevis/",
    }, {
      label: "Manage your blog",
      link: "https://support.gonevis.com/3-manage-your-blog-getting-started-on-gonevis/"
    }];
  }

  constructor();
}

app.controller("HelpController", HelpController);
