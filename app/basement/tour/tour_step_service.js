"use strict";

function TourStep() {
  return function (selector, title, content, placement) {

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
     * @type {function}
     */
    this.show = function () {
      self.tourElement.removeClass("fadeOutUp").addClass("fadeIn");
      self.element.addClass("popover-target");
      self.element.popover({
        html: true,
        template: self.tourElement,
        placement: self.placement,
        content: self.content,
        title: self.title,
        trigger: "manual"
      });
      self.element.popover("show");
    };

    /**
     * @type {function}
     */
    this.hide = function () {
      self.element.removeClass("popover-target");
      self.tourElement.removeClass("fadeIn").addClass("fadeOutUp");
    };
  };
}

app.service("TourStep", TourStep);
