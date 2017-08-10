"use strict";

function Tour(TourStep) {
  return function (steps) {

    /**
     * @private
     */
    var self = this;

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
    this.getStep = function () {
      return this.steps[this.step];
    };

    /**
     * @type {function}
     */
    this.nextStep = function () {
      // Hide old step
      this.getStep().hide();
      // If this is the last step
      if (this.step === this.steps.length - 1) {
        return;
      }
      // Next step
      this.step++;
      // Show new step after a while
      setTimeout(function () {
        self.getStep().show();
      }, 1000);
    };

    /**
     * @private
     * @type {function}
     */
    var constructor = function () {
      // Start the tour
      self.getStep().show();
      // Instantiate steps
      angular.forEach(steps, function (step) {
        self.steps.push(new TourStep(step[0], step[1], step[2], step[3]));
      });
    };

    constructor();
  };
}

app.service("Tour", Tour);
Tour.$inject = [
  "TourStep"
];

function TourService(Tour) {

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
        ["#entries", "Entries Overview", "Entries are listed here, click on them to open in editor.<br><br>On the right side, you can see the likes, comments and views counter."],
        ["#site", "Site Overview", "You can see your followers and current template.<br><br>Click on the header for the full settings page."],
      ];
    }

    if (tourName === "files") {
      steps = [
        [".search-form", "Search", "Start typing to search through your files.", "bottom"],
        [".view-buttons", "Layout", "Choose between grid layout or listview.", "bottom"]
      ];
    }

    if (!steps) {
      return false;
    }

    return new Tour(tourName, steps);
  }

  return {
    checkForView: checkForView
  };
}

app.service("TourService", TourService);
TourService.$inject = [
  "Tour"
];
