"use strict";

import app from '../../app';

function EmbedListener() {

  /**
   * @desc It will listen to the messages coming from child iframe to adjust the size of the iframe. 
   *
   * @param {Event} event
   */
  function handleEmbedSize(event) {
    event = event.originalEvent;
    // Check origin
    if (GoNevisEnv.apiEndpoint.split('/api/v1/')[0] !== event.origin) {
      return;
    }
    // If there was an element ID, then set iframe's height based on given data.
    if (event.data.elementId) {
      angular.forEach(angular.element(`[data-embed-url='${event.data.elementId}']`), element => {
        element.setAttribute("height", event.data.height + "px");
      });
    }
  }

  return {
    handleEmbedSize: handleEmbedSize
  };
}

app.factory("EmbedListener", EmbedListener);
