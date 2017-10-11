"use strict";

function TourStep($timeout) {
  return function(selector, title, content, placement, isLast) {

    /**
     * @private
     */
    var self = this;

    /**
     * @type {string}
     */
    this.title = title;

    /**
     * @type {string}
     */
    this.content = content;

    /**
     * @type {object}
     */
    this.element = angular.element(selector);

    /**
     * @type {object}
     */
    this.tourElement = angular.element(".tour");

    /**
     * @type {string}
     */
    this.placement = placement || "top";

    /**
     * @type {boolean}
     */
    this.isLast = isLast;

    /**
     * @type {function}
     */
    this.show = function() {
      angular.element(".popover-relative").addClass("on");

      self.element.addClass("popover-target");
      self.tourElement.removeClass("fadeOutUp").addClass("fadeIn");
      self.element.popover({
        html: true,
        template: self.tourElement,
        placement: self.placement,
        content: self.content,
        title: self.title,
        trigger: "manual"
      });
      self.element.popover("show");

      if (self.isLast) {
        self.hide();
      }
    };

    /**
     * @type {function}
     */
    this.hide = function() {
      // Instant hide
      if (self.isLast) {
        self.tourElement.hide();
        angular.element(".popover-relative").removeClass("on");
      }
      // Revert back
      self.element.removeClass("popover-target");
      self.tourElement.removeClass("fadeIn").addClass("fadeOutUp");
      // Hide it completely when animation has finished
      $timeout(function() {
        self.tourElement.hide();
        angular.element(".popover-relative").removeClass("on");
      }, 1000);
    };
  };
}

app.service("TourStep", TourStep);
TourStep.$inject = [
  "$timeout"
];
