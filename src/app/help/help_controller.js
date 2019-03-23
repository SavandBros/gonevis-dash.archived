"use strict";

import app from "../app";

function HelpController(ModalsService, $scope) {

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

    $scope.forumLinks = [{
      label: "Homepage",
      link: "https://forum.gonevis.com/",
      special: true,
    }, {
      label: "Create Thread",
      link: "https://forum.gonevis.com/tags",
      special: true,
    }, {
      label: "Features",
      link: "https://forum.gonevis.com/t/feature-requests",
    }, {
      label: "Suggestions",
      link: "https://forum.gonevis.com/t/suggestions",
    }, {
      label: "Bugs",
      link: "https://forum.gonevis.com/t/bugs",
    }, {
      label: "In Progress",
      link: "https://forum.gonevis.com/t/in-progress",
    }];
  }

  /**
   * Open feedback modal
   */
  $scope.feedback = function () {
    ModalsService.open("feedback", "FeedbackController");
  };

  constructor();
}

app.controller("HelpController", HelpController);
