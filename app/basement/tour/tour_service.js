"use strict";

function Tour() {
  return function (steps) {

    var self = this;

    this.steps = steps;

    this.step = 0;

    /**
     * @name getStep
     * @type {Function}
     *
     * @returns {TourStep}
     */
    this.getStep = function () {
      return this.steps[this.step];
    };

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
      self.getStep().show();
    };

    constructor();
  };
}

app.service("Tour", Tour);
