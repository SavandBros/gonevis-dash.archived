"use strict";
import MultiSelectTemplate from "./multi_select_view.html";
import app from "../../app";

function MultiSelect($scope, $translate) {

  let ctrl = this;
  let mainInput = angular.element(".select-all > input")[0];
  ctrl.countSelected = 0;

  ctrl.$onInit = () => {
    // Loop into the main list
    angular.forEach(ctrl.master, item => {
      // Watch each item's "isSelected" property
      $scope.$watch(() => item.isSelected, (newValue, oldValue) => {
        // Ignore first watch
        if (newValue === oldValue) {
          return;
        }
        // Change count
        if (newValue) {
          ctrl.countSelected++;
        } else {
          ctrl.countSelected--;
        }

        // Show minus icon
        if (ctrl.countSelected < ctrl.master.length) {
          mainInput.indeterminate = true;
        }

        // Hide minus icon and select all
        if (ctrl.countSelected === ctrl.master.length) {
          mainInput.indeterminate = false;
          ctrl.isAllSelected = true;
        }

        // Show minus icon and deselect all
        if (!ctrl.countSelected) {
          mainInput.indeterminate = false;
          ctrl.isAllSelected = false;
        }
      });
    })
  };

  /**
   * @desc Call API on option select.
   */
  ctrl.onSelect = (key, value, remove) => {

    // Show prompt on remove
    if (remove === true && confirm($translate.instant('REMOVE_SELECTED_ENTRY_PROMPT')) !== true) {
      return false;
    };

    angular.forEach(ctrl.master, item => {
      if (item.isSelected) {
        // Remove items if prompt passed.
        if (remove === true) {
          return item.remove(false);
        }

        // Update items
        item.setProperty(key, value);
      }
    });
  }

  /**
   * @desc Select all items.
   */
  ctrl.selectAll = () => {
    // Select all when selected count is less than master's item count
    if (ctrl.countSelected < ctrl.master.length) {
      ctrl.isAllSelected = true;
    }
    // Select all
    angular.forEach(ctrl.master, item => {
      item.isSelected = ctrl.isAllSelected;
    });
  }
}

app.controller("MultiSelect", MultiSelect);
app.component("multiSelect", {
  template: MultiSelectTemplate,
  controller: MultiSelect,
  bindings: {
    options: "<",
    master: "="
  }
});
