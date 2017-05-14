"use strict";

function TourStep() {
  return function (selector, title, content, placement) {

    this.title = title;

    this.content = content;

    this.element = angular.element(selector);

    this.tourElement = angular.element(".tour");

    this.placement = placement || "top";

    this.show = function () {
      this.tourElement.removeClass("fadeOutUp").addClass("fadeIn");
      this.element.addClass("popover-target");
      this.element.popover({
        html: true,
        template: this.tourElement,
        placement: this.placement,
        content: this.content,
        title: this.title,
        trigger: "manual"
      });
      this.element.popover("show");
    };

    this.hide = function () {
      this.element.removeClass("popover-target");
      this.tourElement.removeClass("fadeIn").addClass("fadeOutUp");
    };
  };
}

app.service("TourStep", TourStep);
