"use strict";

function Tour($timeout, TourStep, AuthService) {
  return function(name, steps) {

    /**
     * @private
     */
    var self = this;

    /**
     * @desc Backend key name
     * @type {string}
     */
    this.name = name;

    /**
     * @type {array}
     */
    this.steps = [];

    /**
     * @type {number}
     */
    this.step = 0;

    /**
     * @type {function}
     * @returns {TourStep}
     */
    this.getStep = function() {
      return this.steps[this.step];
    };

    /**
     * @type {function}
     */
    this.nextStep = function() {
      // Hide old step
      self.getStep().hide();
      // If this is the last step
      if (self.step === self.steps.length - 2) {
        // Done with tour
        AuthService.setTourStatus(self.name, true);
      }
      // If this is the last step to hide popover for this view
      if (self.step === self.steps.length - 1) {
        return;
      }
      // Next step
      this.step++;
      // Show new step after animation
      $timeout(function() {
        self.getStep().show();
      }, 1000);
    };

    /**
     * @private
     * @type {function}
     */
    var constructor = function() {
      // Instantiate steps
      angular.forEach(steps, function(step) {
        self.steps.push(new TourStep(step[0], step[1], step[2], step[3]));
      });
      // Keep it in header so it doesn't get destroyed
      self.steps.push(new TourStep(".popover-hideout", "none", "none", null, true));
      // Start the tour
      self.getStep().show();
    };

    constructor();
  };
}

app.service("Tour", Tour);
Tour.$inject = [
  "$timeout",
  "TourStep",
  "AuthService"
];

function TourService(Tour, AuthService) {

  /**
   * @desc Check if current view has tours and show if user didn't complete them
   *
   * @param {string} tourName
   *
   * @returns {Tour|boolean}
   */
  function checkForView(tourName) {
    var steps;

    // Tours for main view
    if (tourName === "main") {
      steps = [
        ["#entries", "Posts Overview", "Posts are listed here, click on them to open in editor.<br><br>On the right side, you can see the likes, comments and views counter."],
        ["#site", "Site Overview", "You can see your followers and current template.<br><br>Click on the header for the full settings page."],
      ];
    }

    // Tours for files view
    // if (tourName === "files") {
    //   steps = [
    //     ["#dolphin .search-form", "Search", "Start typing to search through your files.", "bottom"],
    //     ["#dolphin .view-buttons", "Layout", "Choose between grid layout or listview.", "bottom"]
    //   ];
    // }

    // If already done or no tour for this view
    if (!steps || AuthService.getTourStatus(tourName)) {
      return false;
    }

    // Intiate the tour
    return new Tour(tourName, steps);
  }

  /**
   * @desc Check if any tour is running
   * @returns {boolean}
   */
  function isTourOn() {
    return angular.element(".popover-hideout").siblings(".popover").length === 0;
  }

  return {
    checkForView: checkForView,
    isTourOn: isTourOn
  };
}

app.service("TourService", TourService);
TourService.$inject = [
  "Tour",
  "AuthService"
];
