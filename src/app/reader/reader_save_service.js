"use strict";

import app from '../app';

function ReaderSaveService() {

  /**
   * @desc Store Reader feed/explore items.
   */
  let items = {
    feed: {
      data: {},
      pageForm: {}
    },
    explore: {
      data: {},
      pageForm: {}
    },
    bookmarks: {
      data: {},
      pageForm: {}
    }
  };

  return {
    items: items
  };
}

app.factory("ReaderSaveService", ReaderSaveService);
