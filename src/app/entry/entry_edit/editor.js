"use strict";

import Quill from "quill";
import Delta from "quill-delta";

const BlockEmbed = Quill.import("blots/block/embed");
const Clipboard = Quill.import("modules/clipboard");
const icons = Quill.import("ui/icons");
const customIcons = [{
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
  icon: "publish",
  replace: "globe",
  text: "Publish"
}, {
  icon: "update",
  replace: "refresh",
  text: "Update"
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
    return domNode.firstChild.getAttribute('src');
  }
}
VideoBlot.blotName = 'video';
VideoBlot.tagName = 'div';

class DividerBlot extends BlockEmbed {}
DividerBlot.blotName = 'divider';
DividerBlot.className = 'divider';
DividerBlot.tagName = 'hr';

/**
 * @desc Get icon
 *
 * @param {string} icon
 */
function getIcon(icon, text) {
  return `<i class="fa fa-${icon} fa-fw"></i> ${text ? text : ''}`;
}

angular.forEach(customIcons, (icon) => {
  icons[icon.icon] = getIcon(icon.replace, icon.text);
});

// Built-in icons
icons.list.bullet = getIcon('list-ul');
icons.direction[''] = getIcon('paragraph');
icons.direction.rtl = getIcon('paragraph fa-flip-horizontal');
icons.align[''] = getIcon('align-left');
icons.align.center = getIcon('align-center');
icons.align.right = getIcon('align-right');
icons.align.justify = getIcon('align-justify');

Quill.register('modules/clipboard', CustomClipboard, true);
Quill.register(icons, true);
Quill.register(DividerBlot);
Quill.register(VideoBlot, true);
