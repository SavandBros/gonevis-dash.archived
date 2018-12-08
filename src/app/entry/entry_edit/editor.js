"use strict";

import Quill from "quill";
import Delta from "quill-delta";

const BlockEmbed = Quill.import("blots/block/embed");
const Clipboard = Quill.import("modules/clipboard");
const icons = Quill.import("ui/icons");
const newIcons = [{
  icon: "bold",
  replace: "bold",
}, {
  icon: "italic",
  replace: "italic"
}, {
  icon: "underline",
  replace: "underline"
}, {
  icon: "strike",
  replace: "strikethrough"
}, {
  icon: "blockquote",
  replace: "quote-right"
}, {
  icon: "link",
  replace: "link"
}, {
  icon: "code-block",
  replace: "code"
}, {
  icon: "divider",
  replace: "minus"
}, {
  icon: "image",
  replace: "picture-o"
}, {
  icon: "video",
  replace: "youtube-play"
}, {
  icon: "clean",
  replace: "ban"
}, {
  icon: "preview",
  replace: "eye"
}, {
  icon: "settings",
  replace: "cog"
}, {
  icon: "light",
  replace: "lightbulb-o"
}, {
  icon: "back",
  replace: "arrow-left"
}];

class CustomClipboard extends Clipboard {
  onPaste(e) {
    if (e.defaultPrevented || !this.quill.isEnabled()) {
      return;
    }
    let range = this.quill.getSelection();
    let delta = new Delta().retain(range.index);
    this.container.style.top = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0).toString() + 'px';
    this.container.focus();
    setTimeout(() => {
      this.quill.selection.update(Quill.sources.SILENT);
      delta = delta.concat(this.convert()).delete(range.length);
      this.quill.updateContents(delta, Quill.sources.USER);
      this.quill.setSelection(delta.length() - range.length, Quill.sources.SILENT);
      let bounds = this.quill.getBounds(delta.length() - range.length, Quill.sources.SILENT);
      this.quill.scrollingContainer.scrollTop = bounds.top;
    }, 1);
  }
}

class VideoBlot extends BlockEmbed {
  static create(url) {
    let node = super.create(url);
    let iframe = document.createElement('iframe');
    // Set styles for wrapper
    node.setAttribute('class', 'embed-responsive embed-responsive-16by9');
    // Set styles for iframe
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', true);
    iframe.setAttribute('src', url);
    // Append iframe as child to wrapper
    node.appendChild(iframe);
    return node;
  }

  static value(domNode) {
    if (domNode.querySelector('iframe')) {
      return domNode.querySelector('iframe').getAttribute('src');
    }
  }
}
VideoBlot.blotName = 'video';
VideoBlot.tagName = 'div';

class DividerBlot extends BlockEmbed {}
DividerBlot.blotName = 'divider';
DividerBlot.className = 'divider';
DividerBlot.tagName = 'hr';

export default class CustomIcons {
  constructor($translate) {
    newIcons.push({
      icon: "publish",
      replace: "globe",
      text: $translate.instant("PUBLISH")
    }, {
      icon: "update",
      replace: "refresh",
      text: $translate.instant("UPDATE")
    });

    // Built-in icons
    icons.list.bullet = this.getIcon('list-ul');
    icons.direction[''] = this.getIcon('paragraph');
    icons.direction.rtl = this.getIcon('paragraph fa-flip-horizontal');
    icons.align[''] = this.getIcon('align-left');
    icons.align.center = this.getIcon('align-center');
    icons.align.right = this.getIcon('align-right');
    icons.align.justify = this.getIcon('align-justify');

    angular.forEach(newIcons, (icon) => {
      icons[icon.icon] = this.getIcon(icon.replace, icon.text);
    });
  }

  /**
   * @desc Get icon
   *
   * @param {string} icon
   * @param {string} text
   */
  getIcon(icon, text) {
    return `<i class="fa fa-${icon} fa-fw"></i> ${text ? text : ''}`;
  }
}

Quill.register('modules/clipboard', CustomClipboard, true);
Quill.register(icons, true);
Quill.register(DividerBlot);
Quill.register(VideoBlot, true);
