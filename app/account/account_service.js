"use strict";
function Account() {
  return function (data) {
    /**
     * @private
     */
    var self = this;

    /**
     * @desc Backend data
     * @type {object}
     */
    this.get = data;
  };
}

app.service("Account", Account);
