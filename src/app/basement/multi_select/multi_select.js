"use strict";
import MultiSelectTemplate from "./multi_select_view.html";
import app from "../../app";

function MultiSelect($scope, $translate) {

  let ctrl = this;
  let mainInput = angular.element(".select-all > input")[0];
  let itemCount = 0;
  ctrl.countSelected = 0;

  let items = [];

  /**
   * @desc Handle selection
   *
   * @param {object} newValue
   * @param {object} oldValue
   */
  let handleSelection = (newValue, oldValue) => {
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
  }

  /**
   * @desc Watch item's 'isSelected' property.
   *
   * @param {object} item
   */
  let watchItems = (item) => {
    item.listener = $scope.$watchCollection(() => [item.isSelected, item.isDeleted], (newValue, oldValue) => {
      handleSelection(newValue[0], oldValue[0]);
      if (newValue[1] === oldValue[1]) {
        return;
      }

      if (newValue[1]) {
        itemCount--;
        mainInput.indeterminate = false;

        angular.forEach(ctrl.master, item => {
          item.isSelected = false;
        })
      } else {
        itemCount++;
        if (ctrl.isAllSelected) {
          mainInput.indeterminate = true;
          ctrl.isAllSelected = false;
        }
      }
    });
    // Store items
    items.push(item);
  }

  ctrl.$onInit = () => {
    let initialled = true;
    // Loop into the main list
    angular.forEach(ctrl.master, item => {
      watchItems(item);
    })
    // Watch master's new changes.
    $scope.$watchCollection(() => ctrl.master, (newValue) => {
      itemCount = ctrl.master.length;
      if (initialled) {
        initialled = false;
        return;
      }

      // Clear all previuse listeners
      angular.forEach(items, item => {
        item.listener();
      })

      // Clear items array
      items = [];

      if (ctrl.isAllSelected) {
        mainInput.indeterminate = true;
      }

      // Watch items
      angular.forEach(newValue, (item) => {
        watchItems(item);
      })
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
   * @desc Watch selection count.
   */
  $scope.$watch(() => ctrl.countSelected, (newValue) => {

    // Show minus icon
    if (newValue < itemCount) {
      mainInput.indeterminate = true;
    }

    // Hide minus icon and select all
    if (newValue === itemCount) {
      mainInput.indeterminate = false;
      ctrl.isAllSelected = true;
    }

    // Hide minus icon and deselect all
    if (!newValue) {
      mainInput.indeterminate = false;
      ctrl.isAllSelected = false;
    }
  });

  /**
   * @desc Select all items.
   */
  ctrl.selectAll = () => {
    if (ctrl.countSelected < itemCount) {
      ctrl.isAllSelected = true;
    }

    // Select all
    angular.forEach(ctrl.master, item => {
      if (!item.isDeleted) {
        item.isSelected = ctrl.isAllSelected;
      }
    });
  }

  /**
   * @desc Load more callback
   *
   * @param {Event} event
   * @param {object} data
   */
  $scope.$on("gonevisDash.Search:submit", function(event, data) {
    if (data.success) {
      ctrl.isAllSelected = false;
      ctrl.countSelected = 0;
    }
  });
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
