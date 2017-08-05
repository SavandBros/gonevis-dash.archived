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
