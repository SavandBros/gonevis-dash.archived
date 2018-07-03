"use strict";

import MediumEditor from 'medium-editor';

class MediumEditorDirective {
  constructor() {
    this.require = 'ngModel';
    this.restrict = 'AE';
    this.scope = { bindOptions: '=' };
  }

  link (scope, iElement, iAttrs, ngModel) {
    angular.element(iElement).addClass('gonevis-medium-editor');

    // Global MediumEditor
    ngModel.editor = new MediumEditor(iElement, scope.bindOptions);

    ngModel.$render = function() {
      ngModel.editor.setContent(ngModel.$viewValue || "");
      let placeholder = ngModel.editor.getExtensionByName('placeholder');
      if (placeholder) {
        placeholder.updatePlaceholder(iElement[0]);
      }
    };

    ngModel.$isEmpty = function(value) {
      if (/[<>]/.test(value)) {
        return MediumEditorDirective.toInnerText(value).length === 0;
      } else if (value) {
        return value.length === 0;
      } else {
        return true;
      }
    };

    ngModel.editor.subscribe('editableInput', function (event, editable) {
      ngModel.$setViewValue(editable.innerHTML.trim());
    });

    scope.$watch('bindOptions', function(bindOptions) {
      ngModel.editor.init(iElement, bindOptions);
    });

    scope.$on('$destroy', function() {
      ngModel.editor.destroy();
    });
  }

  static toInnerText(value) {
    let tempEl = document.createElement('div'), text;
    tempEl.innerHTML = value;
    text = tempEl.textContent || '';
    return text.trim();
  }
}

angular.module('gonevisDash').directive('mediumEditor', () => new MediumEditorDirective);
